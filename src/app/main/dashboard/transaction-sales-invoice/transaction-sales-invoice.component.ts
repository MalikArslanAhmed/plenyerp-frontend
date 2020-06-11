import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {AlertService} from "../../../shared/services/alert.service";
import {TransactionService} from "../../../shared/services/transaction.service";
import {ApplicableTaxesComponent} from "../applicable-taxes/applicable-taxes.component";
import {MatDialog} from "@angular/material/dialog";
import {StoreSetupStoresService} from "../../../shared/services/store-setup-stores.service";
import {StoreSetupItemsService} from "../../../shared/services/store-setup-items.service";
import {NumberToWordsPipe} from "../../../shared/pipes/number-to-word.pipe";

@Component({
    selector: 'app-transaction-sales-invoice',
    templateUrl: './transaction-sales-invoice.component.html',
    styleUrls: ['./transaction-sales-invoice.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionSalesInvoiceComponent implements OnInit {
    salesInvoiceForm: FormGroup;
    itemsArr = [];
    companies = [];
    dialogRef: any;
    taxes = [];
    totalTaxes: any;
    stores = [];
    storeItems = [];
    unitOfMeasuresData = [];

    constructor(private fb: FormBuilder,
                private alertService: AlertService,
                private transactionService: TransactionService,
                private _matDialog: MatDialog,
                private storeSetupStoresService: StoreSetupStoresService,
                private storeSetupItemsService: StoreSetupItemsService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getCompanies();
        this.getStores();
        this.getStoreItems();
        // this.getStoreSetupUnitOfMeasure();
    }

    refresh() {
        this.salesInvoiceForm = this.fb.group({
            'supplierId': [''],
            'storeId': [''],
            'supplierAddress': [{value: '', disabled: true}],
            'storeName': [{value: '', disabled: true}],
            'details': [''],
            'pono': [''],
            'srDocRefNo': [''],
            'date': [''],
            'itemId': [''],
            'description': [''],
            'unitOfMeasures': [{value: '', disabled: true}],
            'quantity': [''],
            'unitSellingPrice': [''],
            'totalValuesInWords': [{value: '', disabled: true}],
            'subTotal': [{value: '', disabled: true}],
            'totalTaxes': [{value: '', disabled: true}],
            'total': [{value: '', disabled: true}]
        });
    }

    addItem(itemId, description, unitOfMeasures, quantity, unitSellingPrice) {
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
                'unitOfMeasureName': unitOfMeasureName,
                'quantity': quantity,
                'unitSellingPrice': unitSellingPrice,
                'value': parseInt(quantity) * parseInt(unitSellingPrice),
                'totalValue': this.totalTaxes + (parseInt(quantity) * parseInt(unitSellingPrice)),
                'taxes': this.taxes,
                'totalTaxes': this.totalTaxes
            });
            this.salesInvoiceForm.patchValue({
                'itemId': '',
                'description': '',
                'unitOfMeasures': '',
                'quantity': '',
                'unitSellingPrice': ''
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

    getCompanies() {
        this.transactionService.getCompanies({'page': -1}).subscribe(data => {
            this.companies = data.items;
        });
    }

    addApplicableTaxes() {
        if (!this.salesInvoiceForm.value.itemId || this.salesInvoiceForm.value.itemId === '') {
            this.alertService.showErrors('Item Id can\'t be empty');
            return;
        } else if (!this.salesInvoiceForm.value.quantity || this.salesInvoiceForm.value.quantity === '') {
            this.alertService.showErrors('Quantity can\'t be empty');
            return;
        } else if (!this.salesInvoiceForm.value.unitSellingPrice || this.salesInvoiceForm.value.unitSellingPrice === '') {
            this.alertService.showErrors('Unit selling price can\'t be empty');
            return;
        }
        this.dialogRef = this._matDialog.open(ApplicableTaxesComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                'action': 'CREATE',
                'itemId': this.salesInvoiceForm.value.itemId,
                'grossAmount': this.salesInvoiceForm.value.unitSellingPrice * this.salesInvoiceForm.value.quantity,
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
                'grossAmount': item.unitSellingPrice * item.quantity,
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

    setStoreName(storeId) {
        let selectedStoreName = '';
        if (this.stores && this.stores.length > 0) {
            this.stores.forEach(store => {
                if (parseInt(store.id) === parseInt(storeId)) {
                    selectedStoreName = store.name
                }
            });
        }
        this.salesInvoiceForm.patchValue({
            'storeName': selectedStoreName
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
        this.salesInvoiceForm.patchValue({
            'supplierAddress': selectedSupplierAddress
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
            this.salesInvoiceForm.patchValue({
                'subTotal': subTotal,
                'totalTaxes': totalTaxes,
                'total': subTotal + totalTaxes,
                'totalValuesInWords': numberToWords.transform(subTotal + totalTaxes)
            });
        } else {
            this.salesInvoiceForm.patchValue({
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
                    this.salesInvoiceForm.patchValue({
                        'unitOfMeasures': storeItem.inventoryMeasurement.id
                    })
                }
            });
        }
    }

    saveSalesInvoice() {
        this.salesInvoiceForm.value['items'] = this.itemsArr;
        delete this.salesInvoiceForm.value['description'];
        delete this.salesInvoiceForm.value['itemId'];
        delete this.salesInvoiceForm.value['quantity'];
        delete this.salesInvoiceForm.value['unitSellingPrice'];
        delete this.salesInvoiceForm.value['unitOfMeasures'];
        this.salesInvoiceForm.value['date'] = this.salesInvoiceForm.value['date'].format('YYYY-MM-DD');
        this.salesInvoiceForm.value['storeName'] = this.salesInvoiceForm['controls']['storeName'].value;
        this.salesInvoiceForm.value['totalValuesInWords'] = this.salesInvoiceForm['controls']['totalValuesInWords'].value;
        this.salesInvoiceForm.value['subTotal'] = this.salesInvoiceForm['controls']['subTotal'].value;
        this.salesInvoiceForm.value['totalTaxes'] = this.salesInvoiceForm['controls']['totalTaxes'].value;
        this.salesInvoiceForm.value['total'] = this.salesInvoiceForm['controls']['total'].value;
        this.salesInvoiceForm.value['supplierAddress'] = this.salesInvoiceForm['controls']['supplierAddress'].value;
        console.log('this.salesInvoiceForm', this.salesInvoiceForm.value);
    }
}
