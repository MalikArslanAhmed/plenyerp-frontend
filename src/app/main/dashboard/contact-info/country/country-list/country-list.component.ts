import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {CountryCreateComponent} from '../country-create/country-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import {PageEvent} from '@angular/material/paginator';
import {DeleteListModalComponent} from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import {PermissionConstant} from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-country-list',
    templateUrl: './country-list.component.html',
    styleUrls: ['./country-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CountryListComponent implements OnInit {
    countryList = [];
    displayedCountryColumns = ['id', 'name', 'status', 'actions'];
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

    permissionEditCountry = [PermissionConstant.COUNTRIES_EDIT];
    permissionDeleteCountry = [PermissionConstant.COUNTRIES_DELETE];

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getCountryList();
    }

    getCountryList() {
        this.countryList = [];
        this.contactInfoService.getCountryList({page: this.pagination.page}).subscribe(data => {
            this.countryList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.countryList && this.countryList.length > 0) {
                let i = 1;
                this.countryList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }


    deleteItemModel(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteCountry(items.id);
            }
        });

    }

    deleteCountry(id) {
        this.contactInfoService.deleteCountry(id).subscribe(data => {
            if (data) {
                this.getCountryList();
            }
        });
    }

    editCountry(country) {
        this.dialogRef = this._matDialog.open(CountryCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', country: country},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getCountryList();
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getCountryList();
    }
}
