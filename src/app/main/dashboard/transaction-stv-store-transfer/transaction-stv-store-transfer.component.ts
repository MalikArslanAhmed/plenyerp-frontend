import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
    selector: 'app-transaction-stv-store-transfer',
    templateUrl: './transaction-stv-store-transfer.component.html',
    styleUrls: ['./transaction-stv-store-transfer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionStvStoreTransferComponent implements OnInit {
    stvStoreTransferForm: FormGroup;
    itemsArr = [];
    constructor(private fb: FormBuilder, private alertService: AlertService) {
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

    addItem(itemId, description, unitOfMeasures, quantity, accountCode) {
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
                'accountCode': accountCode,
            });

            this.stvStoreTransferForm.patchValue({
                'itemId': '',
                'description': '',
                'unitOfMeasures': '',
                'quantity': '',
                'accountCode': ''
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
