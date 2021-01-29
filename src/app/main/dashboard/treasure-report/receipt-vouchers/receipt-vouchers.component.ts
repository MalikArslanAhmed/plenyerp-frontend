import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../../shared/services/alert.service";
import {TreasureReportService} from "../../../../shared/services/treasure-report.service";
import * as moment from "moment";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {ReceiptVoucherService} from "../../../../shared/services/receipt-voucher.service";
import {ReceiptVoucherCreateComponent} from "./receipt-voucher-create/receipt-voucher-create.component";
import {SchedulePayersCustomerComponent} from './schedule-payers-customer/schedule-payers-customer.component';
import {SchedulePayersEmployeeComponent} from './schedule-payers-employee/schedule-payers-employee.component';
import {ScheduleEconomicCodesReceiptComponent} from "./schedule-economic-codes-receipt/schedule-economic-codes-receipt.component";
import {PaymentVoucherCreateComponent} from "../payment-voucher/payment-voucher-create/payment-voucher-create.component";
import {SchedulePayeeEmployeeComponent} from "../payment-voucher/schedule-payee-employee/schedule-payee-employee.component";

@Component({
    selector: 'app-receipt-vouchers',
    templateUrl: './receipt-vouchers.component.html',
    styleUrls: ['./receipt-vouchers.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReceiptVouchersComponent implements OnInit {
    filterReceiptVoucherForm: FormGroup;
    createReceiptVoucherForm: FormGroup;
    receiptVoucherData = [];
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
                private receiptVoucherService: ReceiptVoucherService,
                private treasureReportService: TreasureReportService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getReceiptVoucher({});
        this.getVoucherSourceUnitList();
        this.receiptVoucherStatus({});
    }

    refresh() {
        this.filterReceiptVoucherForm = this.fb.group({
            'status': ['ALL'],
            'search': [''],
            'sourceUnit': ['']
        });
        this.createReceiptVoucherForm = this.fb.group({
            'sourceUnit': [''],
            'type': ['']
        });
        this.createReceiptVoucherForm.get('sourceUnit').valueChanges.subscribe(val => {
            this.types = [];
            this.createReceiptVoucherForm.get('type').reset();
            if (val) {
                this.getTypeData(val);
            }
        });
    }

    getReceiptVoucher(params?) {
        let param = {
            ...params,
            page: this.pagination.page
        };
        this.receiptVoucherService.get(param).subscribe(data => {
            this.receiptVoucherData = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.receiptVoucherData && this.receiptVoucherData.length > 0) {
                this.receiptVoucherData.forEach(d => {
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
            this.receiptVoucherService.getSchedulePayee(item.id, {page: -1}).subscribe(data => {
                item['payees'] = data.items;
            });
        }
    }

    scheduleEmployee(data) {
        this.dialogRef = this._matDialog.open(SchedulePayersEmployeeComponent, {
            panelClass: 'contact-form-dialog',
            data: {rv: data}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getChildReportData(data);
        });
    }

    scheduleCustomers(data) {
        this.dialogRef = this._matDialog.open(SchedulePayersCustomerComponent, {
            panelClass: 'contact-form-dialog',
            data: {rv: data}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getChildReportData(data);
        });
    }

    scheduleEconomicCodes(report, data) {
        this.dialogRef = this._matDialog.open(ScheduleEconomicCodesReceiptComponent, {
            panelClass: 'contact-form-dialog',
            data: {rv: data, report: report}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
        });
    }

    filterReceiptVoucher() {
        let params = {};
        if (this.filterReceiptVoucherForm.value.status !== 'ALL') {
            params['status'] = this.filterReceiptVoucherForm.value.status;
        }
        this.status = this.filterReceiptVoucherForm.value.status;
        params['sourceUnit'] = this.filterReceiptVoucherForm.value.sourceUnit;
        params['search'] = this.filterReceiptVoucherForm.value.search;
        this.getReceiptVoucher(params);
        this.receiptVoucherStatus(this.status);
    }

    addReceiptVoucher() {
        if (this.createReceiptVoucherForm.value['sourceUnit'] === '' || !this.createReceiptVoucherForm.value['sourceUnit']) {
            this.alertService.showErrors('Please Choose Voucher Source Unit');
            return;
        } else if (this.createReceiptVoucherForm.value['type'] === '' || !this.createReceiptVoucherForm.value['type']) {
            this.alertService.showErrors('Please Choose Receipt Voucher Type');
            return;
        }

        if (this.types && this.types.length > 0 && this.sourceUnit && this.sourceUnit.length > 0) {
            let selectedType = '';
            this.types.forEach(type => {
                if (type.value === this.createReceiptVoucherForm.value['type']) {
                    selectedType = type.name;
                }
            });

            let selectedSource = [];
            this.sourceUnit.forEach(source => {
                if (source.id === this.createReceiptVoucherForm.value['sourceUnit']) {
                    selectedSource.push({
                        'name': source.id + ' - ' + source.longName,
                        'value': source.id
                    });
                }
            });

            this.dialogRef = this._matDialog.open(ReceiptVoucherCreateComponent, {
                panelClass: 'contact-form-dialog',
                data: {header: selectedType, source: selectedSource, type: this.createReceiptVoucherForm.value['type']}
            });
            this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                this.getReceiptVoucher({});
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
        this.receiptVoucherData[index].checked = event.checked;
    }

    receiptVoucherStatus(status) {
        this.selectedStatus = [];
        if (this.statuses && this.statuses.length > 0) {
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
        this.receiptVoucherService.getReceiptVoucherStatus(params).subscribe(data => {
            this.statuses = data.status;
        });
    }

    updateStatus(status: string) {
        const receiptVoucherId = [];
        if (this.receiptVoucherData && this.receiptVoucherData.length) {
            this.receiptVoucherData.forEach(item => {
                if (item.checked === true) {
                    receiptVoucherId.push(item.id);
                }
            });
            const params = {
                status: status,
                receiptVoucherIds: receiptVoucherId
            };
            this.receiptVoucherService.getUpdateStatus(params).subscribe(data => {
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
        this.receiptVoucherService.getScheduleEconomic(report.id).subscribe(data => {
            report['economic'] = data.items;
        });
    }

    getTypeData(sourceUnitId) {
        if (sourceUnitId) {
            this.receiptVoucherService.typeData(sourceUnitId).subscribe(data => {
                this.types = data.type;
            });
        }
    }

    editReceiptVoucher(data) {
        this.dialogRef = this._matDialog.open(ReceiptVoucherCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {'action': 'EDIT', 'item': data}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getReceiptVoucher({});
        });
    }

    deleteReceiptVoucher(data) {
        this.receiptVoucherService.delete(data.id).subscribe(data => {
            this.getReceiptVoucher({});
        });
    }

    editSchedulePayerEmployee(data, report) {
        this.dialogRef = this._matDialog.open(SchedulePayersEmployeeComponent, {
            panelClass: 'contact-form-dialog',
            data: {'action': 'EDIT', 'rv': data, 'report': report}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getChildReportData(data);
        });
    }

    deleteSchedulePayerEmployee(report, data) {
        this.receiptVoucherService.deleteSchedulePayerEmployee(report.id, data.id).subscribe(data => {
            this.getChildReportData(data);
        });
    }

    editSchedulePayerCustomer(data, report) {
        this.dialogRef = this._matDialog.open(SchedulePayersCustomerComponent, {
            panelClass: 'contact-form-dialog',
            data: {'action': 'EDIT', 'rv': data, 'report': report}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getChildReportData(data);
        });
    }

    deleteSchedulePayerCustomer(report, data) {
        this.receiptVoucherService.deleteSchedulePayerCustomer(report.id, data.id).subscribe(data => {
            this.getChildReportData(data);
        });
    }

    deleteEconomicCode(report, data) {
        this.receiptVoucherService.deleteEconomicCode(report.id, data.id).subscribe(data => {
            this.getChildReportData(data);
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getReceiptVoucher();
    }
}
