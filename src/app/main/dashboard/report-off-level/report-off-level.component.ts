import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TransactionsItemsSelectComponent} from '../transactions-items-select/transactions-items-select.component';
import {TransactionStoreSelectComponent} from '../transaction-store-select/transaction-store-select.component';
import {MatDialog} from '@angular/material/dialog';
import {ReportService} from 'app/shared/services/report.service';

@Component({
    selector: 'app-report-off-level',
    templateUrl: './report-off-level.component.html',
    styleUrls: ['./report-off-level.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReportOffLevelComponent implements OnInit {
    reportOffLevelForm: FormGroup;
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
        this.reportOffLevelForm = this.fb.group({
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
            this.reportOffLevelForm.patchValue({
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
                'name': response.name,
                'id': response.id
            }];
            this.reportOffLevelForm.patchValue({
                storeId: response.id,
            });
        });
    }

    loadReport() {
        const params = {
            'openingDate': this.reportOffLevelForm.value['openingDate'] ? this.reportOffLevelForm.value['openingDate'].format('YYYY-MM-DD') : '',
            'closingDate': this.reportOffLevelForm.value['closingDate'] ? this.reportOffLevelForm.value['closingDate'].format('YYYY-MM-DD') : '',
            'itemId': this.reportOffLevelForm.value['itemId'],
            'storeId': this.reportOffLevelForm.value['storeId'],
            'itemName': this.reportOffLevelForm.value['itemName'],
            'costingMethod': this.reportOffLevelForm.value['costingMethod']
        };

        this.itemsArr = [];
        this.reportService.getOffLevelReports(params).subscribe(data => {
            this.itemsArr = data.items;
        });
    }
}
