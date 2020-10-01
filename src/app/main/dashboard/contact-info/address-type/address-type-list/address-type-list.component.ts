import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {AddressTypeCreateComponent} from '../address-type-create/address-type-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-address-type-list',
    templateUrl: './address-type-list.component.html',
    styleUrls: ['./address-type-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AddressTypeListComponent implements OnInit {
    addressTypeList = [];
    displayedAddressTypeColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    @Output() selectedIndexChange: EventEmitter<number>;

    permissionEditAddressType = [PermissionConstant.ADDRESS_EDIT];
    permissionDeleteAddressType = [PermissionConstant.ADDRESS_DELETE];

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getAddressTypeList();
    }

    getAddressTypeList() {
        this.addressTypeList = [];
        this.contactInfoService.getAddressTypeList({page: this.pagination.page}).subscribe(data => {
            this.addressTypeList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.addressTypeList && this.addressTypeList.length > 0) {
                let i = 1;
                this.addressTypeList.forEach(val => {
                    val['sno'] = i;
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
                this.deleteAddressType(items.id);
            }
        });

    } 
    deleteAddressType(id) {
        this.contactInfoService.deleteAddressType(id).subscribe(data => {
            if (data) {
                this.getAddressTypeList();
            }
        });
    }

    editAddressType(addressType) {
        this.dialogRef = this._matDialog.open(AddressTypeCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', addressType: addressType},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getAddressTypeList();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getAddressTypeList();
    }
}

