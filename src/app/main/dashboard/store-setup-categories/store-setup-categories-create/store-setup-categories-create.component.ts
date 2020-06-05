import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {StoreSetupCategoriesService} from 'app/shared/services/store-setup-categories.service';

@Component({
    selector: 'app-store-setup-categories-create',
    templateUrl: './store-setup-categories-create.component.html',
    styleUrls: ['./store-setup-categories-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StoreSetupCategoriesCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    categoriesForm: FormGroup;
    isSubmitted = false;
    skills: any = [];
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<StoreSetupCategoriesCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private storeSetupCategoriesService: StoreSetupCategoriesService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Categories ' + _data.node.name;
            if (_data.node) {
                this.updateData = _data;
            }
        } else {
            if (_data.node.level === 0) {
                this.dialogTitle = 'Add Categories';
            } else {
                this.dialogTitle = 'Add Categories inside ' + _data.node.name;
            }
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.categoriesForm = this.fb.group({
            'name': ['', Validators.required],
            'isChildEnabled': [true, Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.categoriesForm.patchValue({
                'name': this.updateData.node.name,
                'isChildEnabled': this.updateData.node.isChildEnabled,
            });
        }
    }

    updateLocation() {
        this.isSubmitted = true;
        if (!this.categoriesForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.storeSetupCategoriesService.updateStoreCategories(this.updateData.node.id, this.categoriesForm.value).subscribe(data => {
                this.updateData = undefined;
                this.categoriesForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    createLocation() {
        if (this._data.node.parentId === 0) {
            this.categoriesForm.value['parentId'] = null;
        } else {
            this.categoriesForm.value['parentId'] = this._data.node.id;
        }
        this.isSubmitted = true;
        if (!this.categoriesForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.storeSetupCategoriesService.addStoreCategories(this.categoriesForm.value).subscribe(data => {
                this.updateData = undefined;
                this.categoriesForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
