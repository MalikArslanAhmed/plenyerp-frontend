import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../shared/services/contact-info.service';

@Component({
    selector: 'app-designation-create',
    templateUrl: './designation-create.component.html',
    styleUrls: ['./designation-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DesignationCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    designationForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    countries = [];
    constructor(public matDialogRef: MatDialogRef<DesignationCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private contactInfoService: ContactInfoService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Designation';
            if (_data.designation) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Designation';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.designationForm = this.fb.group({
            name: ['', Validators.required],
            isActive: [true, Validators.required],
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.designationForm.patchValue({
                name: this.updateData.designation.name,
                isActive: this.updateData.designation.isActive,
            });
        }
    }

    saveDesignation() {
        this.isSubmitted = true;
        if (!this.designationForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.contactInfoService.addDesignation(this.designationForm.value).subscribe(data => {
                this.designationForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateDesignation() {
        this.isSubmitted = true;
        if (!this.designationForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.contactInfoService.updateDesignation(this.updateData.designation.id, this.designationForm.value).subscribe(data => {
                this.updateData = undefined;
                this.designationForm.reset();
                this.isSubmitted = false;
            });

        }
    }


}
