import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {CategoriesService} from "../../../../shared/services/categories.service";
import {CategoriesCreateComponent} from '../categories-create/categories-create.component';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CategoriesListComponent implements OnInit {
    categories = [];
    displayedColumns = ['id', 'name', 'actions'];
    dialogRef: any;

    constructor(private categoriesService: CategoriesService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories() {
        this.categoriesService.getcategories({'page': -1}).subscribe(data => {
            this.categories = data.items;

            if (this.categories && this.categories.length > 0) {
                let i = 1;
                this.categories.forEach(category => {
                    category['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteCategory(id) {
        this.categoriesService.deletecategory(id).subscribe(data => {
            if (data) {
                this.getCategories();
            }
        })
    }

    editCategory(category) {
        this.dialogRef = this._matDialog.open(CategoriesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', category: category},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getCategories();
        });
    }
}
