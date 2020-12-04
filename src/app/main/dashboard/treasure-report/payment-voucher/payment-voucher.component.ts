import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {JournalVoucherLedgerReportService} from '../../../../shared/services/journal-voucher-ledger-report.service';
import {MatDialog} from '@angular/material/dialog';
import {SchedulePayeeCustomerComponent} from './schedule-payee-customer/schedule-payee-customer.component';
import {SchedulePayeeEmployeeComponent} from './schedule-payee-employee/schedule-payee-employee.component';
import {PaymentVoucherCreateComponent} from './payment-voucher-create/payment-voucher-create.component';
import {AlertService} from '../../../../shared/services/alert.service';
import {PaymentVoucherService} from '../../../../shared/services/payment-voucher.service';
import * as moment from 'moment';
import {TreasureReportService} from '../../../../shared/services/treasure-report.service';
import {ScheduleEconomicCodesComponent} from "./schedule-economic-codes/schedule-economic-codes.component";
import {DefaultSettingVoucherInfoService} from "../../../../shared/services/default-setting-voucher-info";

@Component({
    selector: 'app-payment-voucher',
    templateUrl: './payment-voucher.component.html',
    styleUrls: ['./payment-voucher.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PaymentVoucherComponent implements OnInit {
    filterPaymentVoucherForm: FormGroup;
    createPaymentVoucherForm: FormGroup;
    paymentVoucherData = [];
    panelOpenState: boolean = false;
    sourceUnit = [];
    statuses = [
        {
            'name': 'All',
            'value': 'ALL'
        },
        {
            'name': 'New',
            'value': 'NEW'
        },
        {
            'name': 'Checked',
            'value': 'CHECKED'
        },
        {
            'name': 'Approved',
            'value': 'APPROVED'
        },
        {
            'name': 'Budget Codes Verified',
            'value': 'BUDGET_CODES_VERIFIED'
        },
        {
            'name': 'Audited',
            'value': 'AUDITED'
        },
        {
            'name': 'Closed',
            'value': 'CLOSED'
        },
        {
            'name': 'Posted to GL (#)',
            'value': 'POSTED_TO_gl'
        },
        {
            'name': 'On Mandate',
            'value': 'ON_MANDATE'
        }
    ];
    types = [];
    dialogRef: any;
    status = 'ALL';
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
                private treasureReportService: TreasureReportService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getPyamentVoucher({});
        this.getVoucherSourceUnitList();
    }

    refresh() {
        this.filterPaymentVoucherForm = this.fb.group({
            'status': ['ALL'],
            'search': [''],
            'sourceUnit': ['']
        });
        this.createPaymentVoucherForm = this.fb.group({
            'sourceUnit': [''],
            'type': ['']
        });
        this.createPaymentVoucherForm.get('sourceUnit').valueChanges.subscribe(val => {
            this.types = [];
            this.createPaymentVoucherForm.get('type').reset();
            if (val) {
                this.getTypeData(val);
            }
        });
    }

    getPyamentVoucher(params?) {
        let param = {
            ...params,
            page: this.pagination.page
        };
        this.paymentVoucherService.get(param).subscribe(data => {
            this.paymentVoucherData = data.items;
            if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
                this.paymentVoucherData.forEach(d => {
                    d['checked'] = false;
                    d['lastActioned'] = moment(d['updatedAt']).format('YYYY-MM-DD');
                    // this.getChildReportData(d);
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

    scheduleEmployee(data) {
        this.dialogRef = this._matDialog.open(SchedulePayeeEmployeeComponent, {
            panelClass: 'contact-form-dialog',
            data: {pv: data}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getChildReportData(data);
        });
    }

    scheduleCustomers(data) {
        this.dialogRef = this._matDialog.open(SchedulePayeeCustomerComponent, {
            panelClass: 'contact-form-dialog',
            data: {pv: data}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getChildReportData(data);
        });
    }

    scheduleEconomicCodes(report, data) {
        this.dialogRef = this._matDialog.open(ScheduleEconomicCodesComponent, {
            panelClass: 'contact-form-dialog',
            data: {pv: data, report: report}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
        });
    }

    filterPaymentVoucher() {
        let params = {};
        if (this.filterPaymentVoucherForm.value.status !== 'ALL') {
            params['status'] = this.filterPaymentVoucherForm.value.status;
        }
        this.status = this.filterPaymentVoucherForm.value.status;
        params['sourceUnit'] = this.filterPaymentVoucherForm.value.sourceUnit;
        params['search'] = this.filterPaymentVoucherForm.value.search;
        this.getPyamentVoucher(params);
    }

    addPaymentVoucher() {
        if (this.createPaymentVoucherForm.value['sourceUnit'] === '') {
            this.alertService.showErrors('Please Choose Voucher Source Unit');
            return;
        } else if (this.createPaymentVoucherForm.value['type'] === '') {
            this.alertService.showErrors('Please Choose Payment Voucher Type');
            return;
        }

        if (this.types && this.types.length > 0 && this.sourceUnit && this.sourceUnit.length > 0) {
            let selectedType = '';
            this.types.forEach(type => {
                if (type.value === this.createPaymentVoucherForm.value['type']) {
                    selectedType = type.name;
                }
            });

            let selectedSource = [];
            this.sourceUnit.forEach(source => {
                if (source.id === this.createPaymentVoucherForm.value['sourceUnit']) {
                    selectedSource.push({
                        'name': source.id + ' - ' + source.longName,
                        'value': source.id
                    });
                }
            });

            this.dialogRef = this._matDialog.open(PaymentVoucherCreateComponent, {
                panelClass: 'contact-form-dialog',
                data: {action: 'CREATE', header: selectedType, source: selectedSource}
            });
            this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                this.getPyamentVoucher({});
            });
        }
    }

    getVoucherSourceUnitList() {
        this.sourceUnit = [];
        this.treasureReportService.list({page: -1}).subscribe(data => {
            this.sourceUnit = data.items;
        });
    }

    checkPV(index, event) {
        this.paymentVoucherData[index].checked = event.checked;
    }

    updateStatus(status: string) {
        const paymentVoucherId = [];
        if (this.paymentVoucherData && this.paymentVoucherData.length) {
            this.paymentVoucherData.forEach(item => {
                if (item.checked === true) {
                    paymentVoucherId.push(item.id);
                }
            });
            const params = {
                status: status,
                paymentVoucherIds: paymentVoucherId
            };
            this.paymentVoucherService.getUpdateStatus(params).subscribe(data => {
                console.log(data);
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

    getTypeData(sourceUnitId) {
        if (sourceUnitId) {
            this.paymentVoucherService.typeData(sourceUnitId).subscribe(data => {
                this.types = data.type;
            });
        }
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getPyamentVoucher();
    }
}
