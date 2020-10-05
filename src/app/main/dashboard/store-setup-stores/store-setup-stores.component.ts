import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {StoreSetupStoresListComponent} from "./store-setup-stores-list/store-setup-stores-list.component";
import {StoreSetupStoresCreateComponent} from "./store-setup-stores-create/store-setup-stores-create.component";
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-store-setup-stores',
    templateUrl: './store-setup-stores.component.html',
    styleUrls: ['./store-setup-stores.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StoreSetupStoresComponent implements OnInit {
    dialogRef: any;
    @ViewChild(StoreSetupStoresListComponent) getStores: StoreSetupStoresListComponent;

    permissionAddStoreSetupStore = [PermissionConstant.STORE_SETUP_STORES_ADD];
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addStore() {
        this.dialogRef = this._matDialog.open(StoreSetupStoresCreateComponent, {
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
