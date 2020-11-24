import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {AdminSegmentSelectComponent} from "../../../journal-voucher/admin-segment-select/admin-segment-select.component";
import {FundSegmentSelectComponent} from "../../../journal-voucher/fund-segment-select/fund-segment-select.component";
import {EconomicSegmentSelectComponent} from "../../../journal-voucher/economic-segment-select/economic-segment-select.component";
import {ProgrammingSegmentSelectComponent} from "../../../journal-voucher/programming-segment-select/programming-segment-select.component";
import {GeoCodeSegmentSelectComponent} from "../../../journal-voucher/geo-code-segment-select/geo-code-segment-select.component";
import {AdminSegmentEmployeeSelectComponent} from "../../default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component";
import {FunctionalSegmentSelectComponent} from "../../../journal-voucher/functional-segment-select/functional-segment-select.component";
import {CurrencyService} from "../../../../../shared/services/currency.service";
import {TreasureReportService} from "../../../../../shared/services/treasure-report.service";
import * as moment from "moment";
import { PaymentVoucherService } from 'app/shared/services/payment-voucher.service';

@Component({
    selector: 'app-payment-voucher-create',
    templateUrl: './payment-voucher-create.component.html',
    styleUrls: ['./payment-voucher-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PaymentVoucherCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    schedulePayeeEmployeeForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    adminSegments = [];
    dialogRef: any;
    fundSegments = [];
    economicSegments = [];
    programmeSegments = [];
    functionalSegments = [];
    geoCodeSegments = [];
    checkingOfficers = [];
    payingOfficers = [];
    financialControllers = [];
    header: any;
    sources = [];
    currencies = [];

    constructor(public matDialogRef: MatDialogRef<PaymentVoucherCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private currencyService: CurrencyService,
                private treasureReportService: TreasureReportService,
                private paymentVoucherService: PaymentVoucherService) {
        this.action = _data.action;
        this.header = _data.header;
        this.sources = _data.source;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Payment Voucher';
            if (_data.country) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = this.header + ' - Payment Voucher';
            console.log('_data', _data);
            // console.log('this.sources', this.sources);
        }
    }

    ngOnInit(): void {
        this.getCurrencies();
        // this.getVoucherSourceUnitList();
        this.refresh();
        // this.checkForUpdate();
    }

    refresh() {
        this.schedulePayeeEmployeeForm = this.fb.group({
            sourceUnit: [{value: '', disabled: true}],
            // departmentalNo: [''],
            // voucherSourceUnitId: [{value: '', disabled: true}],
            valueDate: [''],
            paymentApproveId: [{value: '', disabled: true}],
            payee: ['EMPLOYEE'],
            currencyId: [''],
            currency: [{value: '', disabled: true}],
            paymentDescription: [''],
            xRate: [''],
            xRateCurrency: [{value: '', disabled: true}],
            officialXRate: [''],
            aieId: [''],
            adminSegmentCode: [{value: '', disabled: true}],
            adminSegmentId: [''],
            fundSegmentCode: [{value: '', disabled: true}],
            fundSegmentId: [''],
            economicSegmentCode: [{value: '', disabled: true}],
            economicSegmentId: [''],
            programmeSegmentCode: [{value: '', disabled: true}],
            programSegmentId: [''],
            functionalSegmentCode: [{value: '', disabled: true}],
            functionalSegmentId: [''],
            geoCodeSegmentCode: [{value: '', disabled: true}],
            geoCodeSegmentId: [''],
            checkingOfficerId: [{value: '', disabled: true}],
            payingOfficerId: [{value: '', disabled: true}],
            financialControllerId: [{value: '', disabled: true}]
        });

        if (this.sources && this.sources.length > 0) {
            console.log('this.sources', this.sources);
            this.schedulePayeeEmployeeForm.patchValue({
                'sourceUnit': this.sources[0].value
            });
        }
    }

    getCurrencies() {
        this.currencies = [];
        this.currencyService.getCurrency({page: -1}).subscribe(data => {
            this.currencies = data.items;
        });
    }

    /*getVoucherSourceUnitList() {
        this.sources = [];
        this.treasureReportService.list({page: -1}).subscribe(data => {
            this.sources = data.items;
        });
    }*/

    /*checkForUpdate() {
        if (this.updateData) {
            this.schedulePayeeEmployeeForm.patchValue({
                name: this.updateData.country.name,
                isActive: this.updateData.country.isActive
            });
        }
    }*/

    savePayeeEmployee() {
        this.isSubmitted = true;
        if (!this.schedulePayeeEmployeeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            let params = {
                'sourceUnit': this.schedulePayeeEmployeeForm.getRawValue().sourceUnit ? this.sources[0].name : '',
                'voucherSourceUnitId': this.schedulePayeeEmployeeForm.getRawValue().sourceUnit ? this.schedulePayeeEmployeeForm.getRawValue().sourceUnit : '',
                'valueDate': moment(this.schedulePayeeEmployeeForm.getRawValue().valueDate).format('YYYY-MM-DD') ? moment(this.schedulePayeeEmployeeForm.getRawValue().valueDate).format('YYYY-MM-DD') : '',
                'paymentApproveId': this.schedulePayeeEmployeeForm.getRawValue().paymentApproveId ? this.schedulePayeeEmployeeForm.getRawValue().paymentApproveId : '',
                'currencyId': this.schedulePayeeEmployeeForm.getRawValue().currencyId ? this.schedulePayeeEmployeeForm.getRawValue().currencyId : '',
                'paymentDescription': this.schedulePayeeEmployeeForm.getRawValue().paymentDescription ? this.schedulePayeeEmployeeForm.getRawValue().paymentDescription : '',
                'xRate': this.schedulePayeeEmployeeForm.getRawValue().xRate ? this.schedulePayeeEmployeeForm.getRawValue().xRate : '',
                'officialXRate': this.schedulePayeeEmployeeForm.getRawValue().officialXRate ? this.schedulePayeeEmployeeForm.getRawValue().officialXRate : '',
                'aieId': this.schedulePayeeEmployeeForm.getRawValue().aieId ? this.schedulePayeeEmployeeForm.getRawValue().aieId : '',
                'adminSegmentId': this.schedulePayeeEmployeeForm.getRawValue().adminSegmentId ? this.schedulePayeeEmployeeForm.getRawValue().adminSegmentId : '',
                'fundSegmentId': this.schedulePayeeEmployeeForm.getRawValue().fundSegmentId ? this.schedulePayeeEmployeeForm.getRawValue().fundSegmentId : '',
                'economicSegmentId': this.schedulePayeeEmployeeForm.getRawValue().economicSegmentId ? this.schedulePayeeEmployeeForm.getRawValue().economicSegmentId : '',
                'programSegmentId': this.schedulePayeeEmployeeForm.getRawValue().programSegmentId ? this.schedulePayeeEmployeeForm.getRawValue().programSegmentId : '',
                'functionalSegmentId': this.schedulePayeeEmployeeForm.getRawValue().functionalSegmentId ? this.schedulePayeeEmployeeForm.getRawValue().functionalSegmentId : '',
                'geoCodeSegmentId': this.schedulePayeeEmployeeForm.getRawValue().geoCodeSegmentId ? this.schedulePayeeEmployeeForm.getRawValue().geoCodeSegmentId : '',
                'checkingOfficerId': this.schedulePayeeEmployeeForm.getRawValue().checkingOfficerId ? this.schedulePayeeEmployeeForm.getRawValue().checkingOfficerId : '',
                'payingOfficerId': this.schedulePayeeEmployeeForm.getRawValue().payingOfficerId ? this.schedulePayeeEmployeeForm.getRawValue().payingOfficerId : '',
                'financialControllerId': this.schedulePayeeEmployeeForm.getRawValue().financialControllerId ? this.schedulePayeeEmployeeForm.getRawValue().financialControllerId : '',
            };
            console.log('params', params);
            this.paymentVoucherService.save(params).subscribe(data => {
                this.schedulePayeeEmployeeForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updatePayeeEmployee() {
        this.isSubmitted = true;
        if (!this.schedulePayeeEmployeeForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            console.log('this.schedulePayeeEmployeeForm.value', this.schedulePayeeEmployeeForm.value);
            /*this.contactInfoService.updateCountry(this.updateData.country.id, this.schedulePayeeEmployeeForm.value).subscribe(data => {
                this.updateData = undefined;
                this.schedulePayeeEmployeeForm.reset();
                this.isSubmitted = false;
            });*/
        }
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
            this.schedulePayeeEmployeeForm.patchValue({
                adminSegmentId: response.id,
                adminSegmentCode: response.id,
                disabled: true
            });
        });
    }

    fundSegmentSelect() {
        this.dialogRef = this._matDialog.open(FundSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.fundSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.schedulePayeeEmployeeForm.patchValue({
                fundSegmentId: response.id,
                fundSegmentCode: response.id,
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
            this.schedulePayeeEmployeeForm.patchValue({
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
            this.schedulePayeeEmployeeForm.patchValue({
                programSegmentId: response.id,
                programmeSegmentCode: response.id,
                disabled: true
            });
        });
    }

    functionalSegmentSelect() {
        this.dialogRef = this._matDialog.open(FunctionalSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.functionalSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.schedulePayeeEmployeeForm.patchValue({
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
            this.schedulePayeeEmployeeForm.patchValue({
                geoCodeSegmentCode: response.id,
                geoCodeSegmentId: response.id,
                disabled: true
            });
        });
    }

    selectAdminEmployee(type) {
        let allowType: any = 'BOTH';
        let node: any = undefined;
        if (type === 'Select Checking Officer' || type === 'Select Paying Officer' || type === 'Select Financial Control') {
            allowType = 'BOTH';
        }

        this.dialogRef = this._matDialog.open(AdminSegmentEmployeeSelectComponent, {
            panelClass: 'transaction-items-form-dialog',
            data: {head: type, allow: allowType, node: node}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            if (type === 'Select Checking Officer') {
                this.checkingOfficers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    checkingOfficerId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Paying Officer') {
                this.payingOfficers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    payingOfficerId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Financial Control') {
                this.financialControllers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    financialControllerId: response['empData'].id,
                    disabled: true
                });
            }
        });
    }

    selectCurrency(event) {
        if (this.currencies && this.currencies.length > 0) {
            let currencyName = '';
            this.currencies.forEach(curr => {
                if (parseInt(curr.id) === parseInt(event.value)) {
                    currencyName = curr['singularCurrencyName'];
                }
            });
            this.schedulePayeeEmployeeForm.patchValue({
                'currency': currencyName
            });
        }
    }
}
