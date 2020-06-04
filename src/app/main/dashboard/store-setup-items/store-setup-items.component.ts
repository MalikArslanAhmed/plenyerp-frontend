import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {StoreSetupStoresListComponent} from "../store-setup-stores/store-setup-stores-list/store-setup-stores-list.component";
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {StoreSetupStoresCreateComponent} from "../store-setup-stores/store-setup-stores-create/store-setup-stores-create.component";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-store-setup-items',
    templateUrl: './store-setup-items.component.html',
    styleUrls: ['./store-setup-items.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StoreSetupItemsComponent implements OnInit {
    dialogRef: any;
    @ViewChild(StoreSetupStoresListComponent) getStores: StoreSetupStoresListComponent;

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
