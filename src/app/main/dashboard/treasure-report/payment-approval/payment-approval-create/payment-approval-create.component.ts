import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TreasureReportService} from '../../../../../shared/services/treasure-report.service';
import {DefaultSettingVoucherInfoService} from '../../../../../shared/services/default-setting-voucher-info';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {CashbookService} from '../../../../../shared/services/cashbook.service';
import * as moment from 'moment';
import {PaymentVoucherService} from '../../../../../shared/services/payment-voucher.service';
import {AlertService} from '../../../../../shared/services/alert.service';
import {MandateService} from '../../../../../shared/services/mandate.service';
import {CurrencyService} from '../../../../../shared/services/currency.service';
import {AdminSegmentSelectComponent} from '../../../journal-voucher/admin-segment-select/admin-segment-select.component';
import {FundSegmentSelectComponent} from '../../../journal-voucher/fund-segment-select/fund-segment-select.component';
import {EconomicSegmentSelectComponent} from '../../../journal-voucher/economic-segment-select/economic-segment-select.component';
import {PaymentApprovalService} from '../../../../../shared/services/payment-approval.service';
import {GlobalService} from '../../../../../shared/services/global.service';

@Component({
    selector: 'app-payment-approval-create',
    templateUrl: './payment-approval-create.component.html',
    styleUrls: ['./payment-approval-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PaymentApprovalCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    paymentApprovalForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    checkingOfficers = [];
    payingOfficers = [];
    financialControllers = [];
    cashbookAccountList = [];
    dialogRef: any;
    cashbookData: any;
    paymentVoucherData = [];
    panelOpenState = false;
    currentDate: any = moment(new Date()).format('YYYY-MM-DD');
    tabName = 'DETAILS';
    selectedPaymentVocuherIds = [];
    checked;
    currencies = [];
    adminSegments = [];
    fundSegments = [];
    economicSegments = [];
    user: any;

    constructor(public matDialogRef: MatDialogRef<PaymentApprovalCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private treasureReportService: TreasureReportService,
                private cashbookService: CashbookService,
                private defaultSettingVoucherInfoService: DefaultSettingVoucherInfoService,
                private paymentVoucherService: PaymentVoucherService,
                private alertService: AlertService,
                private currencyService: CurrencyService,
                private paymentApprovalService: PaymentApprovalService,
                private globalService: GlobalService,
                private mandateService: MandateService) {
        this.action = _data.action;
        this.user = this.globalService.getSelf();
        // console.log('_data', _data);
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Payment Approval';
            if (_data.report) {
                this.updateData = _data.report;
            }
        } else {
            this.dialogTitle = 'Payment Approval';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getCurrencies();
        this.checkForUpdate();
    }

    refresh(): void {
        this.paymentApprovalForm = this.fb.group({
            valueDate: [''],
            valueDateName: [{value: '', disabled: true}],
            refNumber: [''],
            employeeCustomer: [''],
            currencyId: [''],
            currency: [{value: '', disabled: true}],
            remark: [''],
            authorisedDate: [{value: '', disabled: true}],
            authorisedName: [{value: '', disabled: true}],
            adminSegmentCode: [{value: '', disabled: true}],
            adminSegmentId: [''],
            fundSegmentCode: [{value: '', disabled: true}],
            fundSegmentId: [''],
            economicSegmentCode: [{value: '', disabled: true}],
            economicSegmentId: [''],
        });
        // console.log('this.user', this.user['name']);
        this.paymentApprovalForm.patchValue({
            // valueDate: this.currentDate,
            valueDateName: this.user.name
        });
    }

    checkForUpdate(): void {
        if (this.updateData) {
            this.adminSegments = [{
                name: (this.updateData && this.updateData['adminSegment']) ? this.updateData['adminSegment'].name : '',
                id: (this.updateData && this.updateData['adminSegment']) ? this.updateData['adminSegment'].id : '',
            }];
            this.economicSegments = [{
                name: (this.updateData && ['economicSegment']) ? this.updateData['economicSegment'].name : '',
                id: (this.updateData && ['economicSegment']) ? this.updateData['economicSegment'].id : ''
            }];
            this.fundSegments = [{
                name: (this.updateData && ['fundSegment']) ? this.updateData['fundSegment'].name : '',
                id: (this.updateData && ['fundSegment']) ? this.updateData['fundSegment'].id : ''
            }];
            this.paymentApprovalForm.patchValue({
                employeeCustomer: (this.updateData && this.updateData.employeeCustomer) ? this.updateData.employeeCustomer : '',
                currencyId: (this.updateData && this.updateData.currencyId) ? this.updateData.currencyId : '',
                currency: (this.updateData && this.updateData.currency['singularCurrencyName']) ? this.updateData.currency['singularCurrencyName'] : '',
                adminSegmentId: (this.updateData && this.updateData['adminSegmentId']) ? this.updateData['adminSegmentId'] : '',
                adminSegmentCode: (this.updateData && this.updateData['adminSegment']) ? this.updateData['adminSegmentId'].id : '',
                fundSegmentId: (this.updateData && this.updateData['fundSegmentId']) ? this.updateData['fundSegmentId'] : '',
                fundSegmentCode: (this.updateData && this.updateData['fundSegment']) ? this.updateData['fundSegment'].id : '',
                economicSegmentId: (this.updateData && this.updateData['economicSegmentId']) ? this.updateData['economicSegmentId'] : '',
                economicSegmentCode: (this.updateData && this.updateData['economicSegment']) ? this.updateData['economicSegment'].id : '',
                remark: (this.updateData && this.updateData['remark']) ? this.updateData['remark'] : '',
                authorisedDate: (this.updateData && this.updateData['authorisedDate']) ? this.updateData['authorisedDate'] : '',
                authorisedName: (this.updateData && this.updateData['authorisedBy'] && this.updateData['authorisedBy'].name) ? this.updateData['authorisedBy'].name : '',
            });
            this.cashbookData = this.updateData.cashbook;
        }
    }

    adminSegmentSelect(): void {
        this.dialogRef = this._matDialog.open(AdminSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.adminSegments = [{
                name: response.name,
                id: response.id
            }];
            this.paymentApprovalForm.patchValue({
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
                name: response.name,
                id: response.id
            }];
            this.paymentApprovalForm.patchValue({
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
                name: response.name,
                id: response.id
            }];
            this.paymentApprovalForm.patchValue({
                economicSegmentId: response.id,
                economicSegmentCode: response.id,
                disabled: true
            });
        });
    }


    getCurrencies() {
        this.currencies = [];
        this.currencyService.getCurrency({page: -1}).subscribe(data => {
            this.currencies = data.items;
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
            this.paymentApprovalForm.patchValue({
                currency: currencyName
            });
        }
    }

    savePaymentApproval() {
        const params = {
            adminSegmentId: this.paymentApprovalForm.getRawValue().adminSegmentId ? this.paymentApprovalForm.getRawValue().adminSegmentId : '',
            fundSegmentId: this.paymentApprovalForm.getRawValue().fundSegmentId ? this.paymentApprovalForm.getRawValue().fundSegmentId : '',
            economicSegmentId: this.paymentApprovalForm.getRawValue().economicSegmentId ? this.paymentApprovalForm.getRawValue().economicSegmentId : '',
            currencyId: this.paymentApprovalForm.getRawValue().currencyId ? this.paymentApprovalForm.getRawValue().currencyId : '',
            valueDate: this.paymentApprovalForm.getRawValue().valueDate ? this.paymentApprovalForm.getRawValue().valueDate : '',
            valueDateName: this.paymentApprovalForm.getRawValue().valueDateName ? this.paymentApprovalForm.getRawValue().valueDateName : '',
            authorisedDate: this.paymentApprovalForm.getRawValue().authorisedDate ? this.paymentApprovalForm.getRawValue().authorisedDate : '',
            authorisedName: this.paymentApprovalForm.getRawValue().authorisedName ? this.paymentApprovalForm.getRawValue().authorisedName : '',
            employeeCustomer: this.paymentApprovalForm.getRawValue().employeeCustomer ? this.paymentApprovalForm.getRawValue().employeeCustomer : '',
            remark: this.paymentApprovalForm.getRawValue().remark ? this.paymentApprovalForm.getRawValue().remark : '',
        };

        if (!this.updateData) {
            this.paymentApprovalService.save(params).subscribe(data => {
                this.matDialogRef.close(this.paymentApprovalForm);
                this.paymentApprovalForm.reset();
            });
        } else {
            this.paymentApprovalService.updatePaymentApproval(this.updateData.id, params).subscribe(data => {
                this.matDialogRef.close(this.paymentApprovalForm);
                this.paymentApprovalForm.reset();
            });
        }
    }
}
