import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-report-quantity-balance',
    templateUrl: './report-quantity-balance.component.html',
    styleUrls: ['./report-quantity-balance.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReportQuantityBalanceComponent implements OnInit {
    reportQuantityForm: FormGroup;
    itemsArr = [
        {itemCode: 'ab123', description: 'New Item 1', periodBalance: 12, stockValue: '1221', unitOfMeasure: 'kg'},
        {itemCode: 'jk123', description: 'New Item 2', periodBalance: 5, stockValue: '221', unitOfMeasure: 'kg'}
    ];

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.reportQuantityForm = this.fb.group({
            openingDate: [''],
            closingDate: [''],
            itemId: [''],
            itemName: [''],
            store: [''],
            costingMethod: []
        });
    }
}
