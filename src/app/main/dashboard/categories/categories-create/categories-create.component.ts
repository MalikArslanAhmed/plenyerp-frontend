import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {CategoriesService} from "../../../../shared/services/categories.service";

@Component({
    selector: 'app-categories-create',
    templateUrl: './categories-create.component.html',
    styleUrls: ['./categories-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CategoriesCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    categoriesForm: FormGroup;
    isSubmitted = false;
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<CategoriesCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private categoriesService: CategoriesService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Categories';
            if (_data.category) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Category';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.categoriesForm = this.fb.group({
            'name': ['', Validators.required]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.categoriesForm.patchValue({
                'name': this.updateData.category.name
            });
        }
    }

    saveCategory() {
        this.isSubmitted = true;
        if (!this.categoriesForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.categoriesService.addcategory(this.categoriesForm.value).subscribe(data => {
                this.categoriesForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updatecategory() {
        this.isSubmitted = true;
        if (!this.categoriesForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.categoriesService.updateCategory(this.updateData.category.id, this.categoriesForm.value).subscribe(data => {
                this.updateData = undefined;
                this.categoriesForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
