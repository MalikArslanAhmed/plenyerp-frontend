import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '../../../../shared/services/alert.service';
import {TreasureReportService} from '../../../../shared/services/treasure-report.service';
import * as moment from 'moment';
import {ScheduleEconomicCodesReceiptComponent} from '../receipt-vouchers/schedule-economic-codes-receipt/schedule-economic-codes-receipt.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {PreviousYearAdvancesCreateComponent} from './previous-year-advances-create/previous-year-advances-create.component';
import {PreviousYearAdvancesService} from '../../../../shared/services/previous-year-advances.service';
import {PaymentVoucherService} from '../../../../shared/services/payment-voucher.service';
import {SchedulePayersEmployeePreviousAdvancesComponent} from './schedule-payers-employee-previous-advances/schedule-payers-employee-previous-advances.component';
import {SchedulePayersCustomerPreviousAdvancesComponent} from './schedule-payers-customer-previous-advances/schedule-payers-customer-previous-advances.component';
import {PermissionConstant} from '../../../../shared/constants/permission-constant';
import {DeleteListModalComponent} from '../../delete-list-modal/delete-list-modal.component';

@Component({
    selector: 'app-previous-year-advances',
    templateUrl: './previous-year-advances.component.html',
    styleUrls: ['./previous-year-advances.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PreviousYearAdvancesComponent implements OnInit {
    filterReceiptVoucherForm: FormGroup;
    createReceiptVoucherForm: FormGroup;
    previousYearAdvancesData = [];
    panelOpenState = false;
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

    permissionPYAAdd = [PermissionConstant.PYA_ADD];
    permissionPYAEdit = [PermissionConstant.PYA_EDIT];
    permissionPYADelete = [PermissionConstant.PYA_DELETE];
    permissionPYAClose = [PermissionConstant.PYA_CLOSE];
    permissionPYAPost = [PermissionConstant.PYA_POST];

    constructor(private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private previousYearAdvanceService: PreviousYearAdvancesService,
                private treasureReportService: TreasureReportService,
                private paymentVoucherService: PaymentVoucherService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getPreviousYearAdvances({});
        this.getVoucherSourceUnitList();
        this.receiptVoucherStatus({});
    }

    refresh() {
        this.filterReceiptVoucherForm = this.fb.group({
            status: ['ALL'],
            search: [''],
            sourceUnit: ['']
        });
        this.createReceiptVoucherForm = this.fb.group({
            sourceUnit: [''],
            type: ['']
        });
        this.createReceiptVoucherForm.get('sourceUnit').valueChanges.subscribe(val => {
            this.types = [];
            this.createReceiptVoucherForm.get('type').reset();
            if (val) {
                this.getTypeData(val);
            }
        });
    }

    getPreviousYearAdvances(params?) {
        const param = {
            ...params,
            page: this.pagination.page
        };
        this.previousYearAdvanceService.get(param).subscribe(data => {
            this.previousYearAdvancesData = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.previousYearAdvancesData && this.previousYearAdvancesData.length > 0) {
                this.previousYearAdvancesData.forEach(d => {
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
            this.previousYearAdvanceService.getSchedulePayee(item.id, {page: -1}).subscribe(data => {
                item['payees'] = data.items;
            });
        }
    }

    scheduleEmployee(data) {
        this.dialogRef = this._matDialog.open(SchedulePayersEmployeePreviousAdvancesComponent, {
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
        this.dialogRef = this._matDialog.open(SchedulePayersCustomerPreviousAdvancesComponent, {
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
        const params = {};
        if (this.filterReceiptVoucherForm.value.status !== 'ALL') {
            params['status'] = this.filterReceiptVoucherForm.value.status;
        }
        this.status = this.filterReceiptVoucherForm.value.status;
        params['sourceUnit'] = this.filterReceiptVoucherForm.value.sourceUnit;
        params['search'] = this.filterReceiptVoucherForm.value.search;
        this.getPreviousYearAdvances(params);
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

            const selectedSource = [];
            this.sourceUnit.forEach(source => {
                if (source.id === this.createReceiptVoucherForm.value['sourceUnit']) {
                    selectedSource.push({
                        name: source.id + ' - ' + source.longName,
                        value: source.id
                    });
                }
            });

            this.dialogRef = this._matDialog.open(PreviousYearAdvancesCreateComponent, {
                panelClass: 'contact-form-dialog',
                data: {header: selectedType, source: selectedSource, type: this.createReceiptVoucherForm.value['type']}
            });
            this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                this.getPreviousYearAdvances({});
            });
        }
    }

    getVoucherSourceUnitList() {
        this.sourceUnit = [];
        this.treasureReportService.list({page: -1, isPersonalAdvanceUnit: 1}).subscribe(data => {
            this.sourceUnit = data.items;
        });
    }

    checkPV(index, event) {
        this.previousYearAdvancesData[index].checked = event.checked;
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
        this.previousYearAdvanceService.getPreviousYearAdvancesStatus(params).subscribe(data => {
            this.statuses = data.status;
        });
    }

    askForConfirmation(data): void {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: data}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.updateStatus(data);
            }
        });
    }

    updateStatus(status: string): void {
        const receiptVoucherId = [];
        if (this.previousYearAdvancesData && this.previousYearAdvancesData.length) {
            this.previousYearAdvancesData.forEach(item => {
                if (item.checked === true) {
                    receiptVoucherId.push(item.id);
                }
            });
            const params = {
                status: status,
                paymentVoucherIds: JSON.stringify(receiptVoucherId)
            };
            this.previousYearAdvanceService.getUpdateStatus(params).subscribe(data => {
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
        this.previousYearAdvanceService.getScheduleEconomic(report.id).subscribe(data => {
            report['economic'] = data.items;
        });
    }

    getTypeData(sourceUnitId) {
        if (sourceUnitId) {
            if (sourceUnitId) {
                this.paymentVoucherService.typeData(sourceUnitId).subscribe(data => {
                    this.types = data.type;
                });
            }
        }
    }

    editPreviousYearVoucher(data) {
        this.dialogRef = this._matDialog.open(PreviousYearAdvancesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', item: data}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getPreviousYearAdvances({});
        });
    }

    askForDelete(data): void {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: data}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deletePreviousYearVoucher(data);
            }
        });
    }

    deletePreviousYearVoucher(data) {
        this.previousYearAdvanceService.delete(data.id).subscribe(data => {
            this.getChildReportData(data);
        });
    }

    editSchedulePayeeEmployee(data, report) {
        this.dialogRef = this._matDialog.open(SchedulePayersEmployeePreviousAdvancesComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', rv: data, report: report}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getChildReportData(data);
        });
    }

    deleteSchedulePayeeEmployee(report, data) {
        this.previousYearAdvanceService.deleteSchedulePayee(report.id, data.id).subscribe(data => {
            this.getChildReportData(data);
        });
    }

    editSchedulePayeeCustomer(data, report) {
        this.dialogRef = this._matDialog.open(SchedulePayersCustomerPreviousAdvancesComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', rv: data, report: report}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getChildReportData(data);
        });
    }

    deleteSchedulePayeeCustomer(report, data) {
        this.previousYearAdvanceService.deleteSchedulePayee(report.id, data.id).subscribe(data => {
            this.getChildReportData(data);
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getPreviousYearAdvances();
    }
}
