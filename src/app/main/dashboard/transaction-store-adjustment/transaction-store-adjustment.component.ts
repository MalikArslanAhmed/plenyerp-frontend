import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
    selector: 'app-transaction-store-adjustment',
    templateUrl: './transaction-store-adjustment.component.html',
    styleUrls: ['./transaction-store-adjustment.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransactionStoreAdjustmentComponent implements OnInit {
    storeAdjustmentForm: FormGroup;
    itemsArr = [];

    constructor(private fb: FormBuilder, private alertService: AlertService) {
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

    addItem(itemId, description, unitOfMeasures, quantityInSys, quantityPhyCount, quantitySysLessPhy, unitCostOfDiff) {
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
                'quantityInSys': quantityInSys,
                'quantityPhyCount': quantityPhyCount,
                'quantitySysLessPhy': quantitySysLessPhy,
                'unitCostOfDiff': unitCostOfDiff,
                'value': parseInt(quantityPhyCount) * parseInt(unitCostOfDiff)
            });

            this.storeAdjustmentForm.patchValue({
                'itemId': '',
                'description': '',
                'unitOfMeasures': '',
                'quantityInSys': '',
                'quantityPhyCount': '',
                'quantitySysLessPhy': '',
                'unitCostOfDiff': ''
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
        this.storeAdjustmentForm.patchValue({
            'itemId': this.itemsArr[index].id,
            'description': this.itemsArr[index].description,
            'unitOfMeasures': this.itemsArr[index].unitOfMeasures,
            'quantityInSys': this.itemsArr[index].quantityInSys,
            'quantityPhyCount': this.itemsArr[index].quantityPhyCount,
            'quantitySysLessPhy': this.itemsArr[index].quantitySysLessPhy,
            'unitCostOfDiff': this.itemsArr[index].unitCostOfDiff
        });
    }
}
