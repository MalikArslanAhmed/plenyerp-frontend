import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fuseAnimations} from "../../../../@fuse/animations";
import { TransactionsItemsSelectComponent } from '../transactions-items-select/transactions-items-select.component';
import { TransactionStoreSelectComponent } from '../transaction-store-select/transaction-store-select.component';
import { MatDialog } from '@angular/material/dialog';
import { ReportService } from 'app/shared/services/report.service';

@Component({
    selector: 'app-report-quantity-balance',
    templateUrl: './report-quantity-balance.component.html',
    styleUrls: ['./report-quantity-balance.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReportQuantityBalanceComponent implements OnInit {
    reportQuantityForm: FormGroup;
    dialogRef:any;
    storeItems = [];
    stores = [];
    itemsArr = [
        // {
        //     itemCode: 'ab123', 
        //     description: 'New Item 1', 
        //     periodBalance: 12, 
        //     stockValue: '1221', 
        //     unitOfMeasure: 'kg'
        // },
        // {
        //     itemCode: 'jk123', 
        //     description: 'New Item 2', 
        //     periodBalance: 5, 
        //     stockValue: '221', 
        //     unitOfMeasure: 'kg'
        // }
    ];

    constructor(private fb: FormBuilder,
        private _matDialog: MatDialog,
        private reportService: ReportService) { }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.reportQuantityForm = this.fb.group({
            openingDate: [''],
            closingDate: [''],
            itemId: [''],
            itemName: [''],
            storeId: [''],
            costingMethod: []
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
            this.reportQuantityForm.patchValue({
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
            this.reportQuantityForm.patchValue({
                storeId: response.id,
            });
        });
    }

    loadReport() {
        const params = {
            'openingDate': this.reportQuantityForm.value['openingDate'] ? this.reportQuantityForm.value['openingDate'].format('YYYY-MM-DD') : '',
            'closingDate': this.reportQuantityForm.value['closingDate'] ? this.reportQuantityForm.value['closingDate'].format('YYYY-MM-DD') : '',
              'itemId': this.reportQuantityForm.value['itemId'],
              'storeId': this.reportQuantityForm.value['storeId'],
              'itemName': this.reportQuantityForm.value['itemName'],
              'costingMethod': this.reportQuantityForm.value['costingMethod']
          };

          this.itemsArr=[];
          this.reportService.getQuantityBalanceReports(params).subscribe(data=>{
              this.itemsArr=data.items;
              console.log(this.itemsArr);
          });
          //console.log(params);
        // this.binCardForm.value['openingDate'] = this.binCardForm.value['openingDate'].format('YYYY-MM-DD');
        // this.binCardForm.value['closingDate'] = this.binCardForm.value['closingDate'].format('YYYY-MM-DD');
    }

}
