import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-transaction-sales-invoice',
    templateUrl: './transaction-sales-invoice.component.html',
    styleUrls: ['./transaction-sales-invoice.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionSalesInvoiceComponent implements OnInit {
    salesInvoiceForm: FormGroup;

    constructor(private fb: FormBuilder) {
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
}
