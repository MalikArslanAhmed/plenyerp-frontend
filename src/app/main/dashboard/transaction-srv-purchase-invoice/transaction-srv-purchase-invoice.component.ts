import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AlertService} from "../../../shared/services/alert.service";
import {TransactionService} from "../../../shared/services/transaction.service";
import {MatDialog} from "@angular/material/dialog";
import {ApplicableTaxesComponent} from '../applicable-taxes/applicable-taxes.component';
import {StoreSetupItemsService} from "../../../shared/services/store-setup-items.service";
import {StoreSetupStoresService} from "../../../shared/services/store-setup-stores.service";
import {NumberToWordsPipe} from "../../../shared/pipes/number-to-word.pipe";

@Component({
    selector: 'app-transaction-srv-purchase-invoice',
    templateUrl: './transaction-srv-purchase-invoice.component.html',
    styleUrls: ['./transaction-srv-purchase-invoice.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionSrvPurchaseInvoiceComponent implements OnInit {
    srvPurchaseInvocieForm: FormGroup;
    itemsArr = [];
    companies = [];
    dialogRef: any;
    taxes: any;
    totalTaxes: any;
    storeItems = [];
    stores = [];
    unitOfMeasuresData = [];
    subTotal = 0;

    constructor(private fb: FormBuilder,
                private alertService: AlertService,
                private transactionService: TransactionService,
                private _matDialog: MatDialog,
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
        this.srvPurchaseInvocieForm = this.fb.group({
            'supplierId': [''],
            'storeId': [''],
            'supplierAddress': [{value: '', disabled: true}],
            'storeName': [{value: '', disabled: true}],
            'details': [''],
            'pono': [''],
            'srDocRefNo': [''],
            'date': [''],
            'refNo': [''],
            'itemId': [''],
            'description': [''],
            'unitOfMeasures': [{value: '', disabled: true}],
            'quantity': [''],
            'unitCost': [''],
            'totalValuesInWords': [{value: '', disabled: true}],
            'subTotal': [{value: '', disabled: true}],
            'totalTaxes': [{value: '', disabled: true}],
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

    addItem(itemId, description, unitOfMeasures, quantity, unitCost) {
        let repeatItemFound = false;
        if (this.itemsArr && this.itemsArr.length > 0) {
            this.itemsArr.forEach(item => {
                if (parseInt(item.id) === parseInt(itemId)) {
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
                'id': itemId,
                'description': description,
                'unitOfMeasures': unitOfMeasures,
                'unitOfMeasuresName': unitOfMeasureName,
                'quantity': quantity,
                'unitCost': unitCost,
                'value': parseInt(quantity) * parseInt(unitCost),
                'totalValue': this.totalTaxes + (parseInt(quantity) * parseInt(unitCost)),
                'taxes': this.taxes,
                'totalTaxes': this.totalTaxes
            });
            this.srvPurchaseInvocieForm.patchValue({
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

    deleteItem(index) {
        this.itemsArr.splice(index, 1);
        this.setTotals();
    }

    addApplicableTaxes() {
        if (!this.srvPurchaseInvocieForm.value.itemId || this.srvPurchaseInvocieForm.value.itemId === '') {
            this.alertService.showErrors('Item Id can\'t be empty');
            return;
        } else if (!this.srvPurchaseInvocieForm.value.quantity || this.srvPurchaseInvocieForm.value.quantity === '') {
            this.alertService.showErrors('Quantity can\'t be empty');
            return;
        } else if (!this.srvPurchaseInvocieForm.value.unitCost || this.srvPurchaseInvocieForm.value.unitCost === '') {
            this.alertService.showErrors('Unit cost can\'t be empty');
            return;
        }
        this.dialogRef = this._matDialog.open(ApplicableTaxesComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                'action': 'CREATE',
                'itemId': this.srvPurchaseInvocieForm.value.itemId,
                'grossAmount': this.srvPurchaseInvocieForm.value.unitCost * this.srvPurchaseInvocieForm.value.quantity,
            }
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.taxes = response.taxes;
            this.totalTaxes = response.totalTaxes;
        });
    }

    editTaxes(index, item) {
        this.dialogRef = this._matDialog.open(ApplicableTaxesComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                'action': 'EDIT',
                'id': index,
                'itemId': item.id,
                'taxes': item.taxes,
                'totalTaxes': item.totalTaxes,
                'grossAmount': item.unitCost * item.quantity,
            }
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.itemsArr[index].taxes = response.taxes;
            this.itemsArr[index].totalTaxes = response.totalTaxes;
            this.setTotals();
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
        this.srvPurchaseInvocieForm.patchValue({
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
        this.srvPurchaseInvocieForm.patchValue({
            'storeName': selectedStoreName
        });
    }

    setTotals() {
        let numberToWords = new NumberToWordsPipe();
        if (this.itemsArr && this.itemsArr.length > 0) {
            let subTotal = 0;
            let totalTaxes = 0;
            this.itemsArr.forEach(item => {
                subTotal = subTotal + parseInt(item.value);
                totalTaxes = totalTaxes + parseInt(item.totalTaxes);
            });
            this.srvPurchaseInvocieForm.patchValue({
                'subTotal': subTotal,
                'totalTaxes': totalTaxes,
                'total': subTotal + totalTaxes,
                'totalValuesInWords': numberToWords.transform(subTotal + totalTaxes)
            });
        } else {
            this.srvPurchaseInvocieForm.patchValue({
                'subTotal': 0,
                'totalTaxes': 0,
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
                    this.srvPurchaseInvocieForm.patchValue({
                        'unitOfMeasures': storeItem.inventoryMeasurement.id
                    })
                }
            });
        }
    }

    savePurchaseInvoice() {
        this.srvPurchaseInvocieForm.value['items'] = this.itemsArr;
        delete this.srvPurchaseInvocieForm.value['description'];
        delete this.srvPurchaseInvocieForm.value['itemId'];
        delete this.srvPurchaseInvocieForm.value['quantity'];
        delete this.srvPurchaseInvocieForm.value['unitCost'];
        delete this.srvPurchaseInvocieForm.value['unitOfMeasures'];
        this.srvPurchaseInvocieForm.value['date'] = this.srvPurchaseInvocieForm.value['date'].format('YYYY-MM-DD');
        this.srvPurchaseInvocieForm.value['storeName'] = this.srvPurchaseInvocieForm['controls']['storeName'].value;
        this.srvPurchaseInvocieForm.value['totalValuesInWords'] = this.srvPurchaseInvocieForm['controls']['totalValuesInWords'].value;
        this.srvPurchaseInvocieForm.value['subTotal'] = this.srvPurchaseInvocieForm['controls']['subTotal'].value;
        this.srvPurchaseInvocieForm.value['totalTaxes'] = this.srvPurchaseInvocieForm['controls']['totalTaxes'].value;
        this.srvPurchaseInvocieForm.value['total'] = this.srvPurchaseInvocieForm['controls']['total'].value;
        this.srvPurchaseInvocieForm.value['supplierAddress'] = this.srvPurchaseInvocieForm['controls']['supplierAddress'].value;
        console.log('this.srvPurchaseInvocieForm', this.srvPurchaseInvocieForm.value);
    }
}
