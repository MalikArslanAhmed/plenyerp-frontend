import {Component, Inject, OnInit} from '@angular/core';
import {QualificationService} from "../../../../shared/services/qualification.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StoreSetupStoresCreateComponent} from "../../store-setup-stores/store-setup-stores-create/store-setup-stores-create.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-store-setup-items-create',
    templateUrl: './store-setup-items-create.component.html',
    styleUrls: ['./store-setup-items-create.component.scss']
})
export class StoreSetupItemsCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    itemForm: FormGroup;
    isSubmitted = false;
    qualifications: any = [];
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<StoreSetupStoresCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private qualificationService: QualificationService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Store';
            if (_data.store) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add New Store';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.itemForm = this.fb.group({
            'name': ['', Validators.required],
            'isActive': [true, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.itemForm.patchValue({
                'name': this.updateData.store.name,
                'isActive': this.updateData.store.isActive
            });
        }
    }

    saveStore() {
        this.isSubmitted = true;
        if (!this.itemForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.qualificationService.addQualification(this.itemForm.value).subscribe(data => {
                this.itemForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateStore() {
        this.isSubmitted = true;
        if (!this.itemForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.qualificationService.updateQualification(this.updateData.store.id, this.itemForm.value).subscribe(data => {
                this.updateData = undefined;
                this.itemForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
