import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'leave-entitlement-salary-scale-create',
    templateUrl: './leave-entitlement-salary-scale-create.component.html',
    styleUrls: ['./leave-entitlement-salary-scale-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveEntitlementSalaryScaleCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    leaveEntitlementSalaryScaleForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    dialogRef: any;
    stores = [];
    donationsForm: FormGroup;
    leaveSalaryScaleList = []
    groupTypeList = []
    constructor(public matDialogRef: MatDialogRef<LeaveEntitlementSalaryScaleCreateComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private contactInfoService: ContactInfoService,
    ) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Salary Scale Entitlement';
            if (_data.leaveEntitlementSalaryScale) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Salary Scale Entitlement';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getleaveTypeList()
        this.checkForUpdate();
    }
    getleaveTypeList() {
        this.contactInfoService.getLeavesTypeList({}).subscribe(data => {
            this.groupTypeList = data.items
        })
    }
    refresh() {
        this.leaveEntitlementSalaryScaleForm = this.fb.group({
            salaryId: [this._data.leaveEntitlementSalaryScaleId, Validators.required],
            leaveTypeId: ['', Validators.required],
            dueDays: [0, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.leaveEntitlementSalaryScaleForm.patchValue({
                salaryId: this.updateData.leaveEntitlementSalaryScale.salaryId,
                leaveTypeId: this.updateData.leaveEntitlementSalaryScale.leaveTypeId,
                dueDays: this.updateData.leaveEntitlementSalaryScale.dueDays
            });
        }
    }

    saveLeaveGroupEntitlement() {
        this.isSubmitted = true;
        if (!this.leaveEntitlementSalaryScaleForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            // console.log(this.leaveEntitlementSalaryScaleForm.value);
            this.contactInfoService.addLeaveEntitlementSalaryScale(this.leaveEntitlementSalaryScaleForm.value).subscribe(data => {
                this.leaveEntitlementSalaryScaleForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateLeaveGroupEntitlement() {
        this.isSubmitted = true;
        if (!this.leaveEntitlementSalaryScaleForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateLeaveEntitlementSalaryScale(this.updateData.leaveEntitlementSalaryScale.id, this.leaveEntitlementSalaryScaleForm.value).subscribe(data => {
                this.updateData = undefined;
                this.leaveEntitlementSalaryScaleForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
