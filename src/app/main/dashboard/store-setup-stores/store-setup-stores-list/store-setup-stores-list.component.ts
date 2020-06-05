import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {StoreSetupStoresCreateComponent} from '../store-setup-stores-create/store-setup-stores-create.component';
import {StoreSetupStoresService} from 'app/shared/services/store-setup-stores.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
    selector: 'app-store-setup-stores-list',
    templateUrl: './store-setup-stores-list.component.html',
    styleUrls: ['./store-setup-stores-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StoreSetupStoresListComponent implements OnInit {
    stores = [];
    displayedColumns = ['sno', 'id', 'name', 'status', 'actions'];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    constructor(private storeSetupStoresService: StoreSetupStoresService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getStores();
    }

    getStores() {
        this.stores = [];
        this.storeSetupStoresService.getStoreSetupStores({page: this.pagination.page}).subscribe(data => {
            this.stores = data.items;
            if (this.stores && this.stores.length > 0) {
                let i = 1;
                this.stores.forEach(store => {
                    store['sno'] = i;
                    i++;
                });
            }
            this.pagination.page = data.page;
            this.pagination.total = data.total;
        });
    }

    deleteStore(id) {
        this.storeSetupStoresService.deleteStoreSetupStore(id).subscribe(data => {
            if (data) {
                this.getStores();
            }
        });
    }

    editStore(store) {
        this.dialogRef = this._matDialog.open(StoreSetupStoresCreateComponent, {
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
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getStores();
    }
}
