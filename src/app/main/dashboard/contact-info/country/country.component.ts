import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {CountryCreateComponent} from './country-create/country-create.component';
import {CountryListComponent} from './country-list/country-list.component';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'app-salary-scales',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CountryComponent implements OnInit {
    dialogRef: any;
    @ViewChild(CountryListComponent) getCountryList: CountryListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addCountry() {
        this.dialogRef = this._matDialog.open(CountryCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getCountryList.getCountryList();
        });
    }
}
