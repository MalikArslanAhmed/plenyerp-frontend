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
    currencies = [
        {
            'code': 'INR',
            'name': 'Indian Currency'
        },
        {
            'code': 'NIR',
            'name': 'Niara'
        }
    ];
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

    constructor(public matDialogRef: MatDialogRef<JournalVoucherCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private globalService: GlobalService,
                private journalVoucherService: JournalVoucherService) {
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
    }

    refresh() {
        // console.log(this.globalService.getSelf());
        this.user = this.globalService.getSelf();
        this.journalVoucherCreateForm = this.fb.group({
            'jvSourceApp': [{value: 'PLINYEGL', disabled: true}],
            'batchNumber': [''],
            'jvValueDate': [''],
            'fundSegmentId': [''],
            'fundSegmentCode': [{value: '', disabled: true}],
            'preparedValueDate': [''],
            'preparedTransactionDate': [''],
            'preparedUserId': [{value: this.user.id, disabled: true}],
            'preparedUsername': [{value: this.user.name, disabled: true}],
            'checkedValueDate': [''],
            'checkedTransactionDate': [''],
            'checkedUserId': [{value: this.user.id, disabled: true}],
            'checkedUsername': [{value: this.user.name, disabled: true}],
            'postedValueDate': [''],
            'postedTransactionDate': [''],
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
            'lineValueInTrxnCurrency': [''],
            'geoCodeSegmentCode': [{value: '', disabled: true}],
            'geoCodeSegmentId': [''],
            'lineValueType': ['DEBIT'],
            'lvLineValue': ['']
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
            // console.log('response', response);
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
            'lineValueInTrxnCurrency': this.addDetailForm.value.lineValueInTrxnCurrency ? this.addDetailForm.value.lineValueInTrxnCurrency : '',
            'geoCodeSegmentId': this.addDetailForm.value.geoCodeSegmentId ? this.addDetailForm.value.geoCodeSegmentId : '',
            'lineValueType': this.addDetailForm.value.lineValueType ? this.addDetailForm.value.lineValueType : '',
            'lvLineValue': this.addDetailForm.value.lvLineValue ? this.addDetailForm.value.lvLineValue : '',
            'adminSegmentName': this.adminSegments[0].name,
            'fundSegmentName': this.fundSegmentsAddDet[0].name,
            'economicSegmentName': this.economicSegments[0].name,
            'programmeSegmentName': this.programmeSegments[0].name,
            'functionSegmentName': this.functionSegments[0].name,
            'geoCodeSegmentName': this.geoCodeSegments[0].name,
            'adminSegmentCode': this.adminSegments[0].id,
            'fundSegmentCode': this.fundSegmentsAddDet[0].id,
            'economicSegmentCode': this.economicSegments[0].id,
            'programmeSegmentCode': this.programmeSegments[0].id,
            'functionSegmentCode': this.functionSegments[0].id,
            'geoCodeSegmentCode': this.geoCodeSegments[0].id
        };
        this.jvDetail.push(params);
        this.addDetails = false;
        this.addDetailForm.reset();
        // console.log('jv', this.jvDetail);
    }

    saveJournalVoucher() {
        const params = {
            'jvSourceApp': this.journalVoucherCreateForm.value.jvSourceApp ? this.journalVoucherCreateForm.value.jvSourceApp : '',
            'batchNumber': this.journalVoucherCreateForm.value.batchNumber ? this.journalVoucherCreateForm.value.batchNumber : '',
            'jvValueDate': this.journalVoucherCreateForm.value.jvValueDate ? moment(this.journalVoucherCreateForm.value.jvValueDate).format('YYYY-MM-DD') : '',
            'fundSegmentId': this.journalVoucherCreateForm.value.fundSegmentId ? this.journalVoucherCreateForm.value.fundSegmentId : '',
            'fundSegmentCode': this.journalVoucherCreateForm.value.fundSegmentCode ? this.journalVoucherCreateForm.value.fundSegmentCode : '',
            'preparedValueDate': this.journalVoucherCreateForm.value.preparedValueDate ? moment(this.journalVoucherCreateForm.value.preparedValueDate).format('YYYY-MM-DD') : '',
            'preparedTransactionDate': this.journalVoucherCreateForm.value.preparedTransactionDate ? moment(this.journalVoucherCreateForm.value.preparedTransactionDate).format('YYYY-MM-DD') : '',
            'preparedUserId': this.journalVoucherCreateForm.value.preparedUserId ? this.journalVoucherCreateForm.value.preparedUserId : '',
            'preparedUsername': this.journalVoucherCreateForm.value.preparedUsername ? this.journalVoucherCreateForm.value.preparedUsername : '',
            'checkedValueDate': this.journalVoucherCreateForm.value.checkedValueDate ? moment(this.journalVoucherCreateForm.value.checkedValueDate).format('YYYY-MM-DD') : '',
            'checkedTransactionDate': this.journalVoucherCreateForm.value.checkedTransactionDate ? moment(this.journalVoucherCreateForm.value.checkedTransactionDate).format('YYYY-MM-DD') : '',
            'checkedUserId': this.journalVoucherCreateForm.value.checkedUserId ? this.journalVoucherCreateForm.value.checkedUserId : '',
            'checkedUsername': this.journalVoucherCreateForm.value.checkedUsername ? this.journalVoucherCreateForm.value.checkedUsername : '',
            'postedValueDate': this.journalVoucherCreateForm.value.postedValueDate ? moment(this.journalVoucherCreateForm.value.postedValueDate).format('YYYY-MM-DD') : '',
            'postedTransactionDate': this.journalVoucherCreateForm.value.postedTransactionDate ? moment(this.journalVoucherCreateForm.value.postedTransactionDate).format('YYYY-MM-DD') : '',
            'postedUserId': this.journalVoucherCreateForm.value.postedUserId ? this.journalVoucherCreateForm.value.postedUserId : '',
            'postedUsername': this.journalVoucherCreateForm.value.postedUsername ? this.journalVoucherCreateForm.value.postedUsername : '',
            'jvReference': this.journalVoucherCreateForm.value.jvReference ? this.journalVoucherCreateForm.value.jvReference : '',
            'transactionDetails': this.journalVoucherCreateForm.value.transactionDetails ? this.journalVoucherCreateForm.value.transactionDetails : '',
            'fundSegmentName': this.journalVoucherCreateForm.value.fundSegmentName ? this.journalVoucherCreateForm.value.fundSegmentName : '',
            'jvDetail': this.jvDetail
        };
        // console.log('this.journalVoucherCreateForm', params);
        this.isSubmitted = true;
        if (!this.journalVoucherCreateForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.journalVoucherService.create(params).subscribe(data => {
                // console.log('data', data);
                this.journalVoucherCreateForm.reset();
                this.isSubmitted = false;
                this.matDialogRef.close();
            });
        }
    }
}
