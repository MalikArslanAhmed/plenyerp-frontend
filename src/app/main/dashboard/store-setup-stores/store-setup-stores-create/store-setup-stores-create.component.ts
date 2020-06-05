import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StoreSetupStoresService} from "../../../../shared/services/store-setup-stores.service";

@Component({
    selector: 'app-store-setup-stores-create',
    templateUrl: './store-setup-stores-create.component.html',
    styleUrls: ['./store-setup-stores-create.component.scss']
})
export class StoreSetupStoresCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    storeForm: FormGroup;
    isSubmitted = false;
    qualifications: any = [];
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<StoreSetupStoresCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private storeSetupStoresService: StoreSetupStoresService,) {
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
        this.storeForm = this.fb.group({
            'name': ['', Validators.required],
            'isActive': [true, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.storeForm.patchValue({
                'name': this.updateData.store.name,
                'isActive': this.updateData.store.isActive
            });
        }
    }

    saveStore() {
        this.isSubmitted = true;
        if (!this.storeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.storeSetupStoresService.addStoreSetupStore(this.storeForm.value).subscribe(data => {
                this.storeForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateStore() {
        this.isSubmitted = true;
        if (!this.storeForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.storeSetupStoresService.updateStoreSetupStore(this.updateData.store.id, this.storeForm.value).subscribe(data => {
                this.updateData = undefined;
                this.storeForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
