import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {CategoriesService} from "../../../../shared/services/categories.service";
import {CategoriesCreateComponent} from '../categories-create/categories-create.component';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from '../../delete-list-modal/delete-list-modal.component';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CategoriesListComponent implements OnInit {
    categories = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    constructor(private categoriesService: CategoriesService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories() {
        this.categories = [];
        this.categoriesService.getCategories({page: this.pagination.page}).subscribe(data => {
            this.categories = data.items;

            if (this.categories && this.categories.length > 0) {
                let i = 1;
                this.categories.forEach(category => {
                    category['sno'] = i;
                    i++;
                });
            }
            this.pagination.page = data.page;
            this.pagination.total = data.total;
        });
    }

    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteCategory(items.id);
            }
        });

    } 

    deleteCategory(id) {
        this.categoriesService.deleteCategory(id).subscribe(data => {
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
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getCategories();
    }
}
