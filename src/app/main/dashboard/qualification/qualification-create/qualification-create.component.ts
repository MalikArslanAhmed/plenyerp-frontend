import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QualificationService} from "../../../../shared/services/qualification.service";

@Component({
    selector: 'app-qualification-create',
    templateUrl: './qualification-create.component.html',
    styleUrls: ['./qualification-create.component.scss']
})
export class QualificationCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    qualificationForm: FormGroup;
    isSubmitted = false;
    qualifications: any = [];
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<QualificationCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private qualificationService: QualificationService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Qualification';
            if (_data.qualification) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Qualification';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.qualificationForm = this.fb.group({
            'name': ['', Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.qualificationForm.patchValue({
                'name': this.updateData.qualification.name
            });
        }
    }

    saveQualification() {
        this.isSubmitted = true;
        if (!this.qualificationForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.qualificationService.addQualification(this.qualificationForm.value).subscribe(data => {
                this.qualificationForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateQualification() {
        this.isSubmitted = true;
        if (!this.qualificationForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.qualificationService.updateQualification(this.updateData.qualification.id, this.qualificationForm.value).subscribe(data => {
                this.updateData = undefined;
                this.qualificationForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
