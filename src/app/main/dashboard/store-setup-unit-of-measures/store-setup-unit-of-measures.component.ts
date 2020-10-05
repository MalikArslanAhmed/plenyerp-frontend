import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {StoreSetupUnitOfMeasuresListComponent} from "./store-setup-unit-of-measures-list/store-setup-unit-of-measures-list.component";
import {StoreSetupUnitOfMeasuresCreateComponent} from "./store-setup-unit-of-measures-create/store-setup-unit-of-measures-create.component";
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-store-setup-unit-of-measures',
    templateUrl: './store-setup-unit-of-measures.component.html',
    styleUrls: ['./store-setup-unit-of-measures.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StoreSetupUnitOfMeasuresComponent implements OnInit {
    dialogRef: any;
    @ViewChild(StoreSetupUnitOfMeasuresListComponent) getStoreSetupUnitOfMeasure: StoreSetupUnitOfMeasuresListComponent;

    permissionAddStoreSetupUnitOfMeasures = [PermissionConstant.STORE_SETUP_UNIT_OF_MEASURES_ADD]
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addStore() {
        this.dialogRef = this._matDialog.open(StoreSetupUnitOfMeasuresCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getStoreSetupUnitOfMeasure.getStoreSetupUnitOfMeasure();
        });
    }
}
