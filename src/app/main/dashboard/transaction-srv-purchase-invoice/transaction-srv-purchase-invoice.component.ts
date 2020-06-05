import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-transaction-srv-purchase-invoice',
    templateUrl: './transaction-srv-purchase-invoice.component.html',
    styleUrls: ['./transaction-srv-purchase-invoice.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionSrvPurchaseInvoiceComponent implements OnInit {
    srvPurchaseInvocieForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.srvPurchaseInvocieForm = this.fb.group({
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
