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
import {JournalVoucherService} from "../../../../shared/services/journal-voucher.service";
import {BalanceAmountModelComponent} from "../balance-amount-model/balance-amount-model.component";
import {AlertService} from "../../../../shared/services/alert.service";
import {CurrencyService} from "../../../../shared/services/currency.service";
import {CompanyInformationService} from "../../../../shared/services/company-information.service";

@Component({
    selector: 'app-journal-voucher-detail-create',
    templateUrl: './journal-voucher-detail-create.component.html',
    styleUrls: ['./journal-voucher-detail-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class JournalVoucherDetailCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    addDetailForm: FormGroup;
    isSubmitted = false;
    updateData: any;
    currencies = [];
    dialogRef: any;
    fundSegmentsAddDet = [];
    adminSegments = [];
    economicSegments = [];
    programmeSegments = [];
    functionSegments = [];
    geoCodeSegments = [];
    jvDetail = [];
    user: any;
    journalVoucherId: any;
    localCurrency: any;
    internationalCurrency: any;

    constructor(public matDialogRef: MatDialogRef<JournalVoucherDetailCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private globalService: GlobalService,
                private journalVoucherService: JournalVoucherService,
                private alertService: AlertService,
                private currencyService: CurrencyService,
                private companyInformationService: CompanyInformationService) {
        this.action = _data.action;
        this.journalVoucherId = _data.journalVoucherId;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit New Journal Voucher Detail';
            if (_data.jvDetail) {
                this.updateData = _data.jvDetail;
            }
        } else {
            this.dialogTitle = 'Create New Journal Voucher Detail';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getCurrencies();
        this.getCompanySetting();
    }

    refresh() {
        this.user = this.globalService.getSelf();
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

        if (this.updateData) {
            this.patchJvDetailForm();
        }
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

    patchJvDetailForm() {
        if (this.updateData && this.updateData.adminSegment) {
            this.adminSegments = [this.updateData.adminSegment];
        }

        if (this.updateData && this.updateData.fundSegment) {
            this.fundSegmentsAddDet = [this.updateData.fundSegment];
        }

        if (this.updateData && this.updateData.economicSegment) {
            this.economicSegments = [this.updateData.economicSegment];
        }

        if (this.updateData && this.updateData.programmeSegment) {
            this.programmeSegments = [this.updateData.programmeSegment]
        }

        if (this.updateData && this.updateData.functionalSegment) {
            this.functionSegments = [this.updateData.functionalSegment]
        }

        if (this.updateData && this.updateData.geoCodeSegment) {
            this.geoCodeSegments = [this.updateData.geoCodeSegment]
        }

        this.addDetailForm.patchValue({
            'lineValue': (this.updateData && this.updateData.lineValue) ? this.updateData.lineValue : '',
            'adminSegmentCode': (this.updateData && this.updateData.adminSegment) ? this.updateData.adminSegment.id : '',
            'adminSegmentId': (this.updateData && this.updateData.adminSegment) ? this.updateData.adminSegment.id : '',
            'currency': (this.updateData && this.updateData.currency) ? this.updateData.currency : '',
            'fundSegmentCode': (this.updateData && this.updateData.fundSegment) ? this.updateData.fundSegment.id : '',
            'fundSegmentId': (this.updateData && this.updateData.fundSegment) ? this.updateData.fundSegment.id : '',
            'xRateLocal': (this.updateData && this.updateData.xRateLocal) ? this.updateData.xRateLocal : '',
            'bankXRateToUsd': (this.updateData && this.updateData.bankXRateToUsd) ? this.updateData.bankXRateToUsd : '',
            'economicSegmentCode': (this.updateData && this.updateData.economicSegment) ? this.updateData.economicSegment.id : '',
            'economicSegmentId': (this.updateData && this.updateData.economicSegment) ? this.updateData.economicSegment.id : '',
            'accountName': (this.updateData && this.updateData.accountName) ? this.updateData.accountName : '',
            'programmeSegmentCode': (this.updateData && this.updateData.programmeSegment) ? this.updateData.programmeSegment.id : '',
            'programmeSegmentId': (this.updateData && this.updateData.programmeSegment) ? this.updateData.programmeSegment.id : '',
            'lineReference': (this.updateData && this.updateData.lineReference) ? this.updateData.lineReference : '',
            'functionalSegmentCode': (this.updateData && this.updateData.functionalSegment) ? this.updateData.functionalSegment.id : '',
            'functionalSegmentId': (this.updateData && this.updateData.functionalSegment) ? this.updateData.functionalSegment.id : '',
            'geoCodeSegmentCode': (this.updateData && this.updateData.geoCodeSegment) ? this.updateData.geoCodeSegment.id : '',
            'geoCodeSegmentId': (this.updateData && this.updateData.geoCodeSegment) ? this.updateData.geoCodeSegment.id : '',
            'lineValueType': (this.updateData && this.updateData.lineValueType) ? this.updateData.lineValueType : '',
            'lvLineValue': (this.updateData && this.updateData.lvLineValue) ? this.updateData.lvLineValue : '',
            'localCurrency': this.updateData.localCurrency ? this.updateData.localCurrency : ''
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

    addDetail() {
        const params = {
            'lineValue': this.addDetailForm.value.lineValue ? this.addDetailForm.value.lineValue : '',
            'adminSegmentId': this.addDetailForm.value.adminSegmentId ? this.addDetailForm.value.adminSegmentId : '',
            'currency': this.addDetailForm.value.currency ? this.addDetailForm.value.currency : '',
            'fundSegmentId': this.addDetailForm.value.fundSegmentId ? this.addDetailForm.value.fundSegmentId : '',
            'xRateLocal': this.addDetailForm.value.xRateLocal ? parseFloat(this.addDetailForm.value.xRateLocal) : 0,
            'bankXRateToUsd': this.addDetailForm.value.bankXRateToUsd ? parseFloat(this.addDetailForm.value.bankXRateToUsd) : 0,
            'economicSegmentId': this.addDetailForm.value.economicSegmentId ? this.addDetailForm.value.economicSegmentId : '',
            'accountName': this.addDetailForm.value.accountName ? this.addDetailForm.value.accountName : '',
            'programmeSegmentId': this.addDetailForm.value.programmeSegmentId ? this.addDetailForm.value.programmeSegmentId : '',
            'lineReference': this.addDetailForm.value.lineReference ? this.addDetailForm.value.lineReference : '',
            'functionalSegmentCode': this.addDetailForm.value.functionalSegmentCode ? this.addDetailForm.value.functionalSegmentCode : '',
            'functionalSegmentId': this.addDetailForm.value.functionalSegmentId ? this.addDetailForm.value.functionalSegmentId : '',
            'geoCodeSegmentId': this.addDetailForm.value.geoCodeSegmentId ? this.addDetailForm.value.geoCodeSegmentId : '',
            'lineValueType': this.addDetailForm.value.lineValueType ? this.addDetailForm.value.lineValueType : '',
            'lvLineValue': this.addDetailForm.getRawValue().lvLineValue ? this.addDetailForm.getRawValue().lvLineValue : '',
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
            'geoCodeSegmentCode': this.geoCodeSegments[0] && this.geoCodeSegments[0].id ? this.geoCodeSegments[0].id : ''
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

        this.journalVoucherService.addDetails(this.journalVoucherId, params).subscribe(data => {
            this.addDetailForm.reset();
            this.isSubmitted = false;
            this.adminSegments = [];
            this.fundSegmentsAddDet = [];
            this.economicSegments = [];
            this.programmeSegments = [];
            this.functionSegments = [];
            this.geoCodeSegments = [];
            this.matDialogRef.close(this.addDetailForm);
        });
    }

    addLineValue() {
        if (this.addDetailForm.value.xRateLocal && this.addDetailForm.value.lineValue) {
            let value = parseFloat(this.addDetailForm.value.lineValue) * parseFloat(this.addDetailForm.value.xRateLocal);
            let lvArr = value.toString().split('.');
            if (lvArr && lvArr[1]) {
                this.addDetailForm.patchValue({
                    'lvLineValue': lvArr[0] + '.' + lvArr[1].substring(0, 2)
                });
            } else {
                this.addDetailForm.patchValue({
                    'lvLineValue': lvArr[0]
                });
            }
        }
    }

    updateDetail() {
        this.isSubmitted = true;
        if (!this.addDetailForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
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

            this.journalVoucherService.updateDetails(this.journalVoucherId, this.updateData.id, params).subscribe(data => {
                this.addDetailForm.reset();
                this.isSubmitted = false;
                this.adminSegments = [];
                this.fundSegmentsAddDet = [];
                this.economicSegments = [];
                this.programmeSegments = [];
                this.functionSegments = [];
                this.geoCodeSegments = [];
                this.matDialogRef.close(this.addDetailForm);
            });
        }
    }

    getCompanySetting() {
        this.companyInformationService.getCompanySetting().subscribe(data => {
            // console.log('data', data);
            this.localCurrency = data['items'][0].local['pluralCurrencyName'];
            this.internationalCurrency = data['items'][0].international['pluralCurrencyName'];
        })
    }
}
