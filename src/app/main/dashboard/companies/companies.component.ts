import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {CompaniesCreateComponent} from './companies-create/companies-create.component';
import {CompaniesListComponent} from './companies-list/companies-list.component';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CompaniesComponent implements OnInit {
    dialogRef: any;
    @ViewChild(CompaniesListComponent) getCompaniesList: CompaniesListComponent;

    constructor(private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addCompany() {
        this.dialogRef = this._matDialog.open(CompaniesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getCompaniesList.getCompaniesList();
        });
    }

}
