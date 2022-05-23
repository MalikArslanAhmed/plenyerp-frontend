import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'leave-credit-create',
    templateUrl: './leave-credit-create.component.html',
    styleUrls: ['./leave-credit-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveCreditCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    leaveCreditForm: FormGroup;
    isSubmitted = false;
    updateData: any;
    dialogRef: any;
    constructor(public matDialogRef: MatDialogRef<LeaveCreditCreateComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private contactInfoService: ContactInfoService,
    ) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Leave Credit';
            if (_data.leaveCredit) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Leave Credit';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }
    refresh() {
        this.leaveCreditForm = this.fb.group({
            year: ['', Validators.required],
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.leaveCreditForm.patchValue({
                year: this.updateData.leaveCredit.year,
            });
        }
    }

    saveLeaveCredit() {
        this.isSubmitted = true;
        if (!this.leaveCreditForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            // console.log(this.leaveCreditForm.value);
            this.contactInfoService.addLeaveCredit(this.leaveCreditForm.value).subscribe(data => {
                this.leaveCreditForm.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateLeaveCredit() {
        this.isSubmitted = true;
        if (!this.leaveCreditForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateLeaveCredit(this.updateData.leaveCredit.id, this.leaveCreditForm.value).subscribe(data => {
                this.updateData = undefined;
                this.leaveCreditForm.reset();
                this.isSubmitted = false;
            });

        }
    }
}
