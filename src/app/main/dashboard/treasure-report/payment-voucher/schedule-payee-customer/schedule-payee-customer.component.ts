import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {PaymentVoucherTaxesComponent} from "../payment-voucher-taxes/payment-voucher-taxes.component";
import {NumberToWordsPipe} from "../../../../../shared/pipes/number-to-word.pipe";
import {AlertService} from "../../../../../shared/services/alert.service";
import {EmployeeService} from "../../../../../shared/services/employee.service";

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
    updateData: any;
    dialogRef: any;
    employees = [];

    constructor(public matDialogRef: MatDialogRef<SchedulePayeeCustomerComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private employeesService: EmployeeService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Country';
            if (_data.country) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Non-Personal Advance | PV - Schedule Payees Customer';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getEmployees();
        // this.checkForUpdate();
    }

    refresh() {
        this.schedulePayeeCustomerForm = this.fb.group({
            year: [''],
            departmentalNo: [''],
            details: [''],
            payeeId: [''],
            payeeName: [''],
            netAmount: [''],
            taxAmount: [{'value': '', disabled: true}],
            totalAmount: [{'value': '', disabled: true}],
            totalAmountInWords: [{'value': '', disabled: true}]
        });
    }

    /*checkForUpdate() {
        if (this.updateData) {
            this.schedulePayeeCustomerForm.patchValue({
                name: this.updateData.country.name,
                isActive: this.updateData.country.isActive
            });
        }
    }*/

    savePayeeCustomer() {
        this.isSubmitted = true;
        if (!this.schedulePayeeCustomerForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            console.log('this.schedulePayeeCustomerForm.value', this.schedulePayeeCustomerForm.value);
            /*this.contactInfoService.addCountry(this.schedulePayeeCustomerForm.value).subscribe(data => {
                this.schedulePayeeCustomerForm.reset();
                this.isSubmitted = false;
            });*/
        }
    }

    updatePayeeCustomer() {
        this.isSubmitted = true;
        if (!this.schedulePayeeCustomerForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            console.log('this.schedulePayeeCustomerForm.value', this.schedulePayeeCustomerForm.value);
            /*this.contactInfoService.updateCountry(this.updateData.country.id, this.schedulePayeeCustomerForm.value).subscribe(data => {
                this.updateData = undefined;
                this.schedulePayeeCustomerForm.reset();
                this.isSubmitted = false;
            });*/
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
                action: 'CREATE',
                netAmount: this.schedulePayeeCustomerForm.value.netAmount,
            }
        });
        const numberToWords = new NumberToWordsPipe();
        this.dialogRef.afterClosed().subscribe((response) => {
            console.log('response', response);
            if (!response) {
                return;
            }
            this.schedulePayeeCustomerForm.patchValue({
                'taxAmount': response['totalTaxes'],
                'totalAmount': parseFloat(this.schedulePayeeCustomerForm.value.netAmount) + parseFloat(response['totalTaxes']),
                'totalAmountInWords': numberToWords.transform(parseFloat(this.schedulePayeeCustomerForm.value.netAmount) + parseFloat(response['totalTaxes']))
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
}
