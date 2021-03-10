import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '../../../../shared/services/alert.service';
import {PaymentVoucherService} from '../../../../shared/services/payment-voucher.service';
import {TreasureReportService} from '../../../../shared/services/treasure-report.service';
import * as moment from 'moment';
import {LiabilitiesComponent} from './liabilities/liabilities.component';
import {RetireVoucherService} from '../../../../shared/services/retire-voucher.service';

@Component({
    selector: 'app-retire-vouchers',
    templateUrl: './retire-vouchers.component.html',
    styleUrls: ['./retire-vouchers.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RetireVouchersComponent implements OnInit {
    filterPaymentVoucherForm: FormGroup;
    // retireVoucherData = [];
    retireVoucherData = [];
    panelOpenState: boolean = false;
    sourceUnit = [];
    statuses = [];
    types = [];
    dialogRef: any;
    status = 'ALL';
    selectedStatus = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };

    constructor(private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private paymentVoucherService: PaymentVoucherService,
                private treasureReportService: TreasureReportService,
                private retireVoucherService: RetireVoucherService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getRetireVoucher({});
        this.getVoucherSourceUnitList();
        this.paymentVoucherStatus({});
    }

    refresh() {
        this.filterPaymentVoucherForm = this.fb.group({
            'status': ['ALL'],
            'search': [''],
            'voucherSourceUnitId': ['']
        });
    }

    getRetireVoucher(params?) {
        let param = {
            ...params,
            page: this.pagination.page
        };
        this.retireVoucherService.get(param).subscribe(data => {
            this.retireVoucherData = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.retireVoucherData && this.retireVoucherData.length > 0) {
                this.retireVoucherData.forEach(d => {
                    d['checked'] = false;
                    d['lastActioned'] = moment(d['updatedAt']).format('YYYY-MM-DD');
                });
                this.panelOpenState = !this.panelOpenState;
            }
        });
    }

    getChildReportData(item) {
        const params = {};
        if (item && item.id) {
            params['parentId'] = item.id;
            this.paymentVoucherService.getSchedulePayee(item.id, {page: -1}).subscribe(data => {
                item['payees'] = data.items;
            });
        }
    }

    editLiabilities(data, payee, companyId, employeeId) {
        data = {
            ...data,
            payee,
            companyId: companyId,
            employeeId: employeeId || null
        };

        this.dialogRef = this._matDialog.open(LiabilitiesComponent, {
            panelClass: 'contact-form-dialog',
            data: {pv: data}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            this.getRetireVoucher();
            if (!response) {
                return;
            }
        });
    }

    filterRetireVoucher() {
        let params = {};
        if (this.filterPaymentVoucherForm.value.status !== 'ALL') {
            params['retireStatus'] = this.filterPaymentVoucherForm.value.status;
        }
        this.status = this.filterPaymentVoucherForm.value.status;
        params['voucherSourceUnitId'] = this.filterPaymentVoucherForm.value.voucherSourceUnitId;
        params['search'] = this.filterPaymentVoucherForm.value.search;
        this.paymentVoucherStatus(this.status);
        this.getRetireVoucher(params);
    }

    getVoucherSourceUnitList() {
        this.sourceUnit = [];
        this.treasureReportService.list({page: -1}).subscribe(data => {
            this.sourceUnit = data.items;
        });
    }

    checkPV(index, event) {
        this.retireVoucherData[index].checked = event.checked;
    }

    /*updateStatus(status: string) {
        const mandateIds = [];
        if (this.onMandateList && this.onMandateList.length > 0) {
            this.onMandateList.forEach(item => {
                if (item.checked === true) {
                    mandateIds.push(item.id);
                }
            });
            const params = {
                status: status,
                mandateIds: mandateIds ? JSON.stringify(mandateIds) : ''
            };
            this.mandateService.updateMandateStatus(params).subscribe(data => {
                console.log(data);
            });
        }
    }*/

    paymentVoucherStatus(status) {
        this.selectedStatus = [];
        if (this.statuses && this.statuses.length) {
            this.statuses.forEach(val => {
                if (val.value === status) {
                    const sIndex = this.statuses.indexOf(val);
                    if (sIndex < this.statuses.length - 1) {
                        this.selectedStatus.push(this.statuses[sIndex + 1]);
                    } else {
                        this.selectedStatus = [];
                    }
                }
            });
        }

        const params = {};
        if (status !== 'ALL') {
            params['status'] = status;
        }
        this.retireVoucherService.getRetireVoucherStatus(params).subscribe(data => {
            this.statuses = data.status;
        });
    }

    updateStatus(status: string) {
        const paymentVoucherId = [];
        if (this.retireVoucherData && this.retireVoucherData.length > 0) {
            this.retireVoucherData.forEach(item => {
                if (item.checked === true) {
                    paymentVoucherId.push(item.id);
                }
            });
            const params = {
                retireStatus: status,
                paymentVoucherIds: paymentVoucherId ? JSON.stringify(paymentVoucherId) : ''
            };
            this.retireVoucherService.updateRetireStatus(params).subscribe(data => {
                this.getRetireVoucher({
                    'retireStatus': this.filterPaymentVoucherForm.value.status,
                    'voucherSourceUnitId': this.filterPaymentVoucherForm.value.voucherSourceUnitId,
                    'search': this.filterPaymentVoucherForm.value.search,
                });
            });
        }
    }

    tabClick(report, event) {
        if (event.tab['textLabel'] === 'Economic Codes') {
            this.getEconomicCodes(report);
        }
    }

    getEconomicCodes(report) {
        this.paymentVoucherService.getScheduleEconomic(report.id).subscribe(data => {
            report['economic'] = data.items;
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getRetireVoucher();
    }
}
