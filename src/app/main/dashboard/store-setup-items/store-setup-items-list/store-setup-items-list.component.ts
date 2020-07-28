import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {StoreSetupItemsCreateComponent} from '../store-setup-items-create/store-setup-items-create.component';
import {StoreSetupItemsService} from '../../../../shared/services/store-setup-items.service';
import {CategoriesListSelectComponent} from '../categories-list-select/categories-list-select.component';
import {PageEvent} from '@angular/material/paginator';
import {DeleteListModalComponent} from '../../delete-list-modal/delete-list-modal.component';

@Component({
    selector: 'app-store-setup-items-list',
    templateUrl: './store-setup-items-list.component.html',
    styleUrls: ['./store-setup-items-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StoreSetupItemsListComponent implements OnInit {
    items = [];
    displayedColumns = ['sno', 'id', 'description', 'unit', 'category', 'actions'];
    dialogRef: any;
    itemsFilterForm: FormGroup;
    categories = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    itemIdAll = [];
    filters = {};

    constructor(private storeSetupItemsService: StoreSetupItemsService,
                private fb: FormBuilder,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getStores();
    }

    refresh() {
        this.itemsFilterForm = this.fb.group({
            categoryId: [''],
            search: [''],
        });
    }

    getStores(params = {}) {
        this.storeSetupItemsService.getStoreSetupItems(params).subscribe(data => {
            this.items = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.items && this.items.length > 0) {
                let i = 1;
                this.items.forEach(store => {
                    store['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteStore(items.id);
            }
        });

    }

    deleteStore(id) {
        this.storeSetupItemsService.deleteStoreSetupItems(id).subscribe(data => {
            if (data) {
                this.getStores();
            }
        });
    }

    editStore(store) {
        this.dialogRef = this._matDialog.open(StoreSetupItemsCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', store: store},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getStores();
        });
    }

    getItems(params) {
        this.getStores(params);
    }

    categorySelect() {
        this.dialogRef = this._matDialog.open(CategoriesListSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.itemIdAll = [];
            this.itemIdAll.push(response.id);
            this.findAllIds(response);

            this.categories = [{
                'name': response.name,
                'id': response.id
            }];
            this.itemsFilterForm.patchValue({
                categoryId: response.id,
            });

            this.filters['categoryIds'] = JSON.stringify(this.itemIdAll);
            this.getStores(this.filters);
        });
    }

    resetEmployeeFilter() {
        this.itemsFilterForm.patchValue({
            'categoryId': '',
            'search': ''
        });
        this.getStores();
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getStores({page: this.pagination.page});
    }

    findAllIds(data) {
        if (data && data['children'] && data['children'].length > 0) {
            data.children.forEach(item => {
                if (item.children && item.children.length) {
                    this.itemIdAll.push(item.id);
                    this.findAllIds(item);
                } else {
                    this.itemIdAll.push(item.id);
                    return;
                }
            });
        }
    }
}
