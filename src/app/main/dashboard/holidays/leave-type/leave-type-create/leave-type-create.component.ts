import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'leave-type-create',
    templateUrl: './leave-type-create.component.html',
    styleUrls: ['./leave-type-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveTypeCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    leavesTypeForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;   
    constructor(public matDialogRef: MatDialogRef<LeaveTypeCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private contactInfoService: ContactInfoService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Leave';
            if (_data.leave) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Leave';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.leavesTypeForm = this.fb.group({
            title: ['', Validators.required],
            shortName: ['', Validators.required],
            isPaidLeave: [false, Validators.required],
            isCalenderDays: [false, Validators.required],
            entitledAnnually: [false, Validators.required],
            rollOverUnusedLeave: [false, Validators.required],
            isActive: [true, Validators.required],
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.leavesTypeForm.patchValue({
                title: this.updateData.leave.title,
                shortName: this.updateData.leave.shortName,
                isPaidLeave: this.updateData.leave.isPaidLeave,
                isCalenderDays: this.updateData.leave.isCalenderDays,
                entitledAnnually: this.updateData.leave.entitledAnnually,
                rollOverUnusedLeave: this.updateData.leave.rollOverUnusedLeave,
                isActive: this.updateData.leave.isActive,
            });
        }
    }

    saveLeaves() {
        this.isSubmitted = true;
        if (!this.leavesTypeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            // console.log(this.leavesTypeForm.value);
            this.contactInfoService.addLeaves(this.leavesTypeForm.value).subscribe(data => {
                this.leavesTypeForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateLeaves() {
        this.isSubmitted = true;
        if (!this.leavesTypeForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateLeaves(this.updateData.leave.id, this.leavesTypeForm.value).subscribe(data => {
                this.updateData = undefined;
                this.leavesTypeForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
