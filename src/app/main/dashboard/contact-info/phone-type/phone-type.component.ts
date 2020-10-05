import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {PhoneTypeCreateComponent} from './phone-type-create/phone-type-create.component';
import {PhoneTypeListComponent} from './phone-type-list/phone-type-list.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-phone-type',
    templateUrl: './phone-type.component.html',
    styleUrls: ['./phone-type.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PhoneTypeComponent implements OnInit {
    dialogRef: any;
    @ViewChild(PhoneTypeListComponent) getPhoneTypeList: PhoneTypeListComponent;

    permissionAddPhoneType = [PermissionConstant.TYPES_OF_PHONE_NUM_ADD]
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addPhoneType() {
        this.dialogRef = this._matDialog.open(PhoneTypeCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getPhoneTypeList.getPhoneTypeList();
        });
    }
}
