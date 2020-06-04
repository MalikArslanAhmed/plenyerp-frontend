import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QualificationService} from "../../../../shared/services/qualification.service";

@Component({
    selector: 'app-store-setup-unit-of-measures-create',
    templateUrl: './store-setup-unit-of-measures-create.component.html',
    styleUrls: ['./store-setup-unit-of-measures-create.component.scss']
})
export class StoreSetupUnitOfMeasuresCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    storeSetupUnitOfMeasuresForm: FormGroup;
    isSubmitted = false;
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<StoreSetupUnitOfMeasuresCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private qualificationService: QualificationService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit unit of measures';
            if (_data.store) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add unit of measures';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.storeSetupUnitOfMeasuresForm = this.fb.group({
            'name': ['', Validators.required],
            'isActive': [true, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.storeSetupUnitOfMeasuresForm.patchValue({
                'name': this.updateData.store.name,
                'isActive': this.updateData.store.isActive
            });
        }
    }

    saveUnitOfMeasures() {
        this.isSubmitted = true;
        if (!this.storeSetupUnitOfMeasuresForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.qualificationService.addQualification(this.storeSetupUnitOfMeasuresForm.value).subscribe(data => {
                this.storeSetupUnitOfMeasuresForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateUnitOfMeasures() {
        this.isSubmitted = true;
        if (!this.storeSetupUnitOfMeasuresForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.qualificationService.updateQualification(this.updateData.store.id, this.storeSetupUnitOfMeasuresForm.value).subscribe(data => {
                this.updateData = undefined;
                this.storeSetupUnitOfMeasuresForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
