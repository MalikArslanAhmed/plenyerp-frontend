import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TreasureReportService} from "../../../../../shared/services/treasure-report.service";
import {DefaultSettingVoucherInfoService} from "../../../../../shared/services/default-setting-voucher-info";
import {AdminSegmentEmployeeSelectComponent} from "../../default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {CashbookService} from "../../../../../shared/services/cashbook.service";
import * as moment from "moment";
import {PaymentVoucherService} from "../../../../../shared/services/payment-voucher.service";
import {AlertService} from "../../../../../shared/services/alert.service";
import {MandateService} from "../../../../../shared/services/mandate.service";

@Component({
    selector: 'app-on-mandate-create',
    templateUrl: './on-mandate-create.component.html',
    styleUrls: ['./on-mandate-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OnMandateCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    onMandateForm: FormGroup;
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
    tabName = 'CHOOSE PAYMENT VOUCHER';

    constructor(public matDialogRef: MatDialogRef<OnMandateCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private treasureReportService: TreasureReportService,
                private cashbookService: CashbookService,
                private defaultSettingVoucherInfoService: DefaultSettingVoucherInfoService,
                private paymentVoucherService: PaymentVoucherService,
                private alertService: AlertService,
                private mandateService: MandateService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Mandate';
            if (_data.voucher) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Create Mandate';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
        this.getcashbookList();
        this.getPaymentVouchers();
    }

    refresh() {
        this.onMandateForm = this.fb.group({
            cashBookAccountId: [''],
            refNumber: [''],
            batchNumber: [''],
            treasuryNumber: [''],
            // longName: [''],
            // shortName: [''],
            // nextRvIndexNumber: [''],
            valueDate: [''],
            instructionToBank: [''],
            preparedBy: [{value: '', disabled: true}],
            preparedDate: [{value: '', disabled: true}],
            istAuthorizedBy: [{value: '', disabled: true}],
            istAuthorizedDate: [{value: '', disabled: true}],
            secondAuthorizedBy: [{value: '', disabled: true}],
            secondAuthorizedDate: [{value: '', disabled: true}],
            // checkingOfficerId: [{value: '', disabled: true}],
            // payingOfficerId: [{value: '', disabled: true}],
            // financialControllerId: [{value: '', disabled: true}],
            // retirementId: [''],
            // reverseVoucherId: [''],
            // revalidationId: [''],
            // taxVoucherId: [''],
            // isPersonalAdvanceUnit: [false],
        });
        this.onMandateForm.get('cashBookAccountId').valueChanges.subscribe(val => {
            this.cashbookItem();
        });
        /*this.voucherSourceUnitForm.patchValue({
            'retirementId': 11,
            'reverseVoucherId': 10,
            'revalidationId': 19
        });
        this.getDefaultSettingVoucherInfo();*/
    }

    getcashbookList() {
        this.cashbookAccountList = [];
        this.cashbookService.list({}).subscribe(data => {
            this.cashbookAccountList = data.items;
        });
    }

    cashbookItem() {
        let cashbookData = '';
        const selectedCashbookId = this.onMandateForm.get('cashBookAccountId').value;
        if (this.cashbookAccountList && this.cashbookAccountList.length > 0) {
            this.cashbookAccountList.forEach(val => {
                if (val.id === selectedCashbookId) {
                    cashbookData = val
                }
            });
        }
        this.cashbookData = cashbookData;
    }

    checkForUpdate() {
        if (this.updateData) {
            if (this.updateData.voucher.financialControllerId && this.updateData.voucher.financialController) {
                this.financialControllers = [{
                    'id': this.updateData.voucher.financialController.id,
                    'name': this.updateData.voucher.financialController.firstName + ' ' + this.updateData.voucher.financialController.lastName
                }];
            }
            if (this.updateData.voucher.payingOfficerId && this.updateData.voucher.payingOfficer) {
                this.payingOfficers = [{
                    'id': this.updateData.voucher.payingOfficer.id,
                    'name': this.updateData.voucher.payingOfficer.firstName + ' ' + this.updateData.voucher.payingOfficer.lastName
                }];
            }
            if (this.updateData.voucher.checkingOfficerId && this.updateData.voucher.checkingOfficer) {
                this.checkingOfficers = [{
                    'id': this.updateData.voucher.checkingOfficer.id,
                    'name': this.updateData.voucher.checkingOfficer.firstName + ' ' + this.updateData.voucher.checkingOfficer.lastName
                }];
            }
            this.onMandateForm.patchValue({
                longName: (this.updateData && this.updateData.voucher) ? this.updateData.voucher.longName : '',
                shortName: (this.updateData && this.updateData.voucher) ? this.updateData.voucher.shortName : '',
                nextPvIndexNumber: (this.updateData && this.updateData.voucher) ? this.updateData.voucher.nextPvIndexNumber : '',
                nextRvIndexNumber: (this.updateData && this.updateData.voucher) ? this.updateData.voucher.nextRvIndexNumber : '',
                honourCertificate: (this.updateData && this.updateData.voucher) ? this.updateData.voucher.honourCertificate : '',
                checkingOfficerId: (this.updateData && this.updateData.voucher) ? this.updateData.voucher.checkingOfficerId : '',
                payingOfficerId: (this.updateData && this.updateData.voucher) ? this.updateData.voucher.payingOfficerId : '',
                financialControllerId: (this.updateData && this.updateData.voucher) ? this.updateData.voucher.financialControllerId : '',
                retirementId: (this.updateData && this.updateData.voucher) ? this.updateData.voucher.retirementId : '',
                reverseVoucherId: (this.updateData && this.updateData.voucher) ? this.updateData.voucher.reverseVoucherId : '',
                revalidationId: (this.updateData && this.updateData.voucher) ? this.updateData.voucher.revalidationId : '',
                taxVoucherId: (this.updateData && this.updateData.voucher) ? this.updateData.voucher.taxVoucherId : '',
                isPersonalAdvanceUnit: (this.updateData && this.updateData.voucher) ? this.updateData.voucher.isPersonalAdvanceUnit : false,
            });
        }
    }

    saveMandate() {
        let params = {
            'cashbookId': this.onMandateForm.getRawValue().cashBookAccountId ? this.onMandateForm.getRawValue().cashBookAccountId : '',
            'refNumber': this.onMandateForm.getRawValue().refNumber ? this.onMandateForm.getRawValue().refNumber : '',
            'batchNumber': this.onMandateForm.getRawValue().batchNumber ? this.onMandateForm.getRawValue().batchNumber : '',
            'treasuryNumber': this.onMandateForm.getRawValue().treasuryNumber ? this.onMandateForm.getRawValue().treasuryNumber : '',
            'valueDate': this.onMandateForm.getRawValue().valueDate ? moment(this.onMandateForm.getRawValue().valueDate).format('YYYY-MM-DD') : '',
            'instructions': this.onMandateForm.getRawValue().instructionToBank ? this.onMandateForm.getRawValue().instructionToBank : '',
        };
        let paymentVouchers = [];
        if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
            this.paymentVoucherData.forEach(pv => {
                if (pv && pv.checked) {
                    paymentVouchers.push(pv.id);
                }
            });
        }
        params['paymentVouchers'] = JSON.stringify(paymentVouchers);

        if (paymentVouchers && paymentVouchers.length > 0) {
            this.mandateService.save(params).subscribe(data => {
                this.matDialogRef.close(this.onMandateForm);
                this.onMandateForm.reset();
            });
        } else {
            this.alertService.showErrors('Please choose payment vouchers to save');
        }

    }

    updateMandate() {
        if (!this.onMandateForm.valid) {
            return;
        }
        this.treasureReportService.update(this.updateData.voucher.id, this.onMandateForm.getRawValue()).subscribe(data => {
            this.updateData = undefined;
            this.matDialogRef.close(this.onMandateForm);
            this.onMandateForm.reset();
        });
    }

    getChildReportData(item) {
        const params = {};
        if (item && item.id) {
            params['parentId'] = item.id;
            this.paymentVoucherService.getSchedulePayee(item.id, {page: -1}).subscribe(data => {
                item['payees'] = data.items;
            });
        }
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
                this.onMandateForm.patchValue({
                    checkingOfficerId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Paying Officer') {
                this.payingOfficers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.onMandateForm.patchValue({
                    payingOfficerId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Financial Control') {
                this.financialControllers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.onMandateForm.patchValue({
                    financialControllerId: response['empData'].id,
                    disabled: true
                });
            }
        });
    }

    getPaymentVouchers(params?) {
        let param = {
            ...params,
            page: -1
        };
        this.paymentVoucherService.get(param).subscribe(data => {
            this.paymentVoucherData = data.items;
            if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
                this.paymentVoucherData.forEach(d => {
                    d['checked'] = false;
                    d['lastActioned'] = moment(d['updatedAt']).format('YYYY-MM-DD');
                    // this.getChildReportData(d);
                });
                this.panelOpenState = !this.panelOpenState;
            }
        });
    }

    checkPV(index, event) {
        this.paymentVoucherData[index].checked = event.checked;
    }

    addPV() {
        let paymentVouchers = [];
        if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
            this.paymentVoucherData.forEach(pv => {
                if (pv && pv.checked) {
                    paymentVouchers.push(pv.id);
                }
            });
        }
        console.log('paymentVouchers', paymentVouchers);
        if (paymentVouchers && paymentVouchers.length > 0) {
            this.moveToSelectedTab('DETAILS');
            this.tabName = 'DETAILS';
        } else {
            this.alertService.showErrors('Please choose payment vouchers to prooceed');
        }

    }

    tabClick(event) {
        this.tabName = event['tab'].textLabel;
        // this.addPV(event);
    }

    moveToSelectedTab(tabName: string) {
        for (let i = 0; i < document.querySelectorAll('.mat-tab-label-content').length; i++) {
            if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
                (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
            }
        }
    }

    /*getDefaultSettingVoucherInfo() {
        this.defaultSettingVoucherInfoService.detail().subscribe(data => {
            if (data && data.checkingOfficer && data.checkingOfficerId) {
                this.checkingOfficers = [{
                    'name': data['checkingOfficer'].firstName + ' ' + data['checkingOfficer'].lastName,
                    'id': data['checkingOfficer'].id
                }];
                this.voucherSourceUnitForm.patchValue({
                    'checkingOfficerId': data.checkingOfficerId ? data.checkingOfficerId : ''
                });
            }

            if (data && data.payingOfficer && data.payingOfficerId) {
                this.payingOfficers = [{
                    'name': data['payingOfficer'].firstName + ' ' + data['payingOfficer'].lastName,
                    'id': data['payingOfficer'].id
                }];
                this.voucherSourceUnitForm.patchValue({
                    'payingOfficerId': data.payingOfficerId ? data.payingOfficerId : ''
                });
            }

            if (data && data.financialController && data.financialControllerId) {
                this.financialControllers = [{
                    'name': data['financialController'].firstName + ' ' + data['financialController'].lastName,
                    'id': data['financialController'].id
                }];
                this.voucherSourceUnitForm.patchValue({
                    'financialControllerId': data.financialControllerId ? data.financialControllerId : '',
                });
            }
        });
    }*/
}
