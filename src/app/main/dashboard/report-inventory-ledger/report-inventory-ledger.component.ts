import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {TransactionsItemsSelectComponent} from '../transactions-items-select/transactions-items-select.component';
import {TransactionStoreSelectComponent} from '../transaction-store-select/transaction-store-select.component';
import {ReportService} from 'app/shared/services/report.service';

@Component({
    selector: 'app-report-inventory-ledger',
    templateUrl: './report-inventory-ledger.component.html',
    styleUrls: ['./report-inventory-ledger.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReportInventoryLedgerComponent implements OnInit {
    reportInventoryLedgerForm: FormGroup;
    dialogRef: any;
    storeItems = [];
    stores = [];
    itemsArr = [];

    constructor(private fb: FormBuilder,
                private _matDialog: MatDialog,
                private reportService: ReportService) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.reportInventoryLedgerForm = this.fb.group({
            openingDate: [''],
            closingDate: [''],
            itemId: [''],
            itemName: [''],
            storeId: [''],
            costingMethod: ['']
        });
    }

    selectItemId() {
        this.dialogRef = this._matDialog.open(TransactionsItemsSelectComponent, {
            panelClass: 'transaction-items-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.storeItems = [{
                description: response.description,
                id: response.id
            }];
            this.reportInventoryLedgerForm.patchValue({
                itemId: response.id,
                itemName: response.description
            });
        });
    }

    storeIdSelect() {
        this.dialogRef = this._matDialog.open(TransactionStoreSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.stores = [{
                name: response.name,
                id: response.id
            }];
            this.reportInventoryLedgerForm.patchValue({
                storeId: response.id,
            });
        });
    }

    loadReport(): void {
        const params = {
            openingDate: this.reportInventoryLedgerForm.value['openingDate'] ? this.reportInventoryLedgerForm.value['openingDate'].format('YYYY-MM-DD') : '',
            closingDate: this.reportInventoryLedgerForm.value['closingDate'] ? this.reportInventoryLedgerForm.value['closingDate'].format('YYYY-MM-DD') : '',
            itemId: this.reportInventoryLedgerForm.value['itemId'],
            storeId: this.reportInventoryLedgerForm.value['storeId'],
            itemName: this.reportInventoryLedgerForm.value['itemName'],
            costingMethod: this.reportInventoryLedgerForm.value['costingMethod']
        };
        this.itemsArr = [];
        this.reportService.getInventoryLedgerReports(params).subscribe(data => {
            this.itemsArr = data.items;
        });
    }

    downloadReport(): void {
        this.reportService.downloadTransactionReport({type: 'INVENTORY_LEDGER'}).subscribe(data => {
            window.open(data.url, '_blank');
        });
    }
}
