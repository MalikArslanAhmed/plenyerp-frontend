import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-transaction-stv-store-transfer',
    templateUrl: './transaction-stv-store-transfer.component.html',
    styleUrls: ['./transaction-stv-store-transfer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionStvStoreTransferComponent implements OnInit {
    stvStoreTransferForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.stvStoreTransferForm = this.fb.group({
            'supplierId': [''],
            'storeId': [''],
            'givingStoreName': [''],
            'receivingStoreName': [''],
            'details': [''],
            'srDocRefNo': [''],
            'date': [''],
            'refNo': [''],
            'itemId': [''],
            'description': [''],
            'unitOfMeasures': [''],
            'quantity': [''],
            'accountCode': ['']
        });
    }
}
