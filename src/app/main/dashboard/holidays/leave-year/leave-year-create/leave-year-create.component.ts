import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EmployeesService } from 'app/shared/services/employees.service';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'leave-year-create',
    templateUrl: './leave-year-create.component.html',
    styleUrls: ['./leave-year-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveYearCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    leaveYearForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    dialogRef: any;
    stores = [];
    donationsForm: FormGroup;
    leaveGroupList = []
    groupTypeList = []
    constructor(public matDialogRef: MatDialogRef<LeaveYearCreateComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private contactInfoService: ContactInfoService,
    ) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Leave Year';
            if (_data.leaveYear) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Leave Year';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }
    refresh() {
        this.leaveYearForm = this.fb.group({
            year: ['', Validators.required],
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.leaveYearForm.patchValue({
                year: this.updateData.leaveYear.year,
            });
        }
    }

    saveLeaveYear() {
        this.isSubmitted = true;
        if (!this.leaveYearForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            // console.log(this.leaveYearForm.value);
            this.contactInfoService.addLeaveYear(this.leaveYearForm.value).subscribe(data => {
                this.leaveYearForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateLeaveYear() {
        this.isSubmitted = true;
        if (!this.leaveYearForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateLeaveYear(this.updateData.leaveYear.id, this.leaveYearForm.value).subscribe(data => {
                this.updateData = undefined;
                this.leaveYearForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
