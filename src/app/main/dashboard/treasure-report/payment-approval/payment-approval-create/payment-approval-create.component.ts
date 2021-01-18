import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TreasureReportService} from '../../../../../shared/services/treasure-report.service';
import {DefaultSettingVoucherInfoService} from '../../../../../shared/services/default-setting-voucher-info';
import {AdminSegmentEmployeeSelectComponent} from '../../default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component';
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
    panelOpenState: boolean = false;
    tabName = 'DETAILS';
    selectedPaymentVocuherIds = [];


    checked;
    currencies = [];
    adminSegments = [];
    fundSegments = [];
    economicSegments = [];
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
                private mandateService: MandateService) {
        this.action = _data.action;
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
    }

    refresh() {
        this.paymentApprovalForm = this.fb.group({
            valueDate: [''],
            valueDateName: [{value: '', disabled: true}],
            refNumber: [''],
            checkPayingForContract: [''],
            todayDate: [''],
            order_number: [''],
            ref_number: [''],
            awarded_data: [''],
            total_amount: [''],
            other_approval: [''],
            bal_before_this: [''],
            certificate_no: [''],
            invoice_no: [''],
            details: [''],
            contractor: [''],
            employee_customer_radio: [''],
            employee_customer_id: [''],
            employee_customer_full_name: [''],
            currencyId: [''],
            currency: [''],
            amount: [''],
            amount_details: [''],
            remark: [''],
            authorizedDate: [''],
            authorizedName: [{value: '', disabled: true}],
            adminSegmentCode: [{value: '', disabled: true}],
            adminSegmentId: [''],
            fundSegmentCode: [{value: '', disabled: true}],
            fundSegmentId: [''],
            economicSegmentCode: [{value: '', disabled: true}],
            economicSegmentId: [''],

        });
    }

    // getcashbookList() {
    //     this.cashbookAccountList = [];
    //     this.cashbookService.list({}).subscribe(data => {
    //         this.cashbookAccountList = data.items;
    //     });
    // }
    //
    // cashbookItem() {
    //     let cashbookData = '';
    //     const selectedCashbookId = this.paymentApprovalForm.get('cashBookAccountId').value;
    //     if (this.cashbookAccountList && this.cashbookAccountList.length > 0) {
    //         this.cashbookAccountList.forEach(val => {
    //             if (val.id === selectedCashbookId) {
    //                 cashbookData = val;
    //             }
    //         });
    //     }
    //     this.cashbookData = cashbookData;
    // }
    //
    // checkForUpdate() {
    //     if (this.updateData) {
    //         this.paymentApprovalForm.patchValue({
    //             cashBookAccountId: this.updateData.cashbookId ? this.updateData.cashbookId : '',
    //             batchNumber: this.updateData.batchNumber ? this.updateData.batchNumber : '',
    //             treasuryNumber: this.updateData.treasuryNumber ? this.updateData.treasuryNumber : '',
    //             valueDate: this.updateData.valueDate ? moment(this.updateData.valueDate).format('YYYY-MM-DD') : '',
    //             instructionToBank: this.updateData.instructions ? this.updateData.instructions : '',
    //             preparedBy: this.updateData.prepared ? this.updateData.prepared['firstName'] + ' ' + this.updateData.prepared['lastName'] : '',
    //             preparedDate: this.updateData.preparedDate ? moment(this.updateData.preparedDate).format('YYYY-MM-DD') : '',
    //             istAuthorizedBy: this.updateData.firstAuthorisedBy ? this.updateData.firstAuthorised['firstName'] + ' ' + this.updateData.firstAuthorised['lastName'] : '',
    //             istAuthorizedDate: this.updateData.firstAuthorisedDate ? moment(this.updateData.firstAuthorisedDate).format('YYYY-MM-DD') : '',
    //             secondAuthorizedBy: this.updateData.secondAuthorised ? this.updateData.secondAuthorised['firstName'] + ' ' + this.updateData.secondAuthorised['lastName'] : '',
    //             secondAuthorizedDate: this.updateData.secondAuthorisedDate ? moment(this.updateData.secondAuthorisedDate).format('YYYY-MM-DD') : '',
    //         });
    //         // this.cashbookData = this.updateData.cashbook;
    //         // if (this.updateData['paymentVouchers'] && this.updateData['paymentVouchers'].length > 0) {
    //         //     this.updateData['paymentVouchers'].forEach(paymentVoucher => {
    //         //         if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
    //         //             this.paymentVoucherData.forEach(pv => {
    //         //                 if (parseInt(pv.id) === parseInt(paymentVoucher.id)) {
    //         //                     pv['checked'] = true;
    //         //                 }
    //         //             });
    //         //         }
    //         //     });
    //         // }
    //         /*console.log('this.paymentApprovalForm', this.paymentApprovalForm.value);
    //         console.log('this.paymentVoucherData', this.paymentVoucherData);*/
    //     }
    // }
    //
    // saveMandate() {
    //     let params = {
    //         'cashbookId': this.paymentApprovalForm.getRawValue().cashBookAccountId ? this.paymentApprovalForm.getRawValue().cashBookAccountId : '',
    //         'batchNumber': this.paymentApprovalForm.getRawValue().batchNumber ? this.paymentApprovalForm.getRawValue().batchNumber : '',
    //         'treasuryNumber': this.paymentApprovalForm.getRawValue().treasuryNumber ? this.paymentApprovalForm.getRawValue().treasuryNumber : '',
    //         'valueDate': this.paymentApprovalForm.getRawValue().valueDate ? moment(this.paymentApprovalForm.getRawValue().valueDate).format('YYYY-MM-DD') : '',
    //         'instructions': this.paymentApprovalForm.getRawValue().instructionToBank ? this.paymentApprovalForm.getRawValue().instructionToBank : '',
    //     };
    //     let paymentVouchers = [];
    //     if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
    //         this.paymentVoucherData.forEach(pv => {
    //             if (pv && pv.checked) {
    //                 paymentVouchers.push(pv.id);
    //             }
    //         });
    //     }
    //     params['paymentVouchers'] = (paymentVouchers && paymentVouchers.length > 0) ? JSON.stringify(paymentVouchers) : '';
    //
    //     this.mandateService.save(params).subscribe(data => {
    //         this.matDialogRef.close(this.paymentApprovalForm);
    //         this.paymentApprovalForm.reset();
    //     });
    // }
    //
    // updateMandate() {
    //     let params = {
    //         'cashbookId': this.paymentApprovalForm.getRawValue().cashBookAccountId ? this.paymentApprovalForm.getRawValue().cashBookAccountId : '',
    //         'batchNumber': this.paymentApprovalForm.getRawValue().batchNumber ? this.paymentApprovalForm.getRawValue().batchNumber : '',
    //         'treasuryNumber': this.paymentApprovalForm.getRawValue().treasuryNumber ? this.paymentApprovalForm.getRawValue().treasuryNumber : '',
    //         'valueDate': this.paymentApprovalForm.getRawValue().valueDate ? moment(this.paymentApprovalForm.getRawValue().valueDate).format('YYYY-MM-DD') : '',
    //         'instructions': this.paymentApprovalForm.getRawValue().instructionToBank ? this.paymentApprovalForm.getRawValue().instructionToBank : '',
    //     };
    //     let paymentVouchers = [];
    //     if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
    //         this.paymentVoucherData.forEach(pv => {
    //             if (pv && pv.checked) {
    //                 paymentVouchers.push(pv.id);
    //             }
    //         });
    //     }
    //     params['paymentVouchers'] = (paymentVouchers && paymentVouchers.length > 0) ? JSON.stringify(paymentVouchers) : '';
    //
    //     this.mandateService.update(this.updateData.id, params).subscribe(data => {
    //         this.updateData = undefined;
    //         this.matDialogRef.close(this.paymentApprovalForm);
    //         this.paymentApprovalForm.reset();
    //     });
    // }
    //
    // getChildReportData(item) {
    //     const params = {};
    //     if (item && item.id) {
    //         params['parentId'] = item.id;
    //         this.paymentVoucherService.getSchedulePayee(item.id, {page: -1}).subscribe(data => {
    //             item['payees'] = data.items;
    //         });
    //     }
    // }
    //
    // selectAdminEmployee(type) {
    //     let allowType: any = 'BOTH';
    //     let node: any = undefined;
    //     if (type === 'Select Checking Officer' || type === 'Select Paying Officer' || type === 'Select Financial Control') {
    //         allowType = 'BOTH';
    //     }
    //
    //     this.dialogRef = this._matDialog.open(AdminSegmentEmployeeSelectComponent, {
    //         panelClass: 'transaction-items-form-dialog',
    //         data: {head: type, allow: allowType, node: node}
    //     });
    //     this.dialogRef.afterClosed().subscribe((response) => {
    //         if (!response) {
    //             return;
    //         }
    //         if (type === 'Select Checking Officer') {
    //             this.checkingOfficers = [{
    //                 'name': response['empData'].firstName + ' ' + response['empData'].lastName,
    //                 'id': response['empData'].id
    //             }];
    //             this.paymentApprovalForm.patchValue({
    //                 checkingOfficerId: response['empData'].id,
    //                 disabled: true
    //             });
    //         } else if (type === 'Select Paying Officer') {
    //             this.payingOfficers = [{
    //                 'name': response['empData'].firstName + ' ' + response['empData'].lastName,
    //                 'id': response['empData'].id
    //             }];
    //             this.paymentApprovalForm.patchValue({
    //                 payingOfficerId: response['empData'].id,
    //                 disabled: true
    //             });
    //         } else if (type === 'Select Financial Control') {
    //             this.financialControllers = [{
    //                 'name': response['empData'].firstName + ' ' + response['empData'].lastName,
    //                 'id': response['empData'].id
    //             }];
    //             this.paymentApprovalForm.patchValue({
    //                 financialControllerId: response['empData'].id,
    //                 disabled: true
    //             });
    //         }
    //     });
    // }
    //
    // getPaymentVouchers(params?) {
    //     let param = {
    //         ...params,
    //         page: -1
    //     };
    //     param['status'] = 'AUDITED';
    //     this.paymentVoucherService.get(param).subscribe(data => {
    //         this.paymentVoucherData = data.items;
    //         if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
    //             this.paymentVoucherData.forEach(d => {
    //                 d['checked'] = false;
    //                 d['lastActioned'] = moment(d['updatedAt']).format('YYYY-MM-DD');
    //
    //                 if (this._data['paymentVoucherIds']) {
    //                     let paymentVoucherIds = JSON.parse(this._data['paymentVoucherIds']);
    //                     paymentVoucherIds.forEach(pvId => {
    //                         if (parseInt(d.id) === parseInt(pvId)) {
    //                             d['checked'] = true;
    //                         }
    //                     });
    //                 }
    //             });
    //             this.panelOpenState = !this.panelOpenState;
    //         }
    //         this.checkForUpdate();
    //     });
    // }
    //
    // checkPV(index, event) {
    //     this.paymentVoucherData[index].checked = event.checked;
    // }
    //
    // addPV() {
    //     let paymentVouchers = [];
    //     if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
    //         this.paymentVoucherData.forEach(pv => {
    //             if (pv && pv.checked) {
    //                 paymentVouchers.push(pv.id);
    //             }
    //         });
    //     }
    //     // console.log('paymentVouchers', paymentVouchers);
    //     this.moveToSelectedTab('CHOOSE PAYMENT VOUCHER');
    //     this.tabName = 'CHOOSE PAYMENT VOUCHER';
    // }
    //
    // tabClick(event) {
    //     this.tabName = event['tab'].textLabel;
    //     // this.addPV(event);
    // }
    //
    // moveToSelectedTab(tabName: string) {
    //     for (let i = 0; i < document.querySelectorAll('.mat-tab-label-content').length; i++) {
    //         if ((<HTMLElement> document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
    //             (<HTMLElement> document.querySelectorAll('.mat-tab-label')[i]).click();
    //         }
    //     }
    // }

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
                'name': response.name,
                'id': response.id
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
                'name': response.name,
                'id': response.id
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
                'currency': currencyName
            });
        }
    }
}
