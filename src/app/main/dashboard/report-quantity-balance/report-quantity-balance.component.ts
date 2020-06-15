import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-report-quantity-balance',
    templateUrl: './report-quantity-balance.component.html',
    styleUrls: ['./report-quantity-balance.component.scss']
})
export class ReportQuantityBalanceComponent implements OnInit {
    binCardForm: FormGroup;
    itemsArr = [
        {itemCode: 'ab123', description: 'lorem ipsum', periodBalance: 12, stockValue: '1221', unitOfMeasure: 'kg'},
        {itemCode: 'jk123', description: 'lorem ipsum2', periodBalance: 5, stockValue: '221', unitOfMeasure: 'kg'}
    ];

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.binCardForm = this.fb.group({
            openingDate: [''],
            closingDate: [''],
            store: [''],
            closingMethod: ['']
        });
    }

}
