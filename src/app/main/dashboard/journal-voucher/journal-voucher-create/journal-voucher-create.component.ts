import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FundSegmentSelectComponent} from "../fund-segment-select/fund-segment-select.component";
import {AdminSegmentSelectComponent} from "../admin-segment-select/admin-segment-select.component";
import {EconomicSegmentSelectComponent} from "../economic-segment-select/economic-segment-select.component";
import {ProgrammingSegmentSelectComponent} from "../programming-segment-select/programming-segment-select.component";
import {FunctionalSegmentSelectComponent} from "../functional-segment-select/functional-segment-select.component";
import {GeoCodeSegmentSelectComponent} from "../geo-code-segment-select/geo-code-segment-select.component";
import {GlobalService} from 'app/shared/services/global.service';
import * as moment from "moment";
import {JournalVoucherService} from "../../../../shared/services/journal-voucher.service";
import {CurrencyService} from "../../../../shared/services/currency.service";
import {BalanceAmountModelComponent} from '../balance-amount-model/balance-amount-model.component';
import {AlertService} from "../../../../shared/services/alert.service";
import {CompanyInformationService} from "../../../../shared/services/company-information.service";

@Component({
    selector: 'app-journal-voucher-create',
    templateUrl: './journal-voucher-create.component.html',
    styleUrls: ['./journal-voucher-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class JournalVoucherCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    journalVoucherCreateForm: FormGroup;
    addDetailForm: FormGroup;
    isSubmitted = false;
    updateData: any;
    addDetails = false;
    currencies = [];
    dialogRef: any;
    fundSegments = [];
    fundSegmentsAddDet = [];
    adminSegments = [];
    economicSegments = [];
    programmeSegments = [];
    functionSegments = [];
    geoCodeSegments = [];
    jvDetail = [];
    user: any;
    currentDate: any = moment(new Date()).format('YYYY-MM-DD');
    localCurrency: any;
    internationalCurrency: any;

    constructor(public matDialogRef: MatDialogRef<JournalVoucherCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private globalService: GlobalService,
                private journalVoucherService: JournalVoucherService,
                private currencyService: CurrencyService,
                private alertService: AlertService,
                private companyInformationService: CompanyInformationService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit New Journal Voucher';
            if (_data.designation) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Create New Journal Voucher';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getCurrencies();
        this.getCompanySetting();
    }

    refresh() {
        this.user = this.globalService.getSelf();
        this.journalVoucherCreateForm = this.fb.group({
            'jvSourceApp': [{value: 'PLINYEGL', disabled: true}],
            'batchNumber': [''],
            'jvValueDate': [''],
            'fundSegmentId': [''],
            'fundSegmentCode': [{value: '', disabled: true}],
            'preparedValueDate': [''],
            'preparedTransactionDate': [{value: this.currentDate, disabled: true}],
            'preparedUserId': [{value: this.user.id, disabled: true}],
            'preparedUsername': [{value: this.user.name, disabled: true}],
            'checkedValueDate': [''],
            'checkedTransactionDate': [{value: this.currentDate, disabled: true}],
            'checkedUserId': [{value: this.user.id, disabled: true}],
            'checkedUsername': [{value: this.user.name, disabled: true}],
            'postedValueDate': [''],
            'postedTransactionDate': [{value: this.currentDate, disabled: true}],
            'postedUserId': [{value: this.user.id, disabled: true}],
            'postedUsername': [{value: this.user.name, disabled: true}],
            'jvReference': [''],
            'transactionDetails': [''],
            'fundSegmentName': ['']
        });

        this.addDetailForm = this.fb.group({
            'lineValue': [''],
            'adminSegmentCode': [{value: '', disabled: true}],
            'adminSegmentId': [''],
            'currency': [''],
            'fundSegmentCode': [{value: '', disabled: true}],
            'fundSegmentId': [''],
            'xRateLocal': [''],
            'bankXRateToUsd': [''],
            'economicSegmentCode': [{value: '', disabled: true}],
            'economicSegmentId': [''],
            'accountName': [''],
            'programmeSegmentCode': [{value: '', disabled: true}],
            'programmeSegmentId': [''],
            'lineReference': [''],
            'functionalSegmentCode': [{value: '', disabled: true}],
            'functionalSegmentId': [''],
            'geoCodeSegmentCode': [{value: '', disabled: true}],
            'geoCodeSegmentId': [''],
            'lineValueType': ['DEBIT'],
            'lvLineValue': [{value: '', disabled: true}]
        });
    }

    getCurrencies() {
        this.currencies = [];
        this.currencyService.getCurrency({page: -1}).subscribe(data => {
            this.currencies = data.items;
            if (this.currencies && this.currencies.length > 0) {
                let i = 1;
                this.currencies.forEach(currency => {
                    currency['sno'] = i;
                    i++;
                });
            }
        });
    }

    fundSegmentSelect() {
        this.dialogRef = this._matDialog.open(FundSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            // console.log('response', response);
            if (!response) {
                return;
            }
            this.fundSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.journalVoucherCreateForm.patchValue({
                fundSegmentId: response.id,
                fundSegmentCode: response.id,
                disabled: true
            });
        });
    }

    fundSegmentSelectAddDetails() {
        this.dialogRef = this._matDialog.open(FundSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.fundSegmentsAddDet = [{
                'name': response.name,
                'id': response.id
            }];
            this.addDetailForm.patchValue({
                fundSegmentId: response.id,
                fundSegmentCode: response.id,
                disabled: true
            });
        });
    }

    adminSegmentSelect() {
        this.dialogRef = this._matDialog.open(AdminSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            // console.log('response', response);
            if (!response) {
                return;
            }
            this.adminSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.addDetailForm.patchValue({
                adminSegmentId: response.id,
                adminSegmentCode: response.id,
                disabled: true
            });
        });
    }

    economicSegmentSelect() {
        this.dialogRef = this._matDialog.open(EconomicSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            // console.log('response', response);
            if (!response) {
                return;
            }
            this.economicSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.addDetailForm.patchValue({
                economicSegmentId: response.id,
                economicSegmentCode: response.id,
                disabled: true
            });
        });
    }

    programmeSegmentSelect() {
        this.dialogRef = this._matDialog.open(ProgrammingSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            // console.log('response', response);
            if (!response) {
                return;
            }
            this.programmeSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.addDetailForm.patchValue({
                programmeSegmentId: response.id,
                programmeSegmentCode: response.id,
                disabled: true
            });
        });
    }

    functionSegmentSelect() {
        this.dialogRef = this._matDialog.open(FunctionalSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            // console.log('response', response);
            if (!response) {
                return;
            }
            this.functionSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.addDetailForm.patchValue({
                functionalSegmentId: response.id,
                functionalSegmentCode: response.id,
                disabled: true
            });
        });
    }

    geoCodeSegmentSelect() {
        this.dialogRef = this._matDialog.open(GeoCodeSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            // console.log('response', response);
            if (!response) {
                return;
            }
            this.geoCodeSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.addDetailForm.patchValue({
                geoCodeSegmentId: response.id,
                geoCodeSegmentCode: response.id,
                disabled: true
            });
        });
    }

    addLineValue() {
        if (this.addDetailForm.value.xRateLocal && this.addDetailForm.value.lineValue) {
            let value = parseFloat(this.addDetailForm.value.lineValue) * parseFloat(this.addDetailForm.value.xRateLocal);
            let lvArr = value.toString().split('.');
            this.addDetailForm.patchValue({
                'lvLineValue': lvArr[0] + '.' + lvArr[1].substring(0, 2)
            });
        }
    }

    addDetail() {
        let rawData = this.addDetailForm.getRawValue();
        const params = {
            'lineValue': rawData.lineValue ? rawData.lineValue : '',
            'adminSegmentId': rawData.adminSegmentId ? rawData.adminSegmentId : '',
            'currency': rawData.currency ? rawData.currency : '',
            'fundSegmentId': rawData.fundSegmentId ? rawData.fundSegmentId : '',
            'xRateLocal': rawData.xRateLocal ? parseFloat(rawData.xRateLocal) : 0,
            'bankXRateToUsd': rawData.bankXRateToUsd ? parseFloat(rawData.bankXRateToUsd) : 0,
            'economicSegmentId': rawData.economicSegmentId ? rawData.economicSegmentId : '',
            'accountName': rawData.accountName ? rawData.accountName : '',
            'programmeSegmentId': rawData.programmeSegmentId ? rawData.programmeSegmentId : '',
            'lineReference': rawData.lineReference ? rawData.lineReference : '',
            'functionalSegmentCode': rawData.functionalSegmentCode ? rawData.functionalSegmentCode : '',
            'functionalSegmentId': rawData.functionalSegmentId ? rawData.functionalSegmentId : '',
            'geoCodeSegmentId': rawData.geoCodeSegmentId ? rawData.geoCodeSegmentId : '',
            'lineValueType': rawData.lineValueType ? rawData.lineValueType : '',
            'lvLineValue': rawData.lvLineValue ? rawData.lvLineValue : '',
            'adminSegmentName': this.adminSegments[0] && this.adminSegments[0].name ? this.adminSegments[0].name : '',
            'fundSegmentName': this.fundSegmentsAddDet[0] && this.fundSegmentsAddDet[0].name ? this.fundSegmentsAddDet[0].name : '',
            'economicSegmentName': this.economicSegments[0] && this.economicSegments[0].name ? this.economicSegments[0].name : '',
            'programmeSegmentName': this.programmeSegments[0] && this.programmeSegments[0].name ? this.programmeSegments[0].name : '',
            'functionSegmentName': this.functionSegments[0] && this.functionSegments[0].name ? this.functionSegments[0].name : '',
            'geoCodeSegmentName': this.geoCodeSegments[0] && this.geoCodeSegments[0].name ? this.geoCodeSegments[0].name : '',
            'adminSegmentCode': this.adminSegments[0] && this.adminSegments[0].id ? this.adminSegments[0].id : '',
            'fundSegmentCode': this.fundSegmentsAddDet[0] && this.fundSegmentsAddDet[0].id ? this.fundSegmentsAddDet[0].id : '',
            'economicSegmentCode': this.economicSegments[0] && this.economicSegments[0].id ? this.economicSegments[0].id : '',
            'programmeSegmentCode': this.programmeSegments[0] && this.programmeSegments[0].id ? this.programmeSegments[0].id : '',
            'functionSegmentCode': this.functionSegments[0] && this.functionSegments[0].id ? this.functionSegments[0].id : '',
            'geoCodeSegmentCode': this.geoCodeSegments[0] && this.geoCodeSegments[0].id ? this.geoCodeSegments[0].id : '',
            'localCurrency': this.localCurrency ? this.localCurrency : ''
        };

        if (params['lineValue'] === '') {
            this.alertService.showErrors('Line no. can\'t be blank');
            return;
        } else if (params['currency'] === '') {
            this.alertService.showErrors('Currency can\'t be blank');
            return;
        } else if (params['accountName'] === '') {
            this.alertService.showErrors('Account name can\'t be blank');
            return;
        } else if (params['lineReference'] === '') {
            this.alertService.showErrors('Line reference can\'t be blank');
            return;
        } else if (params['adminSegmentName'] === '') {
            this.alertService.showErrors('Admin Segment can\'t be blank');
            return;
        } else if (params['fundSegmentName'] === '') {
            this.alertService.showErrors('Fund Segment can\'t be blank');
            return;
        } else if (params['economicSegmentName'] === '') {
            this.alertService.showErrors('Economic Segment can\'t be blank');
            return;
        } else if (params['programmeSegmentName'] === '') {
            this.alertService.showErrors('Program Segment can\'t be blank');
            return;
        } else if (params['functionSegmentName'] === '') {
            this.alertService.showErrors('Function Segment can\'t be blank');
            return;
        } else if (params['geoCodeSegmentName'] === '') {
            this.alertService.showErrors('Geo Code Segment can\'t be blank');
            return;
        }

        if (this.jvDetail && this.jvDetail.length > 0) {
            let economicSegment = false;
            this.jvDetail.forEach(jvDet => {
                if (jvDet['economicSegmentCode'] === params['economicSegmentCode']) {
                    economicSegment = true;
                }
            });

            if (economicSegment) {
                this.alertService.showErrors('Economic Segment already exists');
                return;
            }
        }
        this.jvDetail.push(params);
        this.addDetails = false;
        this.addDetailForm.reset();
        this.adminSegments = [];
        this.fundSegmentsAddDet = [];
        this.economicSegments = [];
        this.programmeSegments = [];
        this.functionSegments = [];
        this.geoCodeSegments = [];
    }

    saveJournalVoucher() {
        const params = {
            'jvSourceApp': this.journalVoucherCreateForm.value.jvSourceApp ? this.journalVoucherCreateForm.value.jvSourceApp : '',
            'batchNumber': this.journalVoucherCreateForm.value.batchNumber ? this.journalVoucherCreateForm.value.batchNumber : '',
            'jvValueDate': this.journalVoucherCreateForm.value.jvValueDate ? moment(this.journalVoucherCreateForm.value.jvValueDate).format('YYYY-MM-DD') : '',
            'fundSegmentId': this.journalVoucherCreateForm.value.fundSegmentId ? this.journalVoucherCreateForm.value.fundSegmentId : '',
            'fundSegmentCode': this.journalVoucherCreateForm.value.fundSegmentCode ? this.journalVoucherCreateForm.value.fundSegmentCode : '',
            'preparedValueDate': this.journalVoucherCreateForm.value.preparedValueDate ? moment(this.journalVoucherCreateForm.value.preparedValueDate).format('YYYY-MM-DD') : '',
            'preparedTransactionDate': this.currentDate,
            'preparedUserId': this.journalVoucherCreateForm.value.preparedUserId ? this.journalVoucherCreateForm.value.preparedUserId : '',
            'preparedUsername': this.journalVoucherCreateForm.value.preparedUsername ? this.journalVoucherCreateForm.value.preparedUsername : '',
            'checkedValueDate': this.journalVoucherCreateForm.value.checkedValueDate ? moment(this.journalVoucherCreateForm.value.checkedValueDate).format('YYYY-MM-DD') : '',
            'checkedTransactionDate': this.currentDate,
            'checkedUserId': this.journalVoucherCreateForm.value.checkedUserId ? this.journalVoucherCreateForm.value.checkedUserId : '',
            'checkedUsername': this.journalVoucherCreateForm.value.checkedUsername ? this.journalVoucherCreateForm.value.checkedUsername : '',
            'postedValueDate': this.journalVoucherCreateForm.value.postedValueDate ? moment(this.journalVoucherCreateForm.value.postedValueDate).format('YYYY-MM-DD') : '',
            'postedTransactionDate': this.currentDate,
            'postedUserId': this.journalVoucherCreateForm.value.postedUserId ? this.journalVoucherCreateForm.value.postedUserId : '',
            'postedUsername': this.journalVoucherCreateForm.value.postedUsername ? this.journalVoucherCreateForm.value.postedUsername : '',
            'jvReference': this.journalVoucherCreateForm.value.jvReference ? this.journalVoucherCreateForm.value.jvReference : '',
            'transactionDetails': this.journalVoucherCreateForm.value.transactionDetails ? this.journalVoucherCreateForm.value.transactionDetails : '',
            'fundSegmentName': this.journalVoucherCreateForm.value.fundSegmentName ? this.journalVoucherCreateForm.value.fundSegmentName : '',
            'jvDetail': this.jvDetail.length > 0 ? this.jvDetail : []
        };
        // console.log('this.journalVoucherCreateForm', params);
        this.isSubmitted = true;

        if (this.jvDetail && this.jvDetail.length > 1) {
            let creditSum: number;
            let debitSum: number;
            let creditVals = [];
            let debitVals = [];
            this.jvDetail.forEach((value) => {
                if (value.lineValueType === 'CREDIT') {
                    creditVals.push(parseInt(value.lvLineValue));
                } else if (value.lineValueType === 'DEBIT') {
                    debitVals.push(parseInt(value.lvLineValue));
                }
            });
            creditSum = creditVals.reduce((a, b) => a + b, 0);
            debitSum = debitVals.reduce((a, b) => a + b, 0);

            if (creditSum !== debitSum) {
                this.dialogRef = this._matDialog.open(BalanceAmountModelComponent, {
                    panelClass: 'delete-items-dialog',
                    data: {data: '1'}
                });
                this.dialogRef.afterClosed().subscribe((response: boolean) => {
                    if (response) {
                        if (!this.journalVoucherCreateForm.valid) {
                            this.isSubmitted = false;
                            return;
                        }
                        if (this.isSubmitted) {
                            this.journalVoucherService.create(params).subscribe(data => {
                                // console.log('data', data);
                                this.journalVoucherCreateForm.reset();
                                this.isSubmitted = false;
                                this.matDialogRef.close(this.journalVoucherCreateForm);
                            });
                        }
                    }
                });
            } else {
                if (!this.journalVoucherCreateForm.valid) {
                    this.isSubmitted = false;
                    return;
                }
                if (this.isSubmitted) {
                    this.journalVoucherService.create(params).subscribe(data => {
                        // console.log('data', data);
                        this.journalVoucherCreateForm.reset();
                        this.isSubmitted = false;
                        this.matDialogRef.close(this.journalVoucherCreateForm);
                    });
                }
            }
        } else {
            this.journalVoucherService.create(params).subscribe(data => {
                // console.log('data', data);
                this.journalVoucherCreateForm.reset();
                this.isSubmitted = false;
                this.matDialogRef.close(this.journalVoucherCreateForm);
            });
        }
    }

    getCompanySetting() {
        this.companyInformationService.getCompanySetting().subscribe(data => {
            this.localCurrency = data['items'][0].localCurrency;
            this.internationalCurrency = data['items'][0].internationalCurrency;
        })
    }
}
