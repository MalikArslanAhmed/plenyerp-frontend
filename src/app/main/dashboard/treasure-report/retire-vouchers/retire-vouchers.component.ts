import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../../shared/services/alert.service";
import {PaymentVoucherService} from "../../../../shared/services/payment-voucher.service";
import {TreasureReportService} from "../../../../shared/services/treasure-report.service";
import * as moment from "moment";
import {SchedulePayeeEmployeeComponent} from "../payment-voucher/schedule-payee-employee/schedule-payee-employee.component";
import {SchedulePayeeCustomerComponent} from "../payment-voucher/schedule-payee-customer/schedule-payee-customer.component";
import {ScheduleEconomicCodesComponent} from "../payment-voucher/schedule-economic-codes/schedule-economic-codes.component";
import {LiabilitiesComponent} from "./liabilities/liabilities.component";
import {RetireVoucherService} from "../../../../shared/services/retire-voucher.service";

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
            'sourceUnit': ['']
        });
    }

    getRetireVoucher(params?) {
        let param = {
            ...params,
            page: this.pagination.page
        };
        this.retireVoucherService.get(param).subscribe(data => {
            console.log('data', data);
            this.retireVoucherData = data.items;
            if (this.retireVoucherData && this.retireVoucherData.length > 0) {
                this.retireVoucherData.forEach(d => {
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

    editLiabilities(data) {
        this.dialogRef = this._matDialog.open(LiabilitiesComponent, {
            panelClass: 'contact-form-dialog',
            data: {pv: data}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
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

    filterRetireVoucher() {
        let params = {};
        if (this.filterPaymentVoucherForm.value.status !== 'ALL') {
            params['status'] = this.filterPaymentVoucherForm.value.status;
        }
        this.status = this.filterPaymentVoucherForm.value.status;
        params['sourceUnit'] = this.filterPaymentVoucherForm.value.sourceUnit;
        params['search'] = this.filterPaymentVoucherForm.value.search;
        this.paymentVoucherStatus(this.status);
    }

    getVoucherSourceUnitList() {
        this.sourceUnit = [];
        this.treasureReportService.list({page: -1}).subscribe(data => {
            this.sourceUnit = data.items;
        });
    }

    /*checkPV(index, event) {
        this.retireVoucherData[index].checked = event.checked;
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
        if (this.retireVoucherData && this.retireVoucherData.length) {
            this.retireVoucherData.forEach(item => {
                if (item.checked === true) {
                    paymentVoucherId.push(item.id);
                }
            });
            const params = {
                status: status,
                paymentVoucherIds: paymentVoucherId
            };
            this.paymentVoucherService.getUpdateStatus(params).subscribe(data => {
                // console.log(data);
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