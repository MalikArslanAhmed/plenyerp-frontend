import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {AlertService} from "../../../shared/services/alert.service";

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

    constructor(private fb: FormBuilder, private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.salesInvoiceForm = this.fb.group({
            'supplierId': [''],
            'storeId': [''],
            'supplierAddress': [''],
            'storeName': [''],
            'details': [''],
            'pono': [''],
            'srDocRefNo': [''],
            'date': [''],
            'refNo': [''],
            'itemId': [''],
            'description': [''],
            'unitOfMeasures': [''],
            'quantity': [''],
            'unitSellingPrice': [''],
            'totalValuesInWords': [''],
            'subTotal': [''],
            'total': ['']
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
            this.itemsArr.push({
                'id': itemId,
                'description': description,
                'unitOfMeasures': unitOfMeasures,
                'quantity': quantity,
                'unitSellingPrice': unitSellingPrice,
                'value': parseInt(quantity) * parseInt(unitSellingPrice),
                'totalValue': parseInt(quantity) * parseInt(unitSellingPrice)
            });
            this.salesInvoiceForm.patchValue({
                'itemId': '',
                'description': '',
                'unitOfMeasures': '',
                'quantity': '',
                'unitSellingPrice': ''
            });
        } else {
            this.alertService.showErrors('Item already added');
        }
        console.log('this.itemsArr', this.itemsArr);
    }

    deleteItem(index) {
        this.itemsArr.splice(index, 1);
    }
}
