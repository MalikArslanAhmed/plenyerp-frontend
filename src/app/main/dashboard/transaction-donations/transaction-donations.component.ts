import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../@fuse/animations';
import {AlertService} from '../../../shared/services/alert.service';
import {TransactionService} from '../../../shared/services/transaction.service';
import {StoreSetupItemsService} from '../../../shared/services/store-setup-items.service';
import {StoreSetupStoresService} from '../../../shared/services/store-setup-stores.service';
import {NumberToWordsPipe} from '../../../shared/pipes/number-to-word.pipe';
import {MatDialog} from '@angular/material/dialog';
import {TransactionStoreSelectComponent} from '../transaction-store-select/transaction-store-select.component';
import { TransactionsItemsSelectComponent } from '../transactions-items-select/transactions-items-select.component';
import {TransactionSupplierSelectComponent} from "../transaction-supplier-select/transaction-supplier-select.component";

@Component({
    selector: 'app-transaction-donations',
    templateUrl: './transaction-donations.component.html',
    styleUrls: ['./transaction-donations.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionDonationsComponent implements OnInit {
    donationsForm: FormGroup;
    itemsArr = [];
    companies = [];
    stores = [];
    storeItems = [];
    unitOfMeasuresData = [];
    isSubmitted = false;
    dialogRef: any;

    constructor(private fb: FormBuilder,
                private alertService: AlertService,
                private _matDialog: MatDialog,
                private transactionService: TransactionService,
                private storeSetupItemsService: StoreSetupItemsService,
                private storeSetupStoresService: StoreSetupStoresService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getCompanies();
        this.getStores();
        this.getStoreItems();
    }

    refresh() {
        this.donationsForm = this.fb.group({
            'companyId': [''],
            'storeId': [''],
            'supplierAddress': [{value: '', disabled: true}],
            'storeName': [{value: '', disabled: true}],
            'detail': [''],
            'sourceDocReferenceNumber': [''],
            'dates': [''],
            'itemId': [''],
            'description': [''],
            'unitOfMeasures': [{value: '', disabled: true}],
            'quantity': [''],
            'unitCost': [''],
            'quantitySysLessPhy': [''],
            'unitCostOfDiff': [''],
            'totalValuesInWords': [{value: '', disabled: true}],
            'subTotal': [{value: '', disabled: true}],
            'total': [{value: '', disabled: true}]
        });
    }

    addItem(itemId, description, unitOfMeasures, quantity, unitCost) {
        let repeatItemFound = false;
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
                        unitOfMeasureName = unitOfMeasure.name;
                    }
                });
            }
            this.itemsArr.push({
                'itemId': itemId,
                'description': description,
                'measurementId': unitOfMeasures,
                'unitOfMeasureName': unitOfMeasureName,
                'quantity': quantity,
                'unitCost': unitCost,
                'value': parseInt(quantity) * parseInt(unitCost)
            });
            this.donationsForm.patchValue({
                'itemId': '',
                'description': '',
                'unitOfMeasures': '',
                'quantity': '',
                'unitCost': ''
            });
            this.setTotals();
        } else {
            this.alertService.showErrors('Item already added');
        }
    }

    getStores() {
        this.stores = [];
        this.storeSetupStoresService.getStoreSetupStores({page: '-1'}).subscribe(data => {
            this.stores = data.items;
        });
    }

    getStoreItems() {
        this.storeSetupItemsService.getStoreSetupItems({}).subscribe(data => {
            this.storeItems = data.items;
        });
    }

    deleteItem(index) {
        this.itemsArr.splice(index, 1);
        this.setTotals();
    }

    getCompanies() {
        this.transactionService.getCompanies({page: -1}).subscribe(data => {
            this.companies = data.items;
        });
    }

    setSupplierAddress(compId) {
        let selectedSupplierAddress = '';
        if (this.companies && this.companies.length > 0) {
            this.companies.forEach(company => {
                if (parseInt(company.id) === parseInt(compId)) {
                    selectedSupplierAddress = company.name;
                }
            });
        }
        this.donationsForm.patchValue({
            supplierAddress: selectedSupplierAddress
        });
    }

    setStoreName(storeId) {
        let selectedStoreName = '';
        if (this.stores && this.stores.length > 0) {
            this.stores.forEach(store => {
                if (parseInt(store.id) === parseInt(storeId)) {
                    selectedStoreName = store.name;
                }
            });
        }
        this.donationsForm.patchValue({
            'storeName': selectedStoreName
        });
    }

    setTotals() {
        const numberToWords = new NumberToWordsPipe();
        if (this.itemsArr && this.itemsArr.length > 0) {
            let subTotal = 0;
            this.itemsArr.forEach(item => {
                subTotal = subTotal + (parseInt(item.unitCost) * parseInt(item.quantity));
            });
            this.donationsForm.patchValue({
                'subTotal': subTotal,
                'total': subTotal,
                'totalValuesInWords': numberToWords.transform(subTotal)
            });
        } else {
            this.donationsForm.patchValue({
                'subTotal': 0,
                'total': 0,
                'totalValuesInWords': '-'
            });
        }
    }

    setItemQuantity(itemId) {
        if (this.storeItems && this.storeItems.length > 0) {
            this.storeItems.forEach(storeItem => {
                if (parseInt(storeItem.id) === parseInt(itemId.value)) {
                    this.unitOfMeasuresData = [{
                        'id': storeItem.inventoryMeasurement.id,
                        'name': storeItem.inventoryMeasurement.name
                    }];
                    this.donationsForm.patchValue({
                        'unitOfMeasures': storeItem.inventoryMeasurement.id
                    })
                }
            });
        }
    }

    saveDonation() {
        this.donationsForm.value['items'] = this.itemsArr;
        delete this.donationsForm.value['description'];
        delete this.donationsForm.value['itemId'];
        delete this.donationsForm.value['quantity'];
        delete this.donationsForm.value['unitCost'];
        delete this.donationsForm.value['unitOfMeasures'];
        delete this.donationsForm.value['unitCostOfDiff'];
        delete this.donationsForm.value['value'];
        this.donationsForm.value['date'] = this.donationsForm.value['dates'].format('YYYY-MM-DD');
        this.donationsForm.value['storeName'] = this.donationsForm['controls']['storeName'].value;
        this.donationsForm.value['totalValuesInWords'] = this.donationsForm['controls']['totalValuesInWords'].value;
        this.donationsForm.value['subTotal'] = this.donationsForm['controls']['subTotal'].value;
        this.donationsForm.value['total'] = this.donationsForm['controls']['total'].value;
        this.donationsForm.value['supplierAddress'] = this.donationsForm['controls']['supplierAddress'].value;
        this.donationsForm.value['companyType'] = 'SUPPLIER';
        this.donationsForm.value['type'] = 'IN';
        console.log('this.donationsForm', this.donationsForm.value);

        this.isSubmitted = true;
        if (!this.donationsForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.transactionService.saveDonation(this.donationsForm.value).subscribe(data => {
                this.donationsForm.reset();
                this.itemsArr = [];
                this.isSubmitted = false;
            });
        }
    }

    selectItemsId() {
        this.dialogRef = this._matDialog.open(TransactionsItemsSelectComponent, {
            panelClass: 'transaction-items-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.storeItems = [{
                'name': response.name,
                'id': response.id
            }];
            this.donationsForm.patchValue({
                itemId: response.id,
            });
            this.unitOfMeasuresData = [{
                'name': response['inventoryMeasurement'].name,
                'id': response['inventoryMeasurement'].id
            }];
            this.donationsForm.patchValue({
                'unitOfMeasures': this.unitOfMeasuresData[0].id
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
            this.donationsForm.patchValue({
                storeId: response.id,
                storeName:response.name
            });
        });
    }

    supplierIdSelect() {
        this.dialogRef = this._matDialog.open(TransactionSupplierSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.companies = [{
                'name': response.name,
                'id': response.id
            }];
            this.donationsForm.patchValue({
                companyId: response.id,
                supplierAddress:response.address
            });
        });
    }

    resetForm() {
        this.donationsForm.reset();
        this.itemsArr = [];
    }
}
