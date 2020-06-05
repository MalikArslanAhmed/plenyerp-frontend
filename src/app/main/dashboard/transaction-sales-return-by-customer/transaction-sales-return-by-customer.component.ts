import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-transaction-sales-return-by-customer',
    templateUrl: './transaction-sales-return-by-customer.component.html',
    styleUrls: ['./transaction-sales-return-by-customer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionSalesReturnByCustomerComponent implements OnInit {
    salesReturnByCustomerForm: FormGroup;

    constructor(private fb: FormBuilder) {
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
            'unitSellingPrice': [''],
            'unitCost': [''],
            'totalValuesInWords': [''],
            'subTotal': [''],
            'total': ['']
        });
    }
}
