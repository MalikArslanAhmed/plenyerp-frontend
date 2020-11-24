import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ContactInfoService} from "../../../../../shared/services/contact-info.service";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {ApplicableTaxesComponent} from "../../../applicable-taxes/applicable-taxes.component";
import {PaymentVoucherTaxesComponent} from '../payment-voucher-taxes/payment-voucher-taxes.component';

@Component({
    selector: 'app-schedule-payee-employee',
    templateUrl: './schedule-payee-employee.component.html',
    styleUrls: ['./schedule-payee-employee.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SchedulePayeeEmployeeComponent implements OnInit {
    action: any;
    dialogTitle: any;
    schedulePayeeEmployeeForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    dialogRef: any;

    constructor(public matDialogRef: MatDialogRef<SchedulePayeeEmployeeComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Country';
            if (_data.country) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Non-Personal Advance | PV - Schedule Payees Employee';
        }
    }

    ngOnInit(): void {
        this.refresh();
        // this.checkForUpdate();
    }

    refresh() {
        this.schedulePayeeEmployeeForm = this.fb.group({
            year: [''],
            departmentalNo: [''],
            details: [''],
            payeeId: [''],
            payeeName: [''],
            netAmount: [''],
            taxAmount: [''],
            totalAmount: [''],
            totalAmountInWords: ['']
        });
    }

    /*checkForUpdate() {
        if (this.updateData) {
            this.schedulePayeeEmployeeForm.patchValue({
                name: this.updateData.country.name,
                isActive: this.updateData.country.isActive
            });
        }
    }*/

    savePayeeEmployee() {
        this.isSubmitted = true;
        if (!this.schedulePayeeEmployeeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            console.log('this.schedulePayeeEmployeeForm.value', this.schedulePayeeEmployeeForm.value);
            /*this.contactInfoService.addCountry(this.schedulePayeeEmployeeForm.value).subscribe(data => {
                this.schedulePayeeEmployeeForm.reset();
                this.isSubmitted = false;
            });*/
        }
    }

    updatePayeeEmployee() {
        this.isSubmitted = true;
        if (!this.schedulePayeeEmployeeForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            console.log('this.schedulePayeeEmployeeForm.value', this.schedulePayeeEmployeeForm.value);
            /*this.contactInfoService.updateCountry(this.updateData.country.id, this.schedulePayeeEmployeeForm.value).subscribe(data => {
                this.updateData = undefined;
                this.schedulePayeeEmployeeForm.reset();
                this.isSubmitted = false;
            });*/
        }
    }

    addApplicableTaxes() {
        /*if (!this.salesInvoiceForm.value.itemId || this.salesInvoiceForm.value.itemId === '') {
            this.alertService.showErrors('Item Id can\'t be empty');
            return;
        } else if (!this.salesInvoiceForm.value.quantity || this.salesInvoiceForm.value.quantity === '') {
            this.alertService.showErrors('Quantity can\'t be empty');
            return;
        } else if (!this.salesInvoiceForm.value.unitSellingPrice || this.salesInvoiceForm.value.unitSellingPrice === '') {
            this.alertService.showErrors('Unit selling price can\'t be empty');
            return;
        }*/
        this.dialogRef = this._matDialog.open(PaymentVoucherTaxesComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'CREATE',
                // itemId: this.salesInvoiceForm.value.itemId,
                // taxArray: this.taxArray,
                netAmount: this.schedulePayeeEmployeeForm.value.netAmount,
            }
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            console.log('response', response);
            if (!response) {
                return;
            }
            // this.taxes = response.taxes;
            // this.totalTaxes = response.totalTaxes;
        });
    }
}
