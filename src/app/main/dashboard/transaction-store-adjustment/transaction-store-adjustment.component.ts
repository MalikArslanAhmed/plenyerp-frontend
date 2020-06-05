import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-transaction-store-adjustment',
    templateUrl: './transaction-store-adjustment.component.html',
    styleUrls: ['./transaction-store-adjustment.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionStoreAdjustmentComponent implements OnInit {
    storeAdjustmentForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.storeAdjustmentForm = this.fb.group({
            'supplierId': [''],
            'storeId': [''],
            'supplierAddress': [''],
            'storeName': [''],
            'details': [''],
            'srDocRefNo': [''],
            'date': [''],
            'refNo': [''],
            'itemId': [''],
            'description': [''],
            'unitOfMeasures': [''],
            'quantityInSys': [''],
            'quantityPhyCount': [''],
            'quantitySysLessPhy': [''],
            'unitCostOfDiff': [''],
            'totalValuesInWords': [''],
            'subTotal': [''],
            'total': ['']
        });
    }
}
