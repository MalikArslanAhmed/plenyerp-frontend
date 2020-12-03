import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {CashbookService} from '../../../../../shared/services/cashbook.service';
import {EconomicSegmentSelectComponent} from "../../../journal-voucher/economic-segment-select/economic-segment-select.component";
import {CurrencyService} from "../../../../../shared/services/currency.service";
import {BanksService} from "../../../../../shared/services/banks.service";
import {AlertService} from "../../../../../shared/services/alert.service";
import {MatTabGroup} from '@angular/material/tabs';

@Component({
    selector: 'app-cashbook-create',
    templateUrl: './cashbook-create.component.html',
    styleUrls: ['./cashbook-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CashbookCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    cashbookAccountForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    dialogRef: any;
    economicSegments = [];
    tab = 'BASIC PROFILE';
    cashbookMonthly = [];
    currencies = [];
    banks = [];
    bankBranch = [];
    fundOwnedBy = [];

    constructor(public matDialogRef: MatDialogRef<CashbookCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private cashbookService: CashbookService,
                private _matDialog: MatDialog,
                private currencyService: CurrencyService,
                private bankService: BanksService,
                private alertService: AlertService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit a Cashbook Account';
            if (_data.cashbook) {
                this.updateData = _data;
                this.cashbookMonthly = [];
                // console.log('this.updateData', this.updateData);
            }
        } else {
            this.dialogTitle = 'Add a Cashbook Account';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getCurrencies();
        this.getBanksList();
        this.fundOwned();
        this.checkForUpdate();
    }

    refresh() {
        this.cashbookAccountForm = this.fb.group({
            economicSegmentCode: [{value: '', disabled: true}],
            economicSegmentId: [''],
            cashbookTitle: [''],
            fullCode: [{value: '', disabled: true}],
            bankStatement: [''],
            cashbook: [''],
            xRateLocalCurrency: [''],
            paymentVoucherId: [''],
            receiptVoucherId: [''],
            prefix: [''],
            suffix: [''],
            eMandate: [''],
            fundOwnedBy: [''],
            bankAccountNumber: [''],
            title: [''],
            bankId: [''],
            bankBranchId: [''],
            currencyId: [''],
            typeOfAccount: [''],
            month_1: [''],
            month_2: [''],
            month_3: [''],
            month_4: [''],
            month_5: [''],
            month_6: [''],
            month_7: [''],
            month_8: [''],
            month_9: [''],
            month_10: [''],
            month_11: [''],
            month_12: [''],
        });
    }

    getCurrencies() {
        this.currencies = [];
        this.currencyService.getCurrency({}).subscribe(data => {
            this.currencies = data.items;
        });
    }

    fundOwned() {
        this.fundOwnedBy = [];
        this.cashbookService.fundOwned({}).subscribe(data => {
            this.fundOwnedBy = data.items;
        });
    }

    getBanksList() {
        this.bankService.getBanks({page: -1}).subscribe(data => {
            this.banks = data.items;
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            if (this.updateData['cashbook']['economicSegment']) {
                this.economicSegments = [this.updateData['cashbook']['economicSegment']];
            }

            if (this.updateData['cashbook']['bankId']) {
                this.getBranches(this.updateData['cashbook']['bankId']);
            }

            this.cashbookAccountForm.patchValue({
                'economicSegmentId': this.updateData['cashbook'] && this.updateData['cashbook'].economicSegmentId ? this.updateData['cashbook'].economicSegmentId : '',
                'cashbookTitle': this.updateData['cashbook'] && this.updateData['cashbook'].cashbookTitle ? this.updateData['cashbook'].cashbookTitle : '',
                'fullCode': this.updateData['cashbook'] && this.updateData['cashbook'].fullCode ? this.updateData['cashbook'].fullCode : '',
                'bankStatement': this.updateData['cashbook'] && this.updateData['cashbook'].bankStatement ? this.updateData['cashbook'].bankStatement : '',
                'cashbook': this.updateData['cashbook'] && this.updateData['cashbook'].cashbook ? this.updateData['cashbook'].cashbook : '',
                'xRateLocalCurrency': this.updateData['cashbook'] && this.updateData['cashbook'].xRateLocalCurrency ? this.updateData['cashbook'].xRateLocalCurrency : '',
                'paymentVoucherId': this.updateData['cashbook'] && this.updateData['cashbook'].paymentVoucherId ? this.updateData['cashbook'].paymentVoucherId : '',
                'receiptVoucherId': this.updateData['cashbook'] && this.updateData['cashbook'].receiptVoucherId ? this.updateData['cashbook'].receiptVoucherId : '',
                'eMandate': this.updateData['cashbook'] && this.updateData['cashbook'].eMandate ? this.updateData['cashbook'].eMandate : '',
                'prefix': this.updateData['cashbook'] && this.updateData['cashbook'].prefix ? this.updateData['cashbook'].prefix : '',
                'suffix': this.updateData['cashbook'] && this.updateData['cashbook'].suffix ? this.updateData['cashbook'].suffix : '',
                'fundOwnedBy': this.updateData['cashbook'] && this.updateData['cashbook'].fundOwnedBy ? this.updateData['cashbook'].fundOwnedBy : '',
                'bankAccountNumber': this.updateData['cashbook'] && this.updateData['cashbook'].bankAccountNumber ? this.updateData['cashbook'].bankAccountNumber : '',
                'bankId': this.updateData['cashbook'] && this.updateData['cashbook'].bankId ? this.updateData['cashbook'].bankId : '',
                'bankBranchId': this.updateData['cashbook'] && this.updateData['cashbook'].bankBranchId ? this.updateData['cashbook'].bankBranchId : '',
                'title': this.updateData['cashbook'] && this.updateData['cashbook'].title ? this.updateData['cashbook'].title : '',
                'currencyId': this.updateData['cashbook'] && this.updateData['cashbook'].currencyId ? this.updateData['cashbook'].currencyId : '',
                'typeOfAccount': this.updateData['cashbook'] && this.updateData['cashbook'].typeOfAccount ? this.updateData['cashbook'].typeOfAccount : '',
            });

            if (this.updateData['cashbook']['cashbookMonthlyBalances'] && this.updateData['cashbook']['cashbookMonthlyBalances'].length > 0) {
                this.updateData['cashbook']['cashbookMonthlyBalances'].forEach(cash => {
                    if (cash.month === 1) {
                        this.cashbookAccountForm.patchValue({
                            'month_1': cash.balance
                        });
                    }
                    if (cash.month === 2) {
                        this.cashbookAccountForm.patchValue({
                            'month_2': cash.balance
                        });
                    }
                    if (cash.month === 3) {
                        this.cashbookAccountForm.patchValue({
                            'month_3': cash.balance
                        });
                    }
                    if (cash.month === 4) {
                        this.cashbookAccountForm.patchValue({
                            'month_4': cash.balance
                        });
                    }
                    if (cash.month === 5) {
                        this.cashbookAccountForm.patchValue({
                            'month_5': cash.balance
                        });
                    }
                    if (cash.month === 6) {
                        this.cashbookAccountForm.patchValue({
                            'month_6': cash.balance
                        });
                    }
                    if (cash.month === 7) {
                        this.cashbookAccountForm.patchValue({
                            'month_7': cash.balance
                        });
                    }
                    if (cash.month === 8) {
                        this.cashbookAccountForm.patchValue({
                            'month_8': cash.balance
                        });
                    }
                    if (cash.month === 9) {
                        this.cashbookAccountForm.patchValue({
                            'month_9': cash.balance
                        });
                    }
                    if (cash.month === 10) {
                        this.cashbookAccountForm.patchValue({
                            'month_10': cash.balance
                        });
                    }
                    if (cash.month === 11) {
                        this.cashbookAccountForm.patchValue({
                            'month_11': cash.balance
                        });
                    }
                    if (cash.month === 12) {
                        this.cashbookAccountForm.patchValue({
                            'month_12': cash.balance
                        });
                    }
                });
            }
        }
    }

    saveCashbookDetails() {
        this.isSubmitted = true;
        if (!this.cashbookAccountForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            for (let i = 1; i <= 12; i++) {
                if (this.cashbookAccountForm.value['month_' + i] !== '') {
                    this.cashbookMonthly.push({
                        'month': i,
                        'balance': parseInt(this.cashbookAccountForm.value['month_' + i])
                    });
                }
            }

            this.cashbookAccountForm.value['cashbookMonthly'] = (this.cashbookMonthly && this.cashbookMonthly.length > 0) ? this.cashbookMonthly : [];
            this.cashbookService.save(this.cashbookAccountForm.value).subscribe(data => {
                this.cashbookAccountForm.reset();
                this.matDialogRef.close(this.cashbookAccountForm);
                this.isSubmitted = false;
            });
        }
    }

    updateCashbookDetails() {
        this.isSubmitted = true;
        if (!this.cashbookAccountForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            if (this.cashbookMonthly && this.cashbookMonthly.length > 0) {
                this.cashbookAccountForm.value['cashbookMonthly'] = this.cashbookMonthly;
            } else {
                this.cashbookAccountForm.value['cashbookMonthly'] = this.updateData['cashbook']['cashbookMonthlyBalances'];
            }
            for (let i = 1; i <= 12; i++) {
                if (this.cashbookAccountForm.value['month_' + i] !== '') {
                    this.cashbookMonthly.push({
                        'month': i,
                        'balance': parseInt(this.cashbookAccountForm.value['month_' + i])
                    });
                }
            }
            this.cashbookService.update(this.updateData['cashbook'].id, this.cashbookAccountForm.value).subscribe(data => {
                this.cashbookAccountForm.reset();
                this.updateData = undefined;
                this.matDialogRef.close(this.cashbookAccountForm);
                this.isSubmitted = false;
            });
        }
    }

    economicSegmentSelect() {
        this.dialogRef = this._matDialog.open(EconomicSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.economicSegments = [{
                'name': response.combinedCode + ' - ' + response.name,
                'id': response.id
            }];
            this.cashbookAccountForm.patchValue({
                economicSegmentId: response.id,
                economicSegmentCode: response.id,
                fullCode: response.combinedCode,
                cashbookTitle: response.name,
                disabled: true
            });
        });
    }

    tabChange(event) {
        this.tab = event['tab'].textLabel;
    }

    /*addCashbookMonthly() {
        // console.log('this.cashbookMonthly', this.cashbookMonthly);
        this.alertService.showSuccess({title: 'Success', message: 'Bank balance and Other details Added ..!'});
    }*/

    getBranches(bankId) {
        this.bankService.getBranches(bankId, {page: -1}).subscribe(data => {
            this.bankBranch = data.items;
        });
    }

    goToNextTab(tabGroup: MatTabGroup) {
        this.goToNextTabIndex(tabGroup);
    }

    goToNextTabIndex(tabGroup: MatTabGroup) {
        if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;
        const tabCount = tabGroup._tabs.length;
        tabGroup.selectedIndex = (tabGroup.selectedIndex + 1) % tabCount;
    }
}
