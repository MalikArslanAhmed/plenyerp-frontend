import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../@fuse/animations';
import {AlertService} from '../../../shared/services/alert.service';
import {TransactionService} from '../../../shared/services/transaction.service';
import {StoreSetupItemsService} from '../../../shared/services/store-setup-items.service';
import {StoreSetupStoresService} from '../../../shared/services/store-setup-stores.service';
import {MatDialog} from '@angular/material/dialog';
import {TransactionStoreSelectComponent} from '../transaction-store-select/transaction-store-select.component';
import {TransactionsItemsSelectComponent} from '../transactions-items-select/transactions-items-select.component';

@Component({
    selector: 'app-transaction-stv-store-transfer',
    templateUrl: './transaction-stv-store-transfer.component.html',
    styleUrls: ['./transaction-stv-store-transfer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionStvStoreTransferComponent implements OnInit {
    stvStoreTransferForm: FormGroup;
    itemsArr = [];
    companies = [];
    stores = [];
    receivingStores = [];
    storeItems = [];
    unitOfMeasuresData = [];
    isSubmitted = false;
    dialogRef: any;

    constructor(private fb: FormBuilder,
                private alertService: AlertService,
                private transactionService: TransactionService,
                private storeSetupItemsService: StoreSetupItemsService,
                private storeSetupStoresService: StoreSetupStoresService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getStores();
        this.getStoreItems();
    }

    refresh() {
        this.stvStoreTransferForm = this.fb.group({
            'storeId': [''],
            'receiveStoreId': [''],
            'givingStoreName': [{value: '', disabled: true}],
            'receivingStoreName': [{value: '', disabled: true}],
            'detail': [''],
            'sourceDocReferenceNumber': [''],
            'dates': [''],
            'itemId': [''],
            'description': [''],
            'unitOfMeasures': [{value: '', disabled: true}],
            'quantity': [''],
            'accountCode': ['']
        });
    }

    getStores() {
        this.stores = [];
        this.storeSetupStoresService.getStoreSetupStores({page: '-1'}).subscribe(data => {
            this.stores = data.items;
            this.receivingStores = data.items;
        });
    }

    getStoreItems() {
        this.storeSetupItemsService.getStoreSetupItems({}).subscribe(data => {
            this.storeItems = data.items;
        });
    }

    setGivingStoreName(storeId) {
        let selectedStoreName = '';
        if (this.stores && this.stores.length > 0) {
            this.stores.forEach(store => {
                if (parseInt(store.id) === parseInt(storeId)) {
                    selectedStoreName = store.name
                }
            });
        }
        this.stvStoreTransferForm.patchValue({
            'givingStoreName': selectedStoreName
        });
    }

    setReceivingStoreName(storeId) {
        let selectedStoreName = '';
        if (this.stores && this.stores.length > 0) {
            this.stores.forEach(store => {
                if (parseInt(store.id) === parseInt(storeId)) {
                    selectedStoreName = store.name
                }
            });
        }
        this.stvStoreTransferForm.patchValue({
            'receivingStoreName': selectedStoreName
        });
    }

    addItem(itemId, description, unitOfMeasures, quantity, accountCode) {
        let repeatItemFound = false;
        // console.log("meausre0",unitOfMeasures)
        // console.log("meausre",this.stvStoreTransferForm.value.unitOfMeasures)
        // console.log("abx",this.stvStoreTransferForm.value)
        // console.log("abx1",this.unitOfMeasuresData)
    

        //console.log("meausre1",this.unitOfMeasuresData['id'])
        if (this.itemsArr && this.itemsArr.length > 0) {
            this.itemsArr.forEach(item => {
                if (parseInt(item.itemId) === parseInt(itemId)) {
                    repeatItemFound = true;
                }
            });
        }
        if (!repeatItemFound) {
            let unitOfMeasureName = '';
            if (this.unitOfMeasuresData && this.unitOfMeasuresData.length > 0) {
                this.unitOfMeasuresData.forEach(unitOfMeasure => {
                    if (parseInt(unitOfMeasure.id) === parseInt(unitOfMeasures)) {
                        unitOfMeasureName = unitOfMeasure.name
                    }
                });
            }
            this.itemsArr.push({
                'itemId': itemId,
                'description': description,
                'measurementId': unitOfMeasures,
                'unitOfMeasureName': unitOfMeasureName,
                'quantity': quantity,
                'accountCode': accountCode,
            });

            console.log("itemarray",this.itemsArr)
            this.stvStoreTransferForm.patchValue({
                'itemId': '',
                'description': '',
                'measurementId': '',
                'quantity': '',
                'accountCode': ''
            });
        } else {
            this.alertService.showErrors('Item already added');
        }
    }

    deleteItem(index) {
        this.itemsArr.splice(index, 1);
    }

    setItemQuantity(itemId) {
        if (this.storeItems && this.storeItems.length > 0) {
            this.storeItems.forEach(storeItem => {
                if (parseInt(storeItem.id) === parseInt(itemId.value)) {
                    this.unitOfMeasuresData = [{
                        'id': storeItem.inventoryMeasurement.id,
                        'name': storeItem.inventoryMeasurement.name
                    }];
                    this.stvStoreTransferForm.patchValue({
                        'unitOfMeasures': storeItem.inventoryMeasurement.id
                    })
                }
            });
        }
    }

    saveStoreTransfer() {
        this.stvStoreTransferForm.value['items'] = this.itemsArr;
        delete this.stvStoreTransferForm.value['description'];
        delete this.stvStoreTransferForm.value['itemId'];
        delete this.stvStoreTransferForm.value['quantity'];
        delete this.stvStoreTransferForm.value['accountCode'];
        delete this.stvStoreTransferForm.value['unitOfMeasures'];
        this.stvStoreTransferForm.value['date'] = this.stvStoreTransferForm.value['dates'].format('YYYY-MM-DD');
        this.stvStoreTransferForm.value['givingStoreName'] = this.stvStoreTransferForm['controls']['givingStoreName'].value;
        this.stvStoreTransferForm.value['receivingStoreName'] = this.stvStoreTransferForm['controls']['receivingStoreName'].value;
        this.stvStoreTransferForm.value['companyType'] = 'STORE';
        this.stvStoreTransferForm.value['type'] = 'OUT';
        console.log('this.stvStoreTransferForm', this.stvStoreTransferForm.value);

        this.isSubmitted = true;
        if (!this.stvStoreTransferForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.transactionService.saveStoreTransfer(this.stvStoreTransferForm.value).subscribe(data => {
                this.stvStoreTransferForm.reset();
                this.itemsArr = [];
                this.isSubmitted = false;
            });
        }
    }

    givingStoreIdSelect() {
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
            this.stvStoreTransferForm.patchValue({
                storeId: response.id,
            });
        });
    }

    receivingStoreIdSelect() {
        this.dialogRef = this._matDialog.open(TransactionStoreSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.receivingStores = [{
                'name': response.name,
                'id': response.id
            }];
            this.stvStoreTransferForm.patchValue({
                receiveStoreId: response.id,
            });
        });
    }

    selectItemsId() {
        this.dialogRef = this._matDialog.open(TransactionsItemsSelectComponent, {
            panelClass: 'transaction-items-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            console.log('response', response);
            if (!response) {
                return;
            }
            this.storeItems = [{
                'name': response.name,
                'id': response.id
            }];
            this.stvStoreTransferForm.patchValue({
                itemId: response.id,
            });
            this.unitOfMeasuresData = [{
                'name': response['inventoryMeasurement'].name,
                'id': response['inventoryMeasurement'].id
            }];
            this.stvStoreTransferForm.patchValue({
                'unitOfMeasures': this.unitOfMeasuresData[0].id
            });
        });
    }
}
