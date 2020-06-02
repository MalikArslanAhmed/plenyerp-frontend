import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {AddressTypeCreateComponent} from '../address-type-create/address-type-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

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
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getAddressTypeList();
    }

    getAddressTypeList() {
        this.contactInfoService.getAddressTypeList({'page': -1}).subscribe(data => {
            this.addressTypeList = data.items;

            if (this.addressTypeList && this.addressTypeList.length > 0) {
                let i = 1;
                this.addressTypeList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
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

}

