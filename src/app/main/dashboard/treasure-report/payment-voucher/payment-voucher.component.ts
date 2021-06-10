import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {MatDialog} from '@angular/material/dialog';
import {SchedulePayeeCustomerComponent} from './schedule-payee-customer/schedule-payee-customer.component';
import {SchedulePayeeEmployeeComponent} from './schedule-payee-employee/schedule-payee-employee.component';
import {PaymentVoucherCreateComponent} from './payment-voucher-create/payment-voucher-create.component';
import {AlertService} from '../../../../shared/services/alert.service';
import {PaymentVoucherService} from '../../../../shared/services/payment-voucher.service';
import * as moment from 'moment';
import {TreasureReportService} from '../../../../shared/services/treasure-report.service';
import {ScheduleEconomicCodesComponent} from './schedule-economic-codes/schedule-economic-codes.component';
import {Router} from '@angular/router';
import {PermissionConstant} from '../../../../shared/constants/permission-constant';
import {DeleteListModalComponent} from '../../delete-list-modal/delete-list-modal.component';


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
    panelOpenState = false;
    sourceUnit = [];
    statuses = [];
    types = [];
    dialogRef: any;
    status = 'ALL';
    selectedStatus = [];
    permissionAddPv = [PermissionConstant.PV_VOUCHER_DETAILS_ADD];
    permissionEditPv = [PermissionConstant.PV_VOUCHER_EDIT];
    permissionDelPv = [PermissionConstant.PV_VOUCHER_DELETE];
    permissionPDFPv = [PermissionConstant.PV_VOUCHER_EXPORT_PDF];
    permissionAddPayee = [PermissionConstant.PV_VOUCHER_SCHEDULE_PAYEE_EMPLOYEES_ADD];
    permissionEditPayee = [PermissionConstant.PV_VOUCHER_SCHEDULE_PAYEE_ECONOMIC_CODES_ADD];
    permissionAddSchCodes = [PermissionConstant.PV_VOUCHER_SCHEDULE_ECONOMIC_CODE_ADD];
    permissionEditSchCodes = [PermissionConstant.PV_VOUCHER_SCHEDULE_PAYEE_ECONOMIC_CODES_ADD];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    selectedDateFromModal;
    constructor(private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private paymentVoucherService: PaymentVoucherService,
                private treasureReportService: TreasureReportService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getPaymentVoucher({});
        this.getVoucherSourceUnitList();
        this.paymentVoucherStatus({});
    }

    refresh(): void {
        this.filterPaymentVoucherForm = this.fb.group({
            status: ['ALL'],
            search: [''],
            sourceUnit: ['']
        });
        this.createPaymentVoucherForm = this.fb.group({
            sourceUnit: [''],
            type: ['']
        });
        this.createPaymentVoucherForm.get('sourceUnit').valueChanges.subscribe(val => {
            this.types = [];
            this.createPaymentVoucherForm.get('type').reset();
            if (val) {
                this.getTypeData(val);
            }
        });
    }

    getPaymentVoucher(params?) {
        const param = {
            ...params,
            page: this.pagination.page
        };
        this.paymentVoucherService.get(param).subscribe(data => {
            this.paymentVoucherData = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
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
            // this.getChildReportData(data);
            this.getPaymentVoucher();
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
            // this.getChildReportData(data);
            this.getPaymentVoucher();
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

    askForDelete(data, type): void {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: data}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                if (type === 'economicCode') {
                    this.deleteEconomicCode(data);
                } else if (type === 'paymentVoucher') {
                    this.deletePaymentVoucher(data);
                } else if (type === 'schedulePayeeEmployee') {

                }
            }
        });
    }

    deleteEconomicCode(data) {
        this.paymentVoucherService.deleteEconomicCode(data.payeeVoucherId, data.id).subscribe(data => {
            this.getPaymentVoucher({});
        });
    }

    filterPaymentVoucher() {
        const params = {};
        if (this.filterPaymentVoucherForm.value.status !== 'ALL') {
            params['status'] = this.filterPaymentVoucherForm.value.status;
        }
        this.status = this.filterPaymentVoucherForm.value.status;
        params['sourceUnit'] = this.filterPaymentVoucherForm.value.sourceUnit;
        params['search'] = this.filterPaymentVoucherForm.value.search;
        this.getPaymentVoucher(params);
        this.paymentVoucherStatus(this.status);
    }

    addPaymentVoucher() {
        if (!this.createPaymentVoucherForm.value['sourceUnit'] || this.createPaymentVoucherForm.value['sourceUnit'] === '') {
            this.alertService.showErrors('Please Choose Voucher Source Unit');
            return;
        } else if (!this.createPaymentVoucherForm.value['type'] || this.createPaymentVoucherForm.value['type'] === '') {
            this.alertService.showErrors('Please Choose Payment Voucher Type');
            return;
        }

        if (this.types && this.types.length > 0 && this.sourceUnit && this.sourceUnit.length > 0) {
            let selectedType = '';
            let selectedTypeValue = '';
            this.types.forEach(type => {
                if (type.value === this.createPaymentVoucherForm.value['type']) {
                    selectedType = type.name;
                    selectedTypeValue = type.value;
                }
            });

            const selectedSource = [];
            this.sourceUnit.forEach(source => {
                if (source.id === this.createPaymentVoucherForm.value['sourceUnit']) {
                    selectedSource.push({
                        name: source.id + ' - ' + source.longName,
                        value: source.id,
                        isPersonalAdvanceUnit: source.isPersonalAdvanceUnit
                    });
                }
            });

            this.dialogRef = this._matDialog.open(PaymentVoucherCreateComponent, {
                panelClass: 'contact-form-dialog',
                data: {header: selectedType, source: selectedSource, type: selectedTypeValue}
            });
            this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                this.getPaymentVoucher({});
            });
        }
    }

    getVoucherSourceUnitList() {
        this.sourceUnit = [];
        this.treasureReportService.list({page: -1}).subscribe(data => {
            this.sourceUnit = data.items;
        });
    }

    checkPV(index, event, reportData) {
        /*if (this.filterPaymentVoucherForm.value && this.filterPaymentVoucherForm.value.status === 'AUDITED') {
            let paymentVoucherTypes = [];
            if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
                this.paymentVoucherData.forEach(paymentVoucher => {
                    if (paymentVoucher['voucherSourceUnit'].isPersonalAdvanceUnit && paymentVoucher['checked']) {
                        paymentVoucherTypes.push("PERSONAL_ADVANCES_VOUCHER");
                    } else if (!paymentVoucher['voucherSourceUnit'].isPersonalAdvanceUnit && paymentVoucher['checked']) {
                        paymentVoucherTypes.push("NON_PERSONAL_ADVANCES_VOUCHER");
                    }
                });
                if (paymentVoucherTypes && paymentVoucherTypes.length > 0) {
                    if (paymentVoucherTypes.includes("PERSONAL_ADVANCES_VOUCHER") && !paymentVoucherTypes.includes("NON_PERSONAL_ADVANCES_VOUCHER") && reportData['voucherSourceUnit'].isPersonalAdvanceUnit) {
                        this.paymentVoucherData[index].checked = event.checked;
                        this.selectedStatus[0] = this.statuses[7];
                    } else if (paymentVoucherTypes.includes("PERSONAL_ADVANCES_VOUCHER") && paymentVoucherTypes.includes("NON_PERSONAL_ADVANCES_VOUCHER") && !reportData['voucherSourceUnit'].isPersonalAdvanceUnit) {
                        reportData.checked = false;
                        event['checked'] = false;
                        event['source'].checked = false;
                        this.alertService.showErrors('Please choose only personnel advances payment vouchers');
                    } else if (!paymentVoucherTypes.includes("PERSONAL_ADVANCES_VOUCHER") && paymentVoucherTypes.includes("NON_PERSONAL_ADVANCES_VOUCHER") && !reportData['voucherSourceUnit'].isPersonalAdvanceUnit) {
                        this.paymentVoucherData[index].checked = event.checked;
                        this.selectedStatus[0] = this.statuses[6];
                    } else if (paymentVoucherTypes.includes("PERSONAL_ADVANCES_VOUCHER") && paymentVoucherTypes.includes("NON_PERSONAL_ADVANCES_VOUCHER") && reportData['voucherSourceUnit'].isPersonalAdvanceUnit) {
                        reportData.checked = false;
                        event['checked'] = false;
                        event['source'].checked = false;
                        this.alertService.showErrors('Personnel advances payment vouchers can\'t be choose here');
                    }
                } else {
                    this.paymentVoucherData[index].checked = event.checked;
                    this.selectedStatus[0] = this.statuses[6];
                }
            }
        } else {
            this.paymentVoucherData[index].checked = event.checked;
        }*/
        if (this.filterPaymentVoucherForm.value && this.filterPaymentVoucherForm.value.status === 'AUDITED') {
            this.paymentVoucherData[index].checked = event.checked;
        }
    }

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
        this.paymentVoucherService.getPaymentVoucherStatus(params).subscribe(data => {
            this.statuses = data.status;
        });
    }

    askForConfirmation(data): void {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: data, header: 'Mark as ' + data, showUserNameAndDate: true}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (response && response.isDeleteItems) {
                this.selectedDateFromModal = moment(response.date).format('YYYY-MM-DD');
                this.updateStatus(data);
            }
        });
    }

    updateStatus(status: string): void {
        const paymentVoucherId = [];
        if (this.paymentVoucherData && this.paymentVoucherData.length) {
            this.paymentVoucherData.forEach(item => {
                if (item.checked === true) {
                    paymentVoucherId.push(item.id);
                }
            });
            const params = {
                status: status,
                paymentVoucherIds: paymentVoucherId,
                date: this.selectedDateFromModal
            };
            if (status === 'ON_MANDATE' && params['paymentVoucherIds'] && params['paymentVoucherIds'].length > 0) {
                const url = '/dashboard/on-mandate?paymentVoucherIds=' + JSON.stringify(params['paymentVoucherIds']);
                this.router.navigateByUrl(url);
            } else {
                this.paymentVoucherService.getUpdateStatus(params).subscribe(data => {
                    // console.log(data);
                });
            }
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

    editPaymentVoucher(data) {
        this.dialogRef = this._matDialog.open(PaymentVoucherCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', item: data}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getPaymentVoucher({});
        });
    }

    deletePaymentVoucher(data) {
        this.paymentVoucherService.delete(data.id).subscribe(data => {
            this.getPaymentVoucher({});
        });
    }

    downloadPDF(data, type) {
        if (type === 'PAYMENT_VOUCHER') {
            this.paymentVoucherService.downloadPDF(data.id).subscribe(data => {
                window.open(data.url, '_blank');
            });
        } else if (type === 'PAYMENT_VOUCHER_TAX') {
            this.paymentVoucherService.downloadPDFTax(data.id).subscribe(data => {
                window.open(data.url, '_blank');
            });
        }
    }

    editSchedulePayeeEmployee(data, report) {
        this.dialogRef = this._matDialog.open(SchedulePayeeEmployeeComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', pv: report, schedule: data}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getPaymentVoucher({});
        });
    }

    deleteSchedulePayeeEmployee(report, data): void {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: data}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.paymentVoucherService.deleteSchedulePayee(report.id, data.id).subscribe(data => {
                    this.getPaymentVoucher({});
                });
            }
        });
    }

    editSchedulePayeeCustomer(data, report) {
        this.dialogRef = this._matDialog.open(SchedulePayeeCustomerComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', pv: report, schedule: data}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getPaymentVoucher({});
        });
    }

    deleteSchedulePayeeCustomer(report, data): void {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: data}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.paymentVoucherService.deleteScheduleCustomer(report.id, data.id).subscribe(data => {
                    this.getPaymentVoucher({});
                });
            }
        });
    }

    onPageChange(page): void {
        this.pagination.page = page.pageIndex + 1;
        this.getPaymentVoucher({});
    }
}
