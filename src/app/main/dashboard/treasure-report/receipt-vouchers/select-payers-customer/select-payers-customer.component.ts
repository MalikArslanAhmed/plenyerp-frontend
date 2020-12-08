import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CompaniesService} from "../../../../../shared/services/companies.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../../@fuse/animations";

@Component({
    selector: 'app-select-payers-customer',
    templateUrl: './select-payers-customer.component.html',
    styleUrls: ['./select-payers-customer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SelectPayersCustomerComponent implements OnInit {
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
                public matDialogRef: MatDialogRef<SelectPayersCustomerComponent>,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getCompaniesList({isCustomer: 1});
    }

    refresh() {
        this.searchCustomerForm = this.fb.group({
            search: [''],
        });
    }

    search() {
        this.getCompaniesList({companyId: this.searchCustomerForm.value.search});
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
