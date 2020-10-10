import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {StoreSetupItemsCreateComponent} from './store-setup-items-create/store-setup-items-create.component';
import {StoreSetupItemsListComponent} from './store-setup-items-list/store-setup-items-list.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-store-setup-items',
    templateUrl: './store-setup-items.component.html',
    styleUrls: ['./store-setup-items.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StoreSetupItemsComponent implements OnInit {
    dialogRef: any;
    @ViewChild(StoreSetupItemsListComponent) getStores: StoreSetupItemsListComponent;

    permissionAddStoreSetupItems = [PermissionConstant.STORE_SETUP_ITEMS_ADD];
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addStore() {
        this.dialogRef = this._matDialog.open(StoreSetupItemsCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getStores.getStores();
        });
    }
}
