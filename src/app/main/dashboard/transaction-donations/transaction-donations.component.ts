import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
    selector: 'app-transaction-donations',
    templateUrl: './transaction-donations.component.html',
    styleUrls: ['./transaction-donations.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionDonationsComponent implements OnInit {
    donationsForm: FormGroup;
    itemsArr = [];

    constructor(private fb: FormBuilder, private alertService: AlertService) {
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

    addItem(itemId, description, unitOfMeasures, quantity, unitCost) {
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
                'unitCost': unitCost,
                'value': parseInt(quantity) * parseInt(unitCost)
            });
            this.donationsForm.patchValue({
                'itemId': '',
                'description': '',
                'unitOfMeasures': '',
                'quantity': '',
                'unitCost': ''
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
