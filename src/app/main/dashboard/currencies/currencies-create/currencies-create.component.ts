import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CurrencyService} from "../../../../shared/services/currency.service";

@Component({
    selector: 'app-currencies-create',
    templateUrl: './currencies-create.component.html',
    styleUrls: ['./currencies-create.component.scss']
})
export class CurrenciesCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    currencyForm: FormGroup;
    isSubmitted = false;
    updateData: any;

    constructor(public matDialogRef: MatDialogRef<CurrenciesCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private currencyService: CurrencyService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Currencies';
            if (_data.currency) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Currency';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.currencyForm = this.fb.group({
            'currencyCode': [''],
            'countryCode': [''],
            'currencySingular': [''],
            'currencyPlural': [''],
            'changeSingular': [''],
            'changePlural': [''],
            'currencySign': [''],
            'changeSign': [''],
            'month01': [''],
            'month02': [''],
            'month03': [''],
            'month04': [''],
            'month05': [''],
            'month06': [''],
            'month07': [''],
            'month08': [''],
            'month09': [''],
            'month10': [''],
            'month11': [''],
            'month12': [''],
            'inLocalCurrency': [''],
            'inInternationalCurrency': [''],
            'isActive': [false]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.currencyForm.patchValue({
                'name': this.updateData.currency.name,
                'isActive': this.updateData.currency.isActive
            });
        }
    }

    saveCurrency() {
        this.isSubmitted = true;
        if (!this.currencyForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            this.currencyService.addCensure(this.currencyForm.value).subscribe(data => {
                this.currencyForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateCurrency() {
        this.isSubmitted = true;
        if (!this.currencyForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.currencyService.updateCurrency(this.updateData.currency.id, this.currencyForm.value).subscribe(data => {
                this.updateData = undefined;
                this.currencyForm.reset();
                this.isSubmitted = false;
            });
        }
    }
}
