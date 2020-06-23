import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {TransactionService} from '../../../shared/services/transaction.service';
import {MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';

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
    itemsFilterForm: FormGroup;

    constructor(private transactionService: TransactionService,
                private fb: FormBuilder,
                public matDialogRef: MatDialogRef<TransactionStoreSelectComponent>) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getStores();
    }

    refresh() {
        this.itemsFilterForm = this.fb.group({
            search: [''],
        });
    }

    getStores(params = {}) {
        params['isActive'] = 1;
        this.transactionService.getStores(params).subscribe(data => {
            this.stores = data.items;
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
        this.getStores();
    }
}
