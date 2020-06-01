import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {CountryCreateComponent} from '../country-create/country-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

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
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getCountryList();
    }

    getCountryList() {
        this.contactInfoService.getCountryList({'page': -1}).subscribe(data => {
            this.countryList = data.items;

            if (this.countryList && this.countryList.length > 0) {
                let i = 1;
                this.countryList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
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

}
