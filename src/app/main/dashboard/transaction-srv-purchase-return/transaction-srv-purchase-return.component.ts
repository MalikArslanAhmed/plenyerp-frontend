import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {AlertService} from "../../../shared/services/alert.service";
import {TransactionService} from "../../../shared/services/transaction.service";
import {StoreSetupStoresService} from "../../../shared/services/store-setup-stores.service";
import {StoreSetupItemsService} from "../../../shared/services/store-setup-items.service";
import {StoreSetupUnitOfMeasuresService} from "../../../shared/services/store-setup-unit-of-measures.service";
import {NumberToWordsPipe} from "../../../shared/pipes/number-to-word.pipe";

@Component({
    selector: 'app-transaction-srv-purchase-return',
    templateUrl: './transaction-srv-purchase-return.component.html',
    styleUrls: ['./transaction-srv-purchase-return.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionSrvPurchaseReturnComponent implements OnInit {
    srvPurchaseReturnForm: FormGroup;
    itemsArr = [];
    companies = [];
    stores = [];
    storeItems = [];
    unitOfMeasuresData = [];
    editableIndex: any;

    constructor(private fb: FormBuilder,
                private alertService: AlertService,
                private transactionService: TransactionService,
                private storeSetupStoresService: StoreSetupStoresService,
                private storeSetupItemsService: StoreSetupItemsService,
                private storeSetupUnitOfMeasuresService: StoreSetupUnitOfMeasuresService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getCompanies();
        this.getStores();
        this.getStoreItems();
        this.getStoreSetupUnitOfMeasure();
    }

    refresh() {
        this.srvPurchaseReturnForm = this.fb.group({
            'supplierId': [''],
            'storeId': [''],
            'cutomerAddress': [{value: '', disabled: true}],
            'storeName': [{value: '', disabled: true}],
            'details': [''],
            'pono': [''],
            'srDocRefNo': [''],
            'date': [''],
            'refNo': [''],
            'itemId': [''],
            'description': [''],
            'unitOfMeasures': [''],
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

    getStoreSetupUnitOfMeasure() {
        this.storeSetupUnitOfMeasuresService.getStoreSetupUnitOfMeasures({'page': -1}).subscribe(data => {
            this.unitOfMeasuresData = data.items;
        });
    }

    addItem(itemId, description, unitOfMeasures, quantity, unitPrice, unitCost) {
        let repeatItemFound = false;
        if (this.itemsArr && this.itemsArr.length > 0) {
            this.itemsArr.forEach(item => {
                if (parseInt(item.id) === parseInt(itemId)) {
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
                    'id': itemId,
                    'description': description,
                    'unitOfMeasures': unitOfMeasures,
                    'unitOfMeasureName': unitOfMeasureName,
                    'quantity': quantity,
                    'unitPrice': unitPrice,
                    'unitCost': unitCost,
                    'value': parseInt(quantity) * parseInt(unitPrice)
                };
                this.editableIndex = undefined;
            } else {
                this.itemsArr.push({
                    'id': itemId,
                    'description': description,
                    'unitOfMeasures': unitOfMeasures,
                    'unitOfMeasureName': unitOfMeasureName,
                    'quantity': quantity,
                    'unitPrice': unitPrice,
                    'unitCost': unitCost,
                    'value': parseInt(quantity) * parseInt(unitPrice)
                });
            }

            this.srvPurchaseReturnForm.patchValue({
                'itemId': '',
                'description': '',
                'unitOfMeasures': '',
                'quantity': '',
                'unitPrice': '',
                'unitCost': ''
            });
            this.setTotals();
        } else {
            this.alertService.showErrors('Item already added');
        }
        console.log('this.itemsArr', this.itemsArr);
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
        this.srvPurchaseReturnForm.patchValue({
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
        this.srvPurchaseReturnForm.patchValue({
            'storeName': selectedStoreName
        });
    }

    deleteItem(index) {
        this.itemsArr.splice(index, 1);
        this.setTotals();
    }

    editItem(index) {
        this.editableIndex = index;
        this.srvPurchaseReturnForm.patchValue({
            'itemId': this.itemsArr[index].id,
            'description': this.itemsArr[index].description,
            'unitOfMeasures': this.itemsArr[index].unitOfMeasures,
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
                subTotal = subTotal + parseInt(item.value);
            });
            this.srvPurchaseReturnForm.patchValue({
                'subTotal': subTotal,
                'total': subTotal,
                'totalValuesInWords': numberToWords.transform(subTotal)
            });
        } else {
            this.srvPurchaseReturnForm.patchValue({
                'subTotal': 0,
                'total': 0,
                'totalValuesInWords': '-'
            });
        }
    }

    savePurchaseReturn() {
        this.srvPurchaseReturnForm.value['items'] = this.itemsArr;
        delete this.srvPurchaseReturnForm.value['description'];
        delete this.srvPurchaseReturnForm.value['itemId'];
        delete this.srvPurchaseReturnForm.value['quantity'];
        delete this.srvPurchaseReturnForm.value['unitCost'];
        delete this.srvPurchaseReturnForm.value['unitPrice'];
        delete this.srvPurchaseReturnForm.value['unitOfMeasures'];
        this.srvPurchaseReturnForm.value['date'] = this.srvPurchaseReturnForm.value['date'].format('YYYY-MM-DD');
        this.srvPurchaseReturnForm.value['storeName'] = this.srvPurchaseReturnForm['controls']['storeName'].value;
        this.srvPurchaseReturnForm.value['totalValuesInWords'] = this.srvPurchaseReturnForm['controls']['totalValuesInWords'].value;
        this.srvPurchaseReturnForm.value['subTotal'] = this.srvPurchaseReturnForm['controls']['subTotal'].value;
        this.srvPurchaseReturnForm.value['total'] = this.srvPurchaseReturnForm['controls']['total'].value;
        console.log('this.srvPurchaseReturnForm', this.srvPurchaseReturnForm.value);
    }
}
