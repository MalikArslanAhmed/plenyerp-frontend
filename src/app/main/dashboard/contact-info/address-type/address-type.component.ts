import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {AddressTypeCreateComponent} from './address-type-create/address-type-create.component';
import {AddressTypeListComponent} from './address-type-list/address-type-list.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
  selector: 'app-address-type',
  templateUrl: './address-type.component.html',
  styleUrls: ['./address-type.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AddressTypeComponent implements OnInit {
    dialogRef: any;
    @ViewChild(AddressTypeListComponent) getAddressTypeList: AddressTypeListComponent;

    permissionAddAddressType = [PermissionConstant.ADDRESS_ADD]
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addAddressType() {
        this.dialogRef = this._matDialog.open(AddressTypeCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getAddressTypeList.getAddressTypeList();
        });
    }
}
