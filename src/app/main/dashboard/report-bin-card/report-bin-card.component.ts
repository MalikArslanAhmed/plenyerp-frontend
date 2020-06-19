import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fuseAnimations} from "../../../../@fuse/animations";
import {TransactionsItemsSelectComponent} from "../transactions-items-select/transactions-items-select.component";
import {MatDialog} from "@angular/material/dialog";
import {TransactionStoreSelectComponent} from "../transaction-store-select/transaction-store-select.component";
import {ReportService} from "../../../shared/services/report.service";

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
    itemsArr = [
        /*{date: '12-06-2020', description: 'New Item 1', in: 12, unitCost: '1221', out: 6, balance: 6},
        {date: '13-06-2020', description: 'New Item 2', in: 12, unitCost: '2221', out: 8, balance: 4}*/
    ];

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
            itemName: [''],
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
            this.binCardForm.patchValue({
                itemId: response.id,
                itemName: response.description
            });

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
            this.binCardForm.patchValue({
                storeId: response.id,
            });
        });
    }

    loadReport() {
        const params = {
              'openingDate': this.binCardForm.value['openingDate'].format('YYYY-MM-DD'),
              'closingDate': this.binCardForm.value['closingDate'].format('YYYY-MM-DD'),
              'itemId': this.binCardForm.value['itemId'],
              'storeId': this.binCardForm.value['storeId'],
              'itemName': this.binCardForm.value['itemName'],
              'costingMethod': this.binCardForm.value['costingMethod']
          };
          //console.log(params);
        // this.binCardForm.value['openingDate'] = this.binCardForm.value['openingDate'].format('YYYY-MM-DD');
        // this.binCardForm.value['closingDate'] = this.binCardForm.value['closingDate'].format('YYYY-MM-DD');
        console.log('binCardForm', this.binCardForm.value);
        this.itemsArr = [];
        this.reportService.getBinReports(params).subscribe(data => {
            console.log('data', data.items);
            /*this.itemsArr = data.items;
            console.log('this.itemsArr', this.itemsArr);*/
        });
    }
}
