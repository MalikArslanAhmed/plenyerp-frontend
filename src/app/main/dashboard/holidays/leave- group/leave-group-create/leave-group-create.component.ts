import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'leave-group-create',
    templateUrl: './leave-group-create.component.html',
    styleUrls: ['./leave-group-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveGroupCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    leaveGroup: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    countries = [];
    constructor(public matDialogRef: MatDialogRef<LeaveGroupCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private contactInfoService: ContactInfoService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Leave Group';
            if (_data.leaveGroup) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Leave Group';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.leaveGroup = this.fb.group({
            title: ['', Validators.required],
            isActive: [true, Validators.required],
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.leaveGroup.patchValue({
                title: this.updateData.leaveGroup.title,
                isActive: this.updateData.leaveGroup.isActive,
            });
        }
    }

    saveRegion() {
        this.isSubmitted = true;
        if (!this.leaveGroup.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.contactInfoService.addLeavesGroup(this.leaveGroup.value).subscribe(data => {
                this.leaveGroup.reset();
                this.isSubmitted = false;
            });


        }
    }

    updateRegion() {
        this.isSubmitted = true;
        if (!this.leaveGroup.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateLeavesGroup(this.updateData.leaveGroup.id, this.leaveGroup.value).subscribe(data => {
                this.updateData = undefined;
                this.leaveGroup.reset();
                this.isSubmitted = false;
            });

        }
    }


}
