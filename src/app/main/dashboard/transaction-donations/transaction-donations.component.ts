import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-transaction-donations',
    templateUrl: './transaction-donations.component.html',
    styleUrls: ['./transaction-donations.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionDonationsComponent implements OnInit {
    donationsForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.donationsForm = this.fb.group({
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
            'quantity': [''],
            'unitCost': [''],
            'quantitySysLessPhy': [''],
            'unitCostOfDiff': [''],
            'totalValuesInWords': [''],
            'subTotal': [''],
            'total': ['']
        });
    }
}
