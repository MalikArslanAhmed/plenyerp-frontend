import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {StoreSetupItemsCreateComponent} from '../store-setup-items-create/store-setup-items-create.component';
import {StoreSetupItemsService} from "../../../../shared/services/store-setup-items.service";

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

    constructor(private storeSetupItemsService: StoreSetupItemsService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getStores();
    }

    getStores() {
        this.storeSetupItemsService.getStoreSetupItems({'page': -1}).subscribe(data => {
            this.items = data.items;
            if (this.items && this.items.length > 0) {
                let i = 1;
                this.items.forEach(store => {
                    store['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteStore(id) {
        this.storeSetupItemsService.deleteStoreSetupItems(id).subscribe(data => {
            if (data) {
                this.getStores();
            }
        })
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
}
