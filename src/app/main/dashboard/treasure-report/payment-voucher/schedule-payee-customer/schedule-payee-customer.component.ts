import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContactInfoService} from "../../../../../shared/services/contact-info.service";
import {fuseAnimations} from "../../../../../../@fuse/animations";

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

    constructor(public matDialogRef: MatDialogRef<SchedulePayeeCustomerComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private contactInfoService: ContactInfoService) {
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
            taxAmount: [''],
            totalAmount: [''],
            totalAmountInWords: ['']
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
}
