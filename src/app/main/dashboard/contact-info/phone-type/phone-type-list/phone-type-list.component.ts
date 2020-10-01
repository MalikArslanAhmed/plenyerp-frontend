import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {PhoneTypeCreateComponent} from '../phone-type-create/phone-type-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-phone-type-list',
    templateUrl: './phone-type-list.component.html',
    styleUrls: ['./phone-type-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PhoneTypeListComponent implements OnInit {
    phoneTypeList = [];
    displayedPhoneTypeColumns = ['id', 'name', 'status', 'actions'];
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

    permissionEditPhoneType = [PermissionConstant.TYPES_OF_PHONE_NUM_EDIT];
    permissionDeletePhoneType = [PermissionConstant.TYPES_OF_PHONE_NUM_DELETE];

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getPhoneTypeList();
    }

    getPhoneTypeList() {
        this.phoneTypeList = []
        this.contactInfoService.getPhoneTypeList({page: this.pagination.page}).subscribe(data => {
            this.phoneTypeList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.phoneTypeList && this.phoneTypeList.length > 0) {
                let i = 1;
                this.phoneTypeList.forEach(val => {
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
                this.deletePhoneType(items.id);
            }
        });

    } 

    deletePhoneType(id) {
        this.contactInfoService.deletePhoneType(id).subscribe(data => {
            if (data) {
                this.getPhoneTypeList();
            }
        });
    }

    editPhoneType(phoneType) {
        this.dialogRef = this._matDialog.open(PhoneTypeCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', phoneType: phoneType},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getPhoneTypeList();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getPhoneTypeList();
    }
}


