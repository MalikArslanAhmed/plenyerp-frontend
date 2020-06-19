import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { TransactionsItemsSelectComponent } from '../transactions-items-select/transactions-items-select.component';
import { TransactionStoreSelectComponent } from '../transaction-store-select/transaction-store-select.component';
import { ReportService } from 'app/shared/services/report.service';

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
    itemsArr = [
        // {
        //     description: 'lorem ipsum',
        //     quantityIn: 1221,
        //     unitPriceIn: 100,
        //     valueIn: 1000,
        //     quantityOut: 1221,
        //     unitPriceOut: 100,
        //     valueOut: 1000,
        //     quantityBalance: 1221,
        //     unitPriceBalance: 100,
        //     valueBalance: 1000,
        // },
        // {
        //     description: 'lorem ipsum',
        //     quantityIn: 1221,
        //     unitPriceIn: 100,
        //     valueIn: 1000,
        //     quantityOut: 1221,
        //     unitPriceOut: 100,
        //     valueOut: 1000,
        //     quantityBalance: 1221,
        //     unitPriceBalance: 100,
        //     valueBalance: 1000,
        // },
    ];

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
                'description': response.description,
                'id': response.id
            }];
            this.reportInventoryLedgerForm.patchValue({
                itemId: response.id,
                itemName: response.description
            });

            //console.log(this.storeItems)
            // this.binCardForm.patchValue({
            //     itemName: response.description,
            // });
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
                'name': response.name,
                'id': response.id
            }];
            this.reportInventoryLedgerForm.patchValue({
                storeId: response.id,
            });
        });
    }

    loadReport() {
        const params = {
              'openingDate': this.reportInventoryLedgerForm.value['openingDate'] ? this.reportInventoryLedgerForm.value['openingDate'].format('YYYY-MM-DD'):'',
              'closingDate': this.reportInventoryLedgerForm.value['closingDate'] ? this.reportInventoryLedgerForm.value['closingDate'].format('YYYY-MM-DD'):'',
              'itemId': this.reportInventoryLedgerForm.value['itemId'],
              'storeId': this.reportInventoryLedgerForm.value['storeId'],
              'itemName': this.reportInventoryLedgerForm.value['itemName'],
              'costingMethod': this.reportInventoryLedgerForm.value['costingMethod']
          };
          this.itemsArr = [];
          this.reportService.getInventoryLedgerReports(params).subscribe(data => {
            // console.log('data', data.items);
            this.itemsArr = data.items;
            console.log('this.itemsArr', this.itemsArr);
        });
          //console.log(params);
        // this.binCardForm.value['openingDate'] = this.binCardForm.value['openingDate'].format('YYYY-MM-DD');
        // this.binCardForm.value['closingDate'] = this.binCardForm.value['closingDate'].format('YYYY-MM-DD');
    } 
}
