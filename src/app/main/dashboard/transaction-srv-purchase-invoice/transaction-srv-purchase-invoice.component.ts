import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertService} from '../../../shared/services/alert.service';
import {TransactionService} from '../../../shared/services/transaction.service';
import {MatDialog} from '@angular/material/dialog';
import {ApplicableTaxesComponent} from '../applicable-taxes/applicable-taxes.component';
import {StoreSetupItemsService} from '../../../shared/services/store-setup-items.service';
import {StoreSetupStoresService} from '../../../shared/services/store-setup-stores.service';
import {NumberToWordsPipe} from '../../../shared/pipes/number-to-word.pipe';
import {TransactionSupplierSelectComponent} from '../transaction-supplier-select/transaction-supplier-select.component';
import { TransactionStoreSelectComponent } from '../transaction-store-select/transaction-store-select.component';
import {TransactionsItemsSelectComponent} from '../transactions-items-select/transactions-items-select.component';

@Component({
    selector: 'app-transaction-srv-purchase-invoice',
    templateUrl: './transaction-srv-purchase-invoice.component.html',
    styleUrls: ['./transaction-srv-purchase-invoice.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionSrvPurchaseInvoiceComponent implements OnInit {
    srvPurchaseInvoiceForm: FormGroup;
    itemsArr = [];
    companies = [];
    dialogRef: any;
    taxes: any;
    totalTaxes: any;
    storeItems = [];
    stores = [];
    unitOfMeasuresData = [];
    subTotal = 0;
    isSubmitted = false;
    //taxArray = [1, 2];
    taxArray = [];
    constructor(private fb: FormBuilder,
                private alertService: AlertService,
                private transactionService: TransactionService,
                private _matDialog: MatDialog,
                private storeSetupItemsService: StoreSetupItemsService,
                private storeSetupStoresService: StoreSetupStoresService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getStores();
        this.getStoreItems();
    }


    refresh() {
        this.srvPurchaseInvoiceForm = this.fb.group({
            companyId: [''],
            storeId: [''],
            supplierAddress: [{value: '', disabled: true}],
            storeName: [{value: '', disabled: true}],
            detail: [''],
            poNumber: [''],
            sourceDocReferenceNumber: [''],
            dates: [''],
            itemId: [''],
            description: [''],
            unitOfMeasures: [{value: '', disabled: true}],
            quantity: [''],
            unitCost: [''],
            totalValuesInWords: [{value: '', disabled: true}],
            subTotal: [{value: '', disabled: true}],
            totalTax: [{value: '', disabled: true}],
            total: [{value: '', disabled: true}]
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
                itemId: itemId,
                description: description,
                measurementId: unitOfMeasures,
                unitOfMeasuresName: unitOfMeasureName,
                quantity: quantity,
                unitCost: unitCost,
                value: parseInt(quantity) * parseInt(unitCost),
                totalValue: (parseInt(quantity) * parseInt(unitCost))+this.totalTaxes ,
                taxes: this.taxes,
                totalTaxes: this.totalTaxes
            }); 

            this.srvPurchaseInvoiceForm.patchValue({
                itemId: '',
                description: '',
                unitOfMeasures: '',
                quantity: '',
                unitCost: ''
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
        if (!this.srvPurchaseInvoiceForm.value.itemId || this.srvPurchaseInvoiceForm.value.itemId === '') {
            this.alertService.showErrors('Item Id can\'t be empty');
            return;
        } else if (!this.srvPurchaseInvoiceForm.value.quantity || this.srvPurchaseInvoiceForm.value.quantity === '') {
            this.alertService.showErrors('Quantity can\'t be empty');
            return;
        } else if (!this.srvPurchaseInvoiceForm.value.unitCost || this.srvPurchaseInvoiceForm.value.unitCost === '') {
            this.alertService.showErrors('Unit cost can\'t be empty');
            return;
        }  
        this.dialogRef = this._matDialog.open(ApplicableTaxesComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                action: 'CREATE',
                itemId: this.srvPurchaseInvoiceForm.value.itemId,
                taxArray: this.taxArray,
                grossAmount: this.srvPurchaseInvoiceForm.value.unitCost * this.srvPurchaseInvoiceForm.value.quantity,
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
                action: 'EDIT',
                id: index,
                itemId: item.id,
                taxes: item.taxes,
                totalTaxes: item.totalTaxes,
                grossAmount: item.unitCost * item.quantity,
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
                    selectedSupplierAddress = company.name;
                }
            });
        }
        this.srvPurchaseInvoiceForm.patchValue({
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
        this.srvPurchaseInvoiceForm.patchValue({
            storeName: selectedStoreName
        });
    }

    setTotals() {
        const numberToWords = new NumberToWordsPipe();
        if (this.itemsArr && this.itemsArr.length > 0) {
            let subTotal = 0;
            let totalTaxes = 0;
            this.itemsArr.forEach(item => {
                subTotal = subTotal + parseInt(item.value);
                totalTaxes = totalTaxes + parseInt(item.totalTaxes);
            });
            this.srvPurchaseInvoiceForm.patchValue({
                subTotal: subTotal,
                totalTax: totalTaxes,
                total: subTotal + totalTaxes,
                totalValuesInWords: numberToWords.transform(subTotal + totalTaxes)
            });
        } else {
            this.srvPurchaseInvoiceForm.patchValue({
                subTotal: 0,
                totalTax: 0,
                total: 0,
                totalValuesInWords: '-'
            });
        }
    }

    setItemQuantity(itemId) {
        if (this.storeItems && this.storeItems.length > 0) {
            this.storeItems.forEach(storeItem => {
                if (parseInt(storeItem.id) === parseInt(itemId.value)) {
                    this.unitOfMeasuresData = [{
                        id: storeItem.inventoryMeasurement.id,
                        name: storeItem.inventoryMeasurement.name
                    }];
                    this.srvPurchaseInvoiceForm.patchValue({
                        unitOfMeasures: storeItem.inventoryMeasurement.id
                    });
                }
            });
        }
    }

    savePurchaseInvoice() {
        const itemsArrCopy = JSON.parse(JSON.stringify(this.itemsArr));
        if (itemsArrCopy && itemsArrCopy.length > 0) {
            itemsArrCopy.forEach(item => {
                if (item && item['taxes'] && item['taxes'].length > 0) {
                    let i = 0;
                    item['taxes'].forEach(tax => {
                        if (tax && (!tax.hasOwnProperty('checked') || !tax.checked)) {
                            item['taxes'].splice(i, 1);
                        }
                        i++;
                    });
                }
            });
        }
        this.srvPurchaseInvoiceForm.value['items'] = itemsArrCopy;
        delete this.srvPurchaseInvoiceForm.value['description'];
        delete this.srvPurchaseInvoiceForm.value['itemId'];
        delete this.srvPurchaseInvoiceForm.value['quantity'];
        delete this.srvPurchaseInvoiceForm.value['unitCost'];
        delete this.srvPurchaseInvoiceForm.value['unitOfMeasures'];
        this.srvPurchaseInvoiceForm.value['date'] = this.srvPurchaseInvoiceForm.value['dates'].format('YYYY-MM-DD');
        this.srvPurchaseInvoiceForm.value['storeName'] = this.srvPurchaseInvoiceForm['controls']['storeName'].value;
        this.srvPurchaseInvoiceForm.value['totalValuesInWords'] = this.srvPurchaseInvoiceForm['controls']['totalValuesInWords'].value;
        this.srvPurchaseInvoiceForm.value['subTotal'] = this.srvPurchaseInvoiceForm['controls']['subTotal'].value;
        this.srvPurchaseInvoiceForm.value['totalTax'] = this.srvPurchaseInvoiceForm['controls']['totalTax'].value;
        this.srvPurchaseInvoiceForm.value['total'] = this.srvPurchaseInvoiceForm['controls']['total'].value;
        this.srvPurchaseInvoiceForm.value['supplierAddress'] = this.srvPurchaseInvoiceForm['controls']['supplierAddress'].value;
        this.srvPurchaseInvoiceForm.value['companyType'] = 'SUPPLIER';
        this.srvPurchaseInvoiceForm.value['type'] = 'IN';
        console.log('this.srvPurchaseInvoiceForm', this.srvPurchaseInvoiceForm.value);

        this.isSubmitted = true;
        if (!this.srvPurchaseInvoiceForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.transactionService.saveSrvPurchaseInvoice(this.srvPurchaseInvoiceForm.value).subscribe(data => {
                this.srvPurchaseInvoiceForm.reset();
                this.itemsArr = [];
                this.isSubmitted = false;
            });
        }
    }

    supplierIdSelect() {
        this.dialogRef = this._matDialog.open(TransactionSupplierSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            console.log(response);
            this.companies = [{
                'name': response.name,
                'id': response.id,
            }];
            
            this.srvPurchaseInvoiceForm.patchValue({
                companyId: response.id,
                supplierAddress:response.address
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
            this.srvPurchaseInvoiceForm.patchValue({
                storeId: response.id,
                storeName:response.name
            });
        });
    }

    selectItemsId() {
        this.dialogRef = this._matDialog.open(TransactionsItemsSelectComponent, {
            panelClass: 'transaction-items-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
                
            }

            if ( response.itemTaxes && response.itemTaxes.length>0) {
                response.itemTaxes.forEach(val => {
                    this.taxArray.push(val.taxId);                    
                });
            }
            this.storeItems = [{
                'name': response.name,
                'id': response.id
            }];
           
            this.srvPurchaseInvoiceForm.patchValue({
                itemId: response.id,
            });
            this.unitOfMeasuresData = [{
                'name': response['inventoryMeasurement'].name,
                'id': response['inventoryMeasurement'].id
            }];
            this.srvPurchaseInvoiceForm.patchValue({
                'unitOfMeasures': this.unitOfMeasuresData[0].id
            });
        });
    }
}
