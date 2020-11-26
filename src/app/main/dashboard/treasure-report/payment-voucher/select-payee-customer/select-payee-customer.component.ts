import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {CompaniesService} from "../../../../../shared/services/companies.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-select-payee-customer',
    templateUrl: './select-payee-customer.component.html',
    styleUrls: ['./select-payee-customer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SelectPayeeCustomerComponent implements OnInit {
    companiesList = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    displayedColumns: string[] = ['sno', 'companyId', 'companyName', 'actions'];
    searchCustomerForm: FormGroup;

    constructor(private companiesService: CompaniesService,
                private _matDialog: MatDialog,
                public matDialogRef: MatDialogRef<SelectPayeeCustomerComponent>,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getCompaniesList({isCustomer: true});
    }

    refresh() {
        this.searchCustomerForm = this.fb.group({
            search: [''],
        });
    }

    search() {
        this.getCompaniesList({search: this.searchCustomerForm.value});
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

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getCompaniesList();
    }
}
