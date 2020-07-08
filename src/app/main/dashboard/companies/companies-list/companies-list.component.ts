import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {CompaniesService} from '../../../../shared/services/companies.service';
import {CompaniesCreateComponent} from '../companies-create/companies-create.component';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {DeleteListModalComponent} from '../../delete-list-modal/delete-list-modal.component';
import {FormGroup} from '@angular/forms';
import {CompanyBankDetailsComponent} from '../company-bank-details/company-bank-details.component';

@Component({
    selector: 'app-companies-list',
    templateUrl: './companies-list.component.html',
    styleUrls: ['./companies-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CompaniesListComponent implements OnInit {
    displayedColumns: string[] = ['sno', 'companyId', 'companyName', 'companyAddress', 'actions'];
    companiesList = [];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;

    constructor(private companiesService: CompaniesService,
                private _matDialog: MatDialog) {
    }


    ngOnInit(): void {
        this.getCompaniesList();
    }

    getCompaniesList(params = {}): void {
        this.companiesList = [];
        this.companiesService.getCompaniesList(params).subscribe(data => {
            this.companiesList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.companiesList && this.companiesList.length > 0) {
                let i = 1;
                this.companiesList.forEach(company => {
                    company['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteItemModal(items): void {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteCompany(items.id);
            }
        });
    }

    deleteCompany(id): void {
        this.companiesService.deleteCompany(id).subscribe(data => {
            if (data) {
                this.getCompaniesList();
            }
        });
    }

    editCompany(company): void {
        this.dialogRef = this._matDialog.open(CompaniesCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', company: company},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getCompaniesList();
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getCompaniesList();
    }

    addBankAccount(companyData) {
        this.dialogRef = this._matDialog.open(CompanyBankDetailsComponent, {
            panelClass: 'bank-details-dialog',
            data: {action: 'CREATE', selectedCompany: companyData}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
        });
    }
}
