import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CompaniesService} from "../../../../../shared/services/companies.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {BudgetControlService} from "../../../../../shared/services/budget-control.service";

@Component({
    selector: 'app-select-aie',
    templateUrl: './select-aie.component.html',
    styleUrls: ['./select-aie.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SelectAieComponent implements OnInit {
    aies = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    displayedColumns: string[] = ['sno', 'aieNumber', 'narration', 'actions'];
    searchCustomerForm: FormGroup;

    constructor(private companiesService: CompaniesService,
                private _matDialog: MatDialog,
                public matDialogRef: MatDialogRef<SelectAieComponent>,
                private fb: FormBuilder,
                private budgetService: BudgetControlService) {
    }

    ngOnInit(): void {
        this.refresh();
        // this.getCompaniesList({isCustomer: true});
        this.getAie({});
    }

    refresh() {
        this.searchCustomerForm = this.fb.group({
            search: [''],
        });
    }

    search() {
        this.getAie({aieNumber: this.searchCustomerForm.value.search});
    }

    getAie(params = {}) {
        this.budgetService.budgetControlAieList(params).subscribe(data => {
            this.aies = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.aies && this.aies.length > 0) {
                let i = 1;
                this.aies.forEach(aie => {
                    aie['sno'] = i;
                    i++;
                });
            }
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getAie();
    }
}
