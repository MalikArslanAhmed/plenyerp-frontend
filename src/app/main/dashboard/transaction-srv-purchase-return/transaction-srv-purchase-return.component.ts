import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-transaction-srv-purchase-return',
    templateUrl: './transaction-srv-purchase-return.component.html',
    styleUrls: ['./transaction-srv-purchase-return.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionSrvPurchaseReturnComponent implements OnInit {
    srvPurchaseReturnForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.srvPurchaseReturnForm = this.fb.group({
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
