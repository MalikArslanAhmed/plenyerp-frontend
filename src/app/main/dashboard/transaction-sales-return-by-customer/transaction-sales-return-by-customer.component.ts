import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {AlertService} from "../../../shared/services/alert.service";
import {TransactionService} from "../../../shared/services/transaction.service";
import {StoreSetupStoresService} from "../../../shared/services/store-setup-stores.service";
import {StoreSetupItemsService} from "../../../shared/services/store-setup-items.service";
import {NumberToWordsPipe} from "../../../shared/pipes/number-to-word.pipe";
import {TransactionsItemsComponent} from '../transactions-items/transactions-items.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-transaction-sales-return-by-customer',
    templateUrl: './transaction-sales-return-by-customer.component.html',
    styleUrls: ['./transaction-sales-return-by-customer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionSalesReturnByCustomerComponent implements OnInit {
    salesReturnByCustomerForm: FormGroup;
    itemsArr = [];
    companies = [];
    stores = [];
    storeItems = [];
    unitOfMeasuresData = [];
    editableIndex: any;
    isSubmitted = false;
    dialogRef: any;

    constructor(private fb: FormBuilder,
                private alertService: AlertService,
                private transactionService: TransactionService,
                private storeSetupItemsService: StoreSetupItemsService,
                private _matDialog: MatDialog,
                private storeSetupStoresService: StoreSetupStoresService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getCompanies();
        this.getStores();
        this.getStoreItems();
    }

    refresh() {
        this.salesReturnByCustomerForm = this.fb.group({
            'companyId': [''],
            'storeId': [''],
            'cutomerAddress': [{value: '', disabled: true}],
            'storeName': [{value: '', disabled: true}],
            'detail': [''],
            'poNumber': [''],
            'sourceDocReferenceNumber': [''],
            'dates': [''],
            'itemId': [''],
            'description': [''],
            'unitOfMeasures': [{value: '', disabled: true}],
            'quantity': [''],
            'unitPrice': [''],
            'unitCost': [''],
            'totalValuesInWords': [{value: '', disabled: true}],
            'subTotal': [{value: '', disabled: true}],
            'total': [{value: '', disabled: true}]
        });
    }

    getCompanies() {
        this.transactionService.getCompanies({'page': -1}).subscribe(data => {
            this.companies = data.items;
        });
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

    setSupplierAddress(compId) {
        let selectedSupplierAddress = '';
        if (this.companies && this.companies.length > 0) {
            this.companies.forEach(company => {
                if (parseInt(company.id) === parseInt(compId)) {
                    selectedSupplierAddress = company.name
                }
            });
        }
        this.salesReturnByCustomerForm.patchValue({
            'cutomerAddress': selectedSupplierAddress
        });
    }

    setStoreName(storeId) {
        let selectedStoreName = '';
        if (this.stores && this.stores.length > 0) {
            this.stores.forEach(store => {
                if (parseInt(store.id) === parseInt(storeId)) {
                    selectedStoreName = store.name
                }
            });
        }
        this.salesReturnByCustomerForm.patchValue({
            'storeName': selectedStoreName
        });
    }

    addItem(itemId, description, unitOfMeasures, quantity, unitPrice, unitCost) {
        let repeatItemFound = false;
        if (this.itemsArr && this.itemsArr.length > 0) {
            this.itemsArr.forEach(item => {
                if (parseInt(item.itemId) === parseInt(itemId)) {
                    repeatItemFound = true;
                }
            });
        }
        if (!repeatItemFound || (this.editableIndex !== undefined && repeatItemFound)) {
            let unitOfMeasureName = '';
            if (this.unitOfMeasuresData && this.unitOfMeasuresData.length > 0) {
                this.unitOfMeasuresData.forEach(unitOfMeasure => {
                    if (parseInt(unitOfMeasure.id) === parseInt(unitOfMeasures)) {
                        unitOfMeasureName = unitOfMeasure.name
                    }
                });
            }
            if (this.editableIndex !== undefined) {
                this.itemsArr[this.editableIndex] = {
                    'itemId': itemId,
                    'description': description,
                    'measurementId': unitOfMeasures,
                    'unitOfMeasureName': unitOfMeasureName,
                    'quantity': quantity,
                    'unitPrice': unitPrice,
                    'unitCost': unitCost,
                    'totalValue': parseInt(quantity) * parseInt(unitPrice)
                };
                this.editableIndex = undefined;
            } else {
                this.itemsArr.push({
                    'itemId': itemId,
                    'description': description,
                    'measurementId': unitOfMeasures,
                    'unitOfMeasureName': unitOfMeasureName,
                    'quantity': quantity,
                    'unitPrice': unitPrice,
                    'unitCost': unitCost,
                    'totalValue': parseInt(quantity) * parseInt(unitPrice)
                });
            }
            this.salesReturnByCustomerForm.patchValue({
                'itemId': '',
                'description': '',
                'unitOfMeasures': '',
                'quantity': '',
                'unitPrice': '',
                'unitCost': '',
                'totalValue': '',
            });
            this.setTotals();
        } else {
            this.alertService.showErrors('Item already added');
        }
    }

    deleteItem(index) {
        this.itemsArr.splice(index, 1);
        this.setTotals();
    }

    editItem(index) {
        this.editableIndex = index;
        this.salesReturnByCustomerForm.patchValue({
            'itemId': this.itemsArr[index].itemId,
            'description': this.itemsArr[index].description,
            'unitOfMeasures': this.itemsArr[index].measurementId,
            'quantity': this.itemsArr[index].quantity,
            'unitPrice': this.itemsArr[index].unitPrice,
            'unitCost': this.itemsArr[index].unitCost
        });
    }

    setTotals() {
        let numberToWords = new NumberToWordsPipe();
        if (this.itemsArr && this.itemsArr.length > 0) {
            let subTotal = 0;
            this.itemsArr.forEach(item => {
                subTotal = subTotal + (parseInt(item.unitPrice) * parseInt(item.quantity));
            });
            this.salesReturnByCustomerForm.patchValue({
                'subTotal': subTotal,
                'total': subTotal,
                'totalValuesInWords': numberToWords.transform(subTotal)
            });
        } else {
            this.salesReturnByCustomerForm.patchValue({
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
                    this.salesReturnByCustomerForm.patchValue({
                        'unitOfMeasures': storeItem.inventoryMeasurement.id
                    })
                }
            });
        }
    }

    saveSalesReturnByCustomer() {
        this.salesReturnByCustomerForm.value['items'] = this.itemsArr;
        delete this.salesReturnByCustomerForm.value['description'];
        delete this.salesReturnByCustomerForm.value['itemId'];
        delete this.salesReturnByCustomerForm.value['quantity'];
        delete this.salesReturnByCustomerForm.value['unitCost'];
        delete this.salesReturnByCustomerForm.value['unitPrice'];
        delete this.salesReturnByCustomerForm.value['unitOfMeasures'];
        this.salesReturnByCustomerForm.value['date'] = this.salesReturnByCustomerForm.value['dates'].format('YYYY-MM-DD');
        this.salesReturnByCustomerForm.value['storeName'] = this.salesReturnByCustomerForm['controls']['storeName'].value;
        this.salesReturnByCustomerForm.value['totalValuesInWords'] = this.salesReturnByCustomerForm['controls']['totalValuesInWords'].value;
        this.salesReturnByCustomerForm.value['subTotal'] = this.salesReturnByCustomerForm['controls']['subTotal'].value;
        this.salesReturnByCustomerForm.value['total'] = this.salesReturnByCustomerForm['controls']['total'].value;
        this.salesReturnByCustomerForm.value['cutomerAddress'] = this.salesReturnByCustomerForm['controls']['cutomerAddress'].value;
        this.salesReturnByCustomerForm.value['companyType'] = 'CUSTOMER';
        this.salesReturnByCustomerForm.value['type'] = 'OUT';
        console.log('this.salesReturnByCustomerForm', this.salesReturnByCustomerForm.value);

        this.isSubmitted = true;
        if (!this.salesReturnByCustomerForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.transactionService.saveSalesReturnByCustomer(this.salesReturnByCustomerForm.value).subscribe(data => {
                this.salesReturnByCustomerForm.reset();
                this.itemsArr = [];
                this.isSubmitted = false;
            });
        }
    }
    selectItemsId() {
        this.dialogRef = this._matDialog.open(TransactionsItemsComponent, {
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
            this.salesReturnByCustomerForm.patchValue({
                itemId: response.id,
            });
        });
    }
}
