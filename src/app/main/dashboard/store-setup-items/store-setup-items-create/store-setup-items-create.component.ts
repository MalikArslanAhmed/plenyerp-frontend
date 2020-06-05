import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StoreSetupStoresCreateComponent} from "../../store-setup-stores/store-setup-stores-create/store-setup-stores-create.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StoreSetupItemsService} from 'app/shared/services/store-setup-items.service';
import {CategoriesListSelectComponent} from '../categories-list-select/categories-list-select.component';
import {StoreSetupUnitOfMeasuresService} from 'app/shared/services/store-setup-unit-of-measures.service';

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
    dialogRef: any;
    categories = [];
    unitOfMeasures = [];

    constructor(public matDialogRef: MatDialogRef<StoreSetupStoresCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private storeSetupItemsService: StoreSetupItemsService,
                private storeSetupUnitOfMeasuresService: StoreSetupUnitOfMeasuresService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Item';
            if (_data.store) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add New Item';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getStoreSetupUnitOfMeasure();
        this.checkForUpdate();
    }

    refresh() {
        this.itemForm = this.fb.group({
            'partNumber': ['', Validators.required],
            'description': ['', Validators.required],
            'categoryId': ['', Validators.required],
            'measurementId': ['', Validators.required],
            'unitPrice': ['', Validators.required],
            'leadDays': ['', Validators.required],
            'reorderQuantity': ['', Validators.required],
            'salesCommission': ['', Validators.required],
            'minimumQuantity': ['', Validators.required],
            'maximumQuantity': ['', Validators.required],
            'isChargedVat': [false, Validators.required],
            'isChargedOtherTax': [false, Validators.required],
            'isPhysicalQuantity': [false, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.itemForm.patchValue({
                'partNumber': this.updateData.store.partNumber,
                'description': this.updateData.store.description,
                'categoryId': this.updateData.store.categoryId,
                'measurementId': this.updateData.store.measurementId,
                'unitPrice': this.updateData.store.unitPrice,
                'leadDays': this.updateData.store.leadDays,
                'reorderQuantity': this.updateData.store.reorderQuantity,
                'salesCommission': this.updateData.store.salesCommission,
                'minimumQuantity': this.updateData.store.minimumQuantity,
                'maximumQuantity': this.updateData.store.maximumQuantity,
                'isChargedVat': this.updateData.store.isChargedVat,
                'isChargedOtherTax': this.updateData.store.isChargedOtherTax,
                'isPhysicalQuantity': this.updateData.store.isPhysicalQuantity,
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
            this.storeSetupItemsService.addStoreSetupItems(this.itemForm.value).subscribe(data => {
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
            this.storeSetupItemsService.updateStoreSetupItems(this.updateData.store.id, this.itemForm.value).subscribe(data => {
                this.updateData = undefined;
                this.itemForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    categorySelect() {
        this.dialogRef = this._matDialog.open(CategoriesListSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.categories = [{
                'name': response.name,
                'id': response.id
            }];
            this.itemForm.patchValue({
                categoryId: response.id,
                disabled: true
            });
        });
    }

    getStoreSetupUnitOfMeasure() {
        this.storeSetupUnitOfMeasuresService.getStoreSetupUnitOfMeasures({'page': -1}).subscribe(data => {
            this.unitOfMeasures = data.items;
            /*if (this.unitOfMeasures && this.unitOfMeasures.length > 0) {
                let i = 1;
                this.unitOfMeasures.forEach(qualification => {
                    qualification['sno'] = i;
                    i++;
                });
            }*/
        });
    }
}
