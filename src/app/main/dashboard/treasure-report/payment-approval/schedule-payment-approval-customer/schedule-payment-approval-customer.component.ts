import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../../../shared/services/alert.service";
import {EmployeeService} from "../../../../../shared/services/employee.service";
import {PaymentVoucherTaxesComponent} from "../../payment-voucher/payment-voucher-taxes/payment-voucher-taxes.component";
import {NumberToWordsPipe} from "../../../../../shared/pipes/number-to-word.pipe";
import {SelectPayeeCustomerComponent} from "../../payment-voucher/select-payee-customer/select-payee-customer.component";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {PaymentApprovalService} from "../../../../../shared/services/payment-approval.service";

@Component({
    selector: 'app-schedule-payment-approval-customer',
    templateUrl: './schedule-payment-approval-customer.component.html',
    styleUrls: ['./schedule-payment-approval-customer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SchedulePaymentApprovalCustomerComponent implements OnInit {
    action: any;
    dialogTitle: any;
    schedulePayeeCustomerForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    dialogRef: any;
    employees = [];
    customers = [];
    payeeData: any;
    banks = [];
    payeeBankId: any;
    taxIds = [];

    constructor(public matDialogRef: MatDialogRef<SchedulePaymentApprovalCustomerComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private employeesService: EmployeeService,
                private paymentApprovalService: PaymentApprovalService) {
        if (_data.action === 'EDIT') {
            this.updateData = _data;
            this.payeeData = _data.pv;
        } else {
            this.payeeData = _data.pv;
        }
        this.dialogTitle = 'Schedule Payees Customer';
    }

    ngOnInit(): void {
        this.refresh();
        this.getEmployees();
        if (this.updateData) {
            this.patchForm();
        }
    }

    refresh() {
        this.schedulePayeeCustomerForm = this.fb.group({
            year: [{'value': '', disabled: true}],
            //departmentalNo: [{'value': '', disabled: true}],
            details: [''],
            companyId: [{'value': '', disabled: true}],
            payeeName: [{'value': '', disabled: true}],
            netAmount: [''],
            totalTax: [{'value': '', disabled: true}],
            totalAmount: [{'value': '', disabled: true}],
            totalAmountInWords: [{'value': '', disabled: true}]
        });
        if (this.payeeData && this.payeeData['valueDate']) {
            let valArr1 = this.payeeData['valueDate'].split(" ");
            let valArr2 = valArr1[0].split("-");

            this.schedulePayeeCustomerForm.patchValue({
                'year': valArr2 && valArr2[0] ? valArr2[0] : ''
            });
        }
        /*this.schedulePayeeCustomerForm.patchValue({
            'departmentalNo': this.payeeData && this.payeeData.deptalId ? this.payeeData.deptalId : ''
        })*/
    }

    patchForm() {
        const numberToWords = new NumberToWordsPipe();
        this.customers = [{
            'id': (this.updateData && this.updateData['pv'] && this.updateData['pv']['company']) ? this.updateData['pv']['company'].id : '',
            'name': (this.updateData && this.updateData['pv'] && this.updateData['pv']['company']) ? this.updateData['pv']['company'].id : '',
        }];
        this.getBanks(this.updateData['pv']['company'].id);
        this.payeeBankId = this.updateData['pv']['company']['companyBank'].bankId;
        this.schedulePayeeCustomerForm.patchValue({
            year: (this.updateData && this.updateData['report']) ? this.updateData['report'].year : '',
            departmentalNo: (this.updateData && this.updateData['report']) ? this.updateData['report'].deptalId : '',
            details: (this.updateData && this.updateData['pv']) ? this.updateData['pv'].details : '',
            companyId: (this.updateData && this.updateData['pv']) ? this.updateData['pv'].companyId : '',
            payeeName: (this.updateData && this.updateData['pv']) ? this.updateData['pv']['company'].name : '',
            netAmount: (this.updateData && this.updateData['pv']) ? this.updateData['pv'].netAmount : '',
            totalTax: (this.updateData && this.updateData['pv']) ? this.updateData['pv'].totalTax : '',
            totalAmount: (this.updateData && this.updateData['pv']) ? parseInt(this.updateData['pv'].netAmount) + parseInt(this.updateData['pv'].totalTax) : '',
            totalAmountInWords: numberToWords.transform(parseInt(this.updateData['pv'].netAmount) + parseInt(this.updateData['pv'].totalTax))
        });
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
            if (!this.updateData) {
                this.paymentApprovalService.schedulePayee(this.payeeData.id, params).subscribe(data => {
                    this.schedulePayeeCustomerForm.reset();
                    this.matDialogRef.close(this.schedulePayeeCustomerForm);
                    this.isSubmitted = false;
                });
            } else {
                this.paymentApprovalService.schedulePayeeUpdate(this.updateData['report'].id, this.payeeData.id, params).subscribe(data => {
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
                action: (this.updateData) ? 'EDIT' : 'CREATE',
                taxIds: (this.updateData && this.updateData['pv'] && this.updateData['pv'].taxIds) ? this.updateData['pv'].taxIds : '',
                payeeTaxes: (this.updateData && this.updateData['pv'] && this.updateData['pv'].payeeTaxes) ? this.updateData['pv'].payeeTaxes : '',
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
                'totalTax': response['totalTaxes'],
                'totalAmount': parseInt(this.schedulePayeeCustomerForm.value.netAmount) + parseInt(response['totalTaxes']),
                'totalAmountInWords': numberToWords.transform(parseInt(this.schedulePayeeCustomerForm.value.netAmount) + parseInt(response['totalTaxes']))
            });
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
