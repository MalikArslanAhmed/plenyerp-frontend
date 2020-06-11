import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {AlertService} from "../../../shared/services/alert.service";
import {TransactionService} from "../../../shared/services/transaction.service";
import {StoreSetupItemsService} from "../../../shared/services/store-setup-items.service";
import {StoreSetupStoresService} from "../../../shared/services/store-setup-stores.service";
import {NumberToWordsPipe} from "../../../shared/pipes/number-to-word.pipe";

@Component({
    selector: 'app-transaction-store-adjustment',
    templateUrl: './transaction-store-adjustment.component.html',
    styleUrls: ['./transaction-store-adjustment.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionStoreAdjustmentComponent implements OnInit {
    storeAdjustmentForm: FormGroup;
    itemsArr = [];
    companies = [];
    storeItems = [];
    stores = [];
    unitOfMeasuresData = [];
    editableIndex: any;

    constructor(private fb: FormBuilder,
                private alertService: AlertService,
                private transactionService: TransactionService,
                private storeSetupItemsService: StoreSetupItemsService,
                private storeSetupStoresService: StoreSetupStoresService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getCompanies();
        this.getStores();
        this.getStoreItems();
        // this.getStoreSetupUnitOfMeasure();
    }

    refresh() {
        this.storeAdjustmentForm = this.fb.group({
            'supplierId': [''],
            'storeId': [''],
            'supplierAddress': [{value: '', disabled: true}],
            'storeName': [{value: '', disabled: true}],
            'details': [''],
            'srDocRefNo': [''],
            'date': [''],
            'itemId': [''],
            'description': [''],
            'unitOfMeasures': [{value: '', disabled: true}],
            'quantityInSys': [{value: '', disabled: true}],
            'quantityPhyCount': [''],
            'quantitySysLessPhy': [{value: '', disabled: true}],
            'unitCostOfDiff': [''],
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

    /*getStoreSetupUnitOfMeasure() {
        this.storeSetupUnitOfMeasuresService.getStoreSetupUnitOfMeasures({'page': -1}).subscribe(data => {
            this.unitOfMeasuresData = data.items;
        });
    }*/

    setSupplierAddress(compId) {
        let selectedSupplierAddress = '';
        if (this.companies && this.companies.length > 0) {
            this.companies.forEach(company => {
                if (parseInt(company.id) === parseInt(compId)) {
                    selectedSupplierAddress = company.name
                }
            });
        }
        this.storeAdjustmentForm.patchValue({
            'supplierAddress': selectedSupplierAddress
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
        this.storeAdjustmentForm.patchValue({
            'storeName': selectedStoreName
        });
    }

    addItem(itemId, description, unitOfMeasures, quantityInSys, quantityPhyCount, quantitySysLessPhy, unitCostOfDiff) {
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
                    'quantityInSys': quantityInSys,
                    'quantityPhyCount': quantityPhyCount,
                    'quantitySysLessPhy': quantitySysLessPhy,
                    'unitCostOfDiff': unitCostOfDiff,
                    'value': parseInt(quantityPhyCount) * parseInt(unitCostOfDiff),
                    'totalValue': (parseInt(quantityPhyCount) * parseInt(unitCostOfDiff)),
                };
                this.editableIndex = undefined;
            } else {
                this.itemsArr.push({
                    'id': itemId,
                    'description': description,
                    'unitOfMeasures': unitOfMeasures,
                    'unitOfMeasureName': unitOfMeasureName,
                    'quantityInSys': quantityInSys,
                    'quantityPhyCount': quantityPhyCount,
                    'quantitySysLessPhy': quantitySysLessPhy,
                    'unitCostOfDiff': unitCostOfDiff,
                    'value': parseInt(quantityPhyCount) * parseInt(unitCostOfDiff),
                    'totalValue': (parseInt(quantityPhyCount) * parseInt(unitCostOfDiff))
                });
            }
            this.storeAdjustmentForm.patchValue({
                'itemId': '',
                'description': '',
                'unitOfMeasures': '',
                'quantityInSys': '',
                'quantityPhyCount': '',
                'quantitySysLessPhy': '',
                'unitCostOfDiff': ''
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

    setTotals() {
        let numberToWords = new NumberToWordsPipe();
        if (this.itemsArr && this.itemsArr.length > 0) {
            let subTotal = 0;
            this.itemsArr.forEach(item => {
                subTotal = subTotal + parseInt(item.totalValue);
            });
            this.storeAdjustmentForm.patchValue({
                'subTotal': subTotal,
                'total': subTotal,
                'totalValuesInWords': numberToWords.transform(subTotal)
            });
        } else {
            this.storeAdjustmentForm.patchValue({
                'subTotal': 0,
                'total': 0,
                'totalValuesInWords': '-'
            });
        }
    }

    editItem(index) {
        this.editableIndex = index;
        this.storeAdjustmentForm.patchValue({
            'itemId': this.itemsArr[index].id,
            'description': this.itemsArr[index].description,
            'unitOfMeasures': this.itemsArr[index].unitOfMeasures,
            'quantityInSys': this.itemsArr[index].quantityInSys,
            'quantityPhyCount': this.itemsArr[index].quantityPhyCount,
            'quantitySysLessPhy': this.itemsArr[index].quantitySysLessPhy,
            'unitCostOfDiff': this.itemsArr[index].unitCostOfDiff
        });
    }

    setItemQuantity(itemId) {
        if (this.storeItems && this.storeItems.length > 0) {
            this.storeItems.forEach(storeItem => {
                if (parseInt(storeItem.id) === parseInt(itemId.value)) {
                    this.unitOfMeasuresData = [{
                        'id': storeItem.inventoryMeasurement.id,
                        'name': storeItem.inventoryMeasurement.name
                    }];
                    this.storeAdjustmentForm.patchValue({
                        'unitOfMeasures': storeItem.inventoryMeasurement.id
                    });
                    this.storeAdjustmentForm.patchValue({
                        'quantityInSys': storeItem.quantityAvailable
                    });
                }
            });
        }
    }

    setQuantitySysLessPhy(quantitySysLessPhy) {
        const quant = parseInt(this.storeAdjustmentForm['controls']['quantityInSys'].value) - parseInt(quantitySysLessPhy.value);
        if (quant < 0) {
            this.alertService.showErrors('Quantity (Sys-less Phy) should be less than Quantity (Phy Count)');
            this.storeAdjustmentForm.patchValue({
               'quantityPhyCount': ''
            });
            return;
        }
        this.storeAdjustmentForm.patchValue({
            'quantitySysLessPhy': quant
        });
        console.log('quant', quant);
    }

    saveStoreAdjustement() {
        this.storeAdjustmentForm.value['items'] = this.itemsArr;
        delete this.storeAdjustmentForm.value['description'];
        delete this.storeAdjustmentForm.value['itemId'];
        delete this.storeAdjustmentForm.value['quantityInSys'];
        delete this.storeAdjustmentForm.value['quantityPhyCount'];
        delete this.storeAdjustmentForm.value['quantitySysLessPhy'];
        delete this.storeAdjustmentForm.value['unitCostOfDiff'];
        delete this.storeAdjustmentForm.value['unitOfMeasures'];
        this.storeAdjustmentForm.value['date'] = this.storeAdjustmentForm.value['date'].format('YYYY-MM-DD');
        this.storeAdjustmentForm.value['supplierAddress'] = this.storeAdjustmentForm['controls']['supplierAddress'].value;
        this.storeAdjustmentForm.value['storeName'] = this.storeAdjustmentForm['controls']['storeName'].value;
        this.storeAdjustmentForm.value['totalValuesInWords'] = this.storeAdjustmentForm['controls']['totalValuesInWords'].value;
        this.storeAdjustmentForm.value['subTotal'] = this.storeAdjustmentForm['controls']['subTotal'].value;
        this.storeAdjustmentForm.value['total'] = this.storeAdjustmentForm['controls']['total'].value;
        console.log('this.storeAdjustmentForm', this.storeAdjustmentForm.value);
    }
}
