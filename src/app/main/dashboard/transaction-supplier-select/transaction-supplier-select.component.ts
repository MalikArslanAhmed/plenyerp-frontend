import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TransactionService} from "../../../shared/services/transaction.service";
import {fuseAnimations} from "../../../../@fuse/animations";
import {MatDialogRef} from "@angular/material/dialog";
import {PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-transaction-supplier-select',
    templateUrl: './transaction-supplier-select.component.html',
    styleUrls: ['./transaction-supplier-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionSupplierSelectComponent implements OnInit {
    companies = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    dialogRef: any;
    displayedColumns: string[] = ['sno', 'id', 'name', 'actions'];

    constructor(private transactionService: TransactionService,
                public matDialogRef: MatDialogRef<TransactionSupplierSelectComponent>) {
    }

    ngOnInit(): void {
        this.getStores();
    }

    getStores(params = {}) {
        this.transactionService.getCompanies(params).subscribe(data => {
            this.companies = data.items;
            console.log(this.companies);
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.companies && this.companies.length > 0) {
                let i = 1;
                this.companies.forEach(company => {
                    company['sno'] = i;
                    i++;
                });
            }
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getStores();
    }
}
