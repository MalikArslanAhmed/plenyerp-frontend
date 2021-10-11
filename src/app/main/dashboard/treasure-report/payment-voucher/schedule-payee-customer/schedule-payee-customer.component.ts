import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {PaymentVoucherTaxesComponent} from '../payment-voucher-taxes/payment-voucher-taxes.component';
import {NumberToWordsPipe} from '../../../../../shared/pipes/number-to-word.pipe';
import {AlertService} from '../../../../../shared/services/alert.service';
import {EmployeeService} from '../../../../../shared/services/employee.service';
import {SelectPayeeCustomerComponent} from '../select-payee-customer/select-payee-customer.component';
import {PaymentVoucherService} from '../../../../../shared/services/payment-voucher.service';

@Component({
    selector: 'app-schedule-payee-customer',
    templateUrl: './schedule-payee-customer.component.html',
    styleUrls: ['./schedule-payee-customer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SchedulePayeeCustomerComponent implements OnInit {
    action: any;
    dialogTitle: any;
    schedulePayeeCustomerForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    dialogRef: any;
    employees = [];
    customers = [];
    payeeData: any;
    paymentVoucher: any;
    banks = [];
    payeeBankId: any;
    taxIds = [];

    constructor(public matDialogRef: MatDialogRef<SchedulePayeeCustomerComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private employeesService: EmployeeService,
                private paymentVoucherService: PaymentVoucherService) {
        if (_data.action === 'EDIT') {
            this.payeeData = _data.schedule;
            this.paymentVoucher = _data.pv;
            this.dialogTitle = (_data && _data['pv'].types && _data['pv'].types.name) ? _data['pv'].types.name + ' | PV - Schedule Payees Customer' : '-';
        } else {
            this.paymentVoucher = _data.pv;
            this.dialogTitle = (this.paymentVoucher && this.paymentVoucher.types && this.paymentVoucher.types.name) ? this.paymentVoucher.types.name + ' | PV - Schedule Payees Customer' : '-';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getEmployees();
        if (this.payeeData) {
            this.patchForm();
        }
    }

    refresh() {
        this.schedulePayeeCustomerForm = this.fb.group({
            year: [{'value': '', disabled: true}],
            departmentalNo: [{'value': '', disabled: true}],
            details: [''],
            companyId: [{'value': '', disabled: true}],
            payeeName: [{'value': '', disabled: true}],
            netAmount: [''],
            totalTax: [{'value': 0, disabled: true}],
            totalAmount: [{'value': '', disabled: true}],
            totalAmountInWords: [{'value': '', disabled: true}]
        });
        if (this.paymentVoucher && this.paymentVoucher['valueDate']) {
            let valArr1 = this.paymentVoucher['valueDate'].split(' ');
            let valArr2 = valArr1[0].split('-');

            this.schedulePayeeCustomerForm.patchValue({
                'year': valArr2 && valArr2[0] ? valArr2[0] : ''
            });
        }
        this.schedulePayeeCustomerForm.patchValue({
            'departmentalNo': this.paymentVoucher && this.paymentVoucher.deptalId ? this.paymentVoucher.deptalId : ''
        });

        if (this.paymentVoucher && this.paymentVoucher['voucherSourceUnit'] && this.paymentVoucher['voucherSourceUnit'].isPersonalAdvanceUnit) {
            this.schedulePayeeCustomerForm.patchValue({
                totalTax: 0
            });
        }
    }

    patchForm() {
        const numberToWords = new NumberToWordsPipe();
        this.customers = [{
            'id': this.payeeData['adminCompany'] ? this.payeeData['adminCompany'].id : '',
            'name': this.payeeData['adminCompany'] ? this.payeeData['adminCompany'].id : '',
        }];
        this.getBanks(this.payeeData['adminCompany'].id);
        this.payeeBankId = this.payeeData['adminCompany']['companyBank'].bankId;
        this.schedulePayeeCustomerForm.patchValue({
            year: this.paymentVoucher.year,
            departmentalNo: this.paymentVoucher.deptalId,
            details: this.payeeData.details,
            companyId: this.payeeData.companyId,
            payeeName: this.payeeData['adminCompany'].name,
            netAmount: this.payeeData.netAmount,
            totalTax: this.payeeData.totalTax,
            totalAmount: parseInt(this.payeeData.netAmount) + parseInt(this.payeeData.totalTax),
            totalAmountInWords: numberToWords.transform(parseInt(this.payeeData.netAmount) + parseInt(this.payeeData.totalTax))
        });
    }

    resetTax() {
        this.schedulePayeeCustomerForm.patchValue({
            'totalTax': '',
            'totalAmount': '',
            'totalAmountInWords': '',
        });

        if (this.paymentVoucher && this.paymentVoucher['voucherSourceUnit'] && this.paymentVoucher['voucherSourceUnit'].isPersonalAdvanceUnit) {
            const numberToWords = new NumberToWordsPipe();
            this.schedulePayeeCustomerForm.patchValue({
                'totalTax': 0,
                'totalAmount': parseInt(this.schedulePayeeCustomerForm.value.netAmount),
                'totalAmountInWords': numberToWords.transform(parseInt(this.schedulePayeeCustomerForm.value.netAmount))
            });
        }
    }

    savePayeeCustomer() {
        this.isSubmitted = true;
        if (!this.schedulePayeeCustomerForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (!this.payeeBankId || this.payeeBankId === '') {
            this.alertService.showErrors('Please select payee bank');
            this.isSubmitted = false;
            return;
        }

        if (this.schedulePayeeCustomerForm.getRawValue().netAmount === '') {
            this.alertService.showErrors('Please enter Net Amount');
            this.isSubmitted = false;
            return;
        }

        if (this.schedulePayeeCustomerForm.getRawValue().totalTax === '' && (this.paymentVoucher['voucherSourceUnit'] && !this.paymentVoucher['voucherSourceUnit'].isPersonalAdvanceUnit)) {
            this.alertService.showErrors('Please enter Tax Amount');
            this.isSubmitted = false;
            return;
        }

        if (this.schedulePayeeCustomerForm.getRawValue().totalAmount === '') {
            this.alertService.showErrors('Please enter Total Amount');
            this.isSubmitted = false;
            return;
        }

        if (this.schedulePayeeCustomerForm.getRawValue().totalAmountInWords === '') {
            this.alertService.showErrors('Please enter Total Amount (in Words)');
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            let params = {
                'companyId': this.schedulePayeeCustomerForm.getRawValue().companyId,
                'netAmount': this.schedulePayeeCustomerForm.getRawValue().netAmount,
                'totalTax': this.schedulePayeeCustomerForm.getRawValue().totalTax,
                'year': this.schedulePayeeCustomerForm.getRawValue().year,
                'details': this.schedulePayeeCustomerForm.getRawValue().details,
                'payeeBankId': this.payeeBankId ? this.payeeBankId : '',
                'taxIds': this.taxIds ? JSON.stringify(this.taxIds) : ''
            };
            if (!this.payeeData) {
                this.paymentVoucherService.schedulePayee(this.paymentVoucher.id, params).subscribe(data => {
                    this.schedulePayeeCustomerForm.reset();
                    this.matDialogRef.close(this.schedulePayeeCustomerForm);
                    this.isSubmitted = false;
                });
            } else {
                this.paymentVoucherService.updateScheduleCompany(this.paymentVoucher.id, this.payeeData.id, params).subscribe(data => {
                    this.schedulePayeeCustomerForm.reset();
                    this.matDialogRef.close(this.schedulePayeeCustomerForm);
                    this.isSubmitted = false;
                });
            }
        }
    }

    addApplicableTaxes() {
        if (!this.schedulePayeeCustomerForm.value || this.schedulePayeeCustomerForm.value.netAmount === '') {
            this.alertService.showErrors('Net Amount can\'t be empty');
            return;
        }
        this.dialogRef = this._matDialog.open(PaymentVoucherTaxesComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: (this.payeeData) ? 'EDIT' : 'CREATE',
                taxIds: (this.payeeData && this.payeeData && this.payeeData.taxIds) ? this.payeeData.taxIds : '',
                netAmount: this.schedulePayeeCustomerForm.value.netAmount,
            }
        });
        const numberToWords = new NumberToWordsPipe();
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.taxIds = [];
            if (response['taxes'] && response['taxes'].length > 0) {
                response['taxes'].forEach(tax => {
                    if (tax.checked) {
                        this.taxIds.push(tax);
                    }
                });
            }
            this.schedulePayeeCustomerForm.patchValue({
                totalTax: response['totalTaxes'],
                totalAmount: parseInt(this.schedulePayeeCustomerForm.value.netAmount) + parseInt(response['totalTaxes']),
                totalAmountInWords: numberToWords.transform(parseInt(this.schedulePayeeCustomerForm.value.netAmount) + parseInt(response['totalTaxes']))
            });
        });
    }

    calculateTotalAmount() {
        const numberToWords = new NumberToWordsPipe();
        const totalAmount = parseInt(this.schedulePayeeCustomerForm.value.netAmount) + parseInt(this.schedulePayeeCustomerForm.value.totalTax || 0);
        this.schedulePayeeCustomerForm.patchValue({
            totalAmount: totalAmount,
            totalAmountInWords: numberToWords.transform(totalAmount)
        });
    }

    getEmployees(): void {
        this.employees = [];
        this.employeesService.getEmployees({page: -1}).subscribe(data => {
            this.employees = data.items;
        });
    }

    payeeChange(event) {
        let selectedEmployee = '';
        if (this.employees && this.employees.length > 0 && event) {
            this.employees.forEach(employee => {
                if (parseInt(employee.id) === parseInt(event)) {
                    selectedEmployee = employee.firstName + '-' + employee.lastName;
                }
            });

            this.schedulePayeeCustomerForm.patchValue({
                'payeeName': selectedEmployee
            });
        }
    }

    selectPayeeCustomer() {
        this.dialogRef = this._matDialog.open(SelectPayeeCustomerComponent, {
            panelClass: 'transaction-items-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.customers = [{
                id: response.id,
                name: response.id,
            }];
            this.schedulePayeeCustomerForm.patchValue({
                'companyId': response.id,
                'payeeName': response.name
            });
            this.getBanks(response.id);
        });
    }

    getBanks(id) {
        this.employeesService.getCompanyBankDetailsList(id, {'page': -1}).subscribe(data => {
            this.banks = data.items;
        });
    }

    selectRadio(id) {
        this.payeeBankId = id;
    }
}
