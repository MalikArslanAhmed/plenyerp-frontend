import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../@fuse/animations';
import {TransactionsItemsSelectComponent} from '../transactions-items-select/transactions-items-select.component';
import {MatDialog} from '@angular/material/dialog';
import {TransactionStoreSelectComponent} from '../transaction-store-select/transaction-store-select.component';
import {ReportService} from '../../../shared/services/report.service';

@Component({
    selector: 'app-report-bin-card',
    templateUrl: './report-bin-card.component.html',
    styleUrls: ['./report-bin-card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReportBinCardComponent implements OnInit {
    binCardForm: FormGroup;
    dialogRef: any;
    storeItems = [];
    stores = [];
    itemsArr = [];
    inQuantity = 0;
    outQuantity = 0;

    constructor(private fb: FormBuilder,
                private _matDialog: MatDialog,
                private reportService: ReportService) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.binCardForm = this.fb.group({
            openingDate: [''],
            closingDate: [''],
            itemId: [''],
            storeId: [''],
            itemName: ['']
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
                'description': response.description,
                'id': response.id
            }];
            this.binCardForm.patchValue({
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
            this.binCardForm.patchValue({
                storeId: response.id,
            });
        });
    }

    loadReport(): void {
        const params = {
            openingDate: this.binCardForm.value['openingDate'] ? this.binCardForm.value['openingDate'].format('YYYY-MM-DD') : '',
            closingDate: this.binCardForm.value['closingDate'] ? this.binCardForm.value['closingDate'].format('YYYY-MM-DD') : '',
            itemId: this.binCardForm.value['itemId'],
            storeId: this.binCardForm.value['storeId'],
            itemName: this.binCardForm.value['itemName']
        };
        this.itemsArr = [];
        this.reportService.getBinReports(params).subscribe(data => {
            // console.log('data', data);
            this.itemsArr = data;
            let inQuant = this.inQuantity;
            let outQuant = this.outQuantity;
            if (this.itemsArr && this.itemsArr.length > 0) {
                this.itemsArr.forEach(item => {
                    if (item.type === "IN") {
                        inQuant++;
                    } else {
                        outQuant++;
                    }
                });
                this.inQuantity = inQuant;
                this.outQuantity = outQuant;
            }
        });
    }

    downloadReport() {
        this.reportService.downloadTransactionReport({'type': 'BIN_CARD'}).subscribe(data => {
            window.open(data.url, '_blank');
        });
    }
}
