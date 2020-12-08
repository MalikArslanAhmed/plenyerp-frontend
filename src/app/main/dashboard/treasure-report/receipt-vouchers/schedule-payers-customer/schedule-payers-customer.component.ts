import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../../../shared/services/alert.service";
import {EmployeeService} from "../../../../../shared/services/employee.service";
import {PaymentVoucherTaxesComponent} from "../../payment-voucher/payment-voucher-taxes/payment-voucher-taxes.component";
import {NumberToWordsPipe} from "../../../../../shared/pipes/number-to-word.pipe";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {ReceiptVoucherService} from "../../../../../shared/services/receipt-voucher.service";
import {SelectPayersCustomerComponent} from "../select-payers-customer/select-payers-customer.component";

@Component({
    selector: 'app-schedule-payers-customer',
    templateUrl: './schedule-payers-customer.component.html',
    styleUrls: ['./schedule-payers-customer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SchedulePayersCustomerComponent implements OnInit {
    action: any;
    dialogTitle: any;
    schedulePayersCustomerForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    dialogRef: any;
    employees = [];
    customers = [];
    payeeData: any;
    banks = [];
    payeeBankId: any;

    constructor(public matDialogRef: MatDialogRef<SchedulePayersCustomerComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private employeesService: EmployeeService,
                private receiptVoucherService: ReceiptVoucherService) {
        this.payeeData = _data.pv;
        this.dialogTitle = 'Non-Personal Advance | RV - Schedule Payers Customer';
    }

    ngOnInit(): void {
        this.refresh();
        this.getEmployees();
    }

    refresh() {
        this.schedulePayersCustomerForm = this.fb.group({
            year: [{'value': '', disabled: true}],
            departmentalNo: [{'value': '', disabled: true}],
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

            this.schedulePayersCustomerForm.patchValue({
                'year': valArr2 && valArr2[0] ? valArr2[0] : ''
            });
        }
        this.schedulePayersCustomerForm.patchValue({
            'departmentalNo': this.payeeData && this.payeeData.deptalId ? this.payeeData.deptalId : ''
        })
    }

    savePayerCustomer() {
        this.isSubmitted = true;
        if (!this.schedulePayersCustomerForm.valid) {
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
                'companyId': this.schedulePayersCustomerForm.getRawValue().companyId,
                'netAmount': this.schedulePayersCustomerForm.getRawValue().netAmount,
                'totalTax': this.schedulePayersCustomerForm.getRawValue().totalTax,
                'year': this.schedulePayersCustomerForm.getRawValue().year,
                'details': this.schedulePayersCustomerForm.getRawValue().details,
                'payeeBankId': this.payeeBankId ? this.payeeBankId : ''
            };
            this.receiptVoucherService.schedulePayer(this.payeeData.id, params).subscribe(data => {
                this.schedulePayersCustomerForm.reset();
                this.matDialogRef.close(this.schedulePayersCustomerForm);
                this.isSubmitted = false;
            });
        }
    }

    addApplicableTaxes() {
        if (!this.schedulePayersCustomerForm.value || this.schedulePayersCustomerForm.value.netAmount === '') {
            this.alertService.showErrors('Net Amount can\'t be empty');
            return;
        }
        this.dialogRef = this._matDialog.open(PaymentVoucherTaxesComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'CREATE',
                netAmount: this.schedulePayersCustomerForm.value.netAmount,
            }
        });
        const numberToWords = new NumberToWordsPipe();
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.schedulePayersCustomerForm.patchValue({
                'totalTax': response['totalTaxes'],
                'totalAmount': parseInt(this.schedulePayersCustomerForm.value.netAmount) + parseInt(response['totalTaxes']),
                'totalAmountInWords': numberToWords.transform(parseInt(this.schedulePayersCustomerForm.value.netAmount) + parseInt(response['totalTaxes']))
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

            this.schedulePayersCustomerForm.patchValue({
                'payeeName': selectedEmployee
            });
        }
    }

    selectPayerCustomer() {
        this.dialogRef = this._matDialog.open(SelectPayersCustomerComponent, {
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
            this.schedulePayersCustomerForm.patchValue({
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
