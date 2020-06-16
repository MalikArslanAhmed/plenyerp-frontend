import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {TransactionService} from "../../../shared/services/transaction.service";
import {MatDialogRef} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-transaction-store-select',
    templateUrl: './transaction-store-select.component.html',
    styleUrls: ['./transaction-store-select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionStoreSelectComponent implements OnInit {
    stores = [];
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
                public matDialogRef: MatDialogRef<TransactionStoreSelectComponent>) {
    }

    ngOnInit(): void {
        this.getCompanies();
    }

    getCompanies(params = {}) {
        this.transactionService.getCompanies(params).subscribe(data => {
            this.stores = data.items;
            console.log(this.stores);
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.stores && this.stores.length > 0) {
                let i = 1;
                this.stores.forEach(store => {
                    store['sno'] = i;
                    i++;
                });
            }
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getCompanies();
    }
}
