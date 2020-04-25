import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AcademicMajorService} from "../../../../shared/services/academic-major.service";
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-acdemic-major-create',
    templateUrl: './acdemic-major-create.component.html',
    styleUrls: ['./acdemic-major-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AcdemicMajorCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    academicMajorForm: FormGroup;
    isSubmitted = false;
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<AcdemicMajorCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private academicMajorService: AcademicMajorService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Academic Major';
            if (_data.academicMajor) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Academic Major';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.academicMajorForm = this.fb.group({
            'name': ['', Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.academicMajorForm.patchValue({
                'name': this.updateData.academicMajor.name
            });
        }
    }

    saveAcademicMajor() {
        this.isSubmitted = true;
        if (!this.academicMajorForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.academicMajorService.addAcademicMajor(this.academicMajorForm.value).subscribe(data => {
                this.academicMajorForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateAcademicMajor() {
        this.isSubmitted = true;
        if (!this.academicMajorForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.academicMajorService.updateAcademicMajor(this.updateData.academicMajor.id, this.academicMajorForm.value).subscribe(data => {
                this.updateData = undefined;
                this.academicMajorForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
