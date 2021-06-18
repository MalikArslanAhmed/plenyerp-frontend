import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CompaniesCreateComponent} from './companies-create/companies-create.component';
import {CompaniesListComponent} from './companies-list/companies-list.component';
import {PermissionConstant} from '../../../shared/constants/permission-constant';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CompaniesComponent implements OnInit {
    dialogRef: any;
    createCompanyPermission = [PermissionConstant.COMPANIES_CREATE];
    @ViewChild(CompaniesListComponent) getCompaniesList: CompaniesListComponent;
    companyFiltersForm: FormGroup;
    constructor(private _fuseSidebarService: FuseSidebarService,
                private fb: FormBuilder,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.companyFiltersForm = this.fb.group({
            search: ['']
        });
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
    search() {
        console.log('--->>', this.companyFiltersForm.value.search);
        this.getCompaniesList.getCompaniesList({search: this.companyFiltersForm.value.search});
    }

}
