import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CurrencyService} from '../../../../shared/services/currency.service';
import {ContactInfoService} from '../../../../shared/services/contact-info.service';

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
    countries = [];

    constructor(public matDialogRef: MatDialogRef<CurrenciesCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private contactInfoService: ContactInfoService,
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
        this.getCountry();
    }

    refresh() {
        this.currencyForm = this.fb.group({
            codeCurrency: ['', Validators.required],
            countryId: ['', Validators.required],
            singularCurrencyName: ['', Validators.required],
            pluralCurrencyName: ['', Validators.required],
            singularChangeName: ['', Validators.required],
            pluralChangeName: ['', Validators.required],
            currencySign: ['', Validators.required],
            changeSign: ['', Validators.required],
            month_1: ['', Validators.required],
            month_2: ['', Validators.required],
            month_3: ['', Validators.required],
            month_4: ['', Validators.required],
            month_5: ['', Validators.required],
            month_6: ['', Validators.required],
            month_7: ['', Validators.required],
            month_8: ['', Validators.required],
            month_9: ['', Validators.required],
            month_10: ['', Validators.required],
            month_11: ['', Validators.required],
            month_12: ['', Validators.required],
            previousYearClosingRateLocal: ['', Validators.required],
            previousYearClosingRateInternational: ['', Validators.required],
            isActive: [false]
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.currencyForm.patchValue({
                codeCurrency: this.updateData.currency.codeCurrency,
                countryId: this.updateData.currency.countryId,
                singularCurrencyName: this.updateData.currency.singularCurrencyName,
                pluralCurrencyName: this.updateData.currency.pluralCurrencyName,
                singularChangeName: this.updateData.currency.singularChangeName,
                pluralChangeName: this.updateData.currency.pluralChangeName,
                currencySign: this.updateData.currency.currencySign,
                changeSign: this.updateData.currency.changeSign,
                month_1: this.updateData.currency['month1'],
                month_2: this.updateData.currency['month2'],
                month_3: this.updateData.currency['month3'],
                month_4: this.updateData.currency['month4'],
                month_5: this.updateData.currency['month5'],
                month_6: this.updateData.currency['month6'],
                month_7: this.updateData.currency['month7'],
                month_8: this.updateData.currency['month8'],
                month_9: this.updateData.currency['month9'],
                month_10: this.updateData.currency['month10'],
                month_11: this.updateData.currency['month11'],
                month_12: this.updateData.currency['month12'],
                previousYearClosingRateLocal: this.updateData.currency.previousYearClosingRateLocal,
                previousYearClosingRateInternational: this.updateData.currency.previousYearClosingRateInternational,
                isActive: this.updateData.currency.isActive
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
            this.currencyService.addCurrency(this.currencyForm.value).subscribe(data => {
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

    getCountry() {
        this.contactInfoService.country({isActive: 1}).subscribe(data => {
            this.countries = data.items;
        });
    }
}
