import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {AlertService} from "../../../shared/services/alert.service";

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
    constructor(private fb: FormBuilder, private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.salesReturnByCustomerForm = this.fb.group({
            'supplierId': [''],
            'storeId': [''],
            'cutomerAddress': [''],
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
            'unitPrice': [''],
            'unitCost': [''],
            'totalValuesInWords': [''],
            'subTotal': [''],
            'total': ['']
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
        if (!repeatItemFound) {
            this.itemsArr.push({
                'id': itemId,
                'description': description,
                'unitOfMeasures': unitOfMeasures,
                'quantity': quantity,
                'unitPrice': unitPrice,
                'unitCost': unitCost,
                'totalValue': parseInt(quantity) * parseInt(unitPrice)
            });
            this.salesReturnByCustomerForm.patchValue({
                'itemId': '',
                'description': '',
                'unitOfMeasures': '',
                'quantity': '',
                'unitPrice': '',
                'unitCost': '',
                'totalValue': '',
            });
        } else {
            this.alertService.showErrors('Item already added');
        }
        console.log('this.itemsArr', this.itemsArr);
    }

    deleteItem(index) {
        this.itemsArr.splice(index, 1);
    }

    editItem(index) {
        this.salesReturnByCustomerForm.patchValue({
            'itemId': this.itemsArr[index].id,
            'description': this.itemsArr[index].description,
            'unitOfMeasures': this.itemsArr[index].unitOfMeasures,
            'quantity': this.itemsArr[index].quantity,
            'unitPrice': this.itemsArr[index].unitPrice,
            'unitCost': this.itemsArr[index].unitCost
        });
    }
}
