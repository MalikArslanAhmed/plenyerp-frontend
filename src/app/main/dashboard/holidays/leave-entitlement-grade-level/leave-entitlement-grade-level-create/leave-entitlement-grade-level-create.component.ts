import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'leave-entitlement-grade-level-create',
    templateUrl: './leave-entitlement-grade-level-create.component.html',
    styleUrls: ['./leave-entitlement-grade-level-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveEntitlementGradeLevelCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    leaveEntitlementGradeLevelForm: FormGroup;
    isSubmitted = false;
    gradeLevels: any = [];
    updateData: any;
    dialogRef: any;
    stores = [];
    donationsForm: FormGroup;
    leaveGradeLevelList = []
    groupTypeList = []
    constructor(public matDialogRef: MatDialogRef<LeaveEntitlementGradeLevelCreateComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private contactInfoService: ContactInfoService,
    ) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Grade Level Entitlement';
            if (_data.leaveEntitlementGradeLevel) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Grade Level Entitlement';
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
        this.leaveEntitlementGradeLevelForm = this.fb.group({
            gradeId: [this._data.leaveEntitlementGradeLevelId, Validators.required],
            leaveTypeId: ['', Validators.required],
            dueDays: [0, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.leaveEntitlementGradeLevelForm.patchValue({
                gradeId: this.updateData.leaveEntitlementGradeLevel.gradeId,
                leaveTypeId: this.updateData.leaveEntitlementGradeLevel.leaveTypeId,
                dueDays: this.updateData.leaveEntitlementGradeLevel.dueDays
            });
        }
    }

    saveLeaveEntitlementGradeLevel() {
        this.isSubmitted = true;
        if (!this.leaveEntitlementGradeLevelForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            // console.log(this.leaveEntitlementGradeLevelForm.value);
            this.contactInfoService.addLeaveEntitlementGradeLevel(this.leaveEntitlementGradeLevelForm.value).subscribe(data => {
                this.leaveEntitlementGradeLevelForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateLeaveEntitlementGradeLevel() {
        this.isSubmitted = true;
        if (!this.leaveEntitlementGradeLevelForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateLeaveEntitlementGradeLevel(this.updateData.leaveEntitlementGradeLevel.id, this.leaveEntitlementGradeLevelForm.value).subscribe(data => {
                this.updateData = undefined;
                this.leaveEntitlementGradeLevelForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
