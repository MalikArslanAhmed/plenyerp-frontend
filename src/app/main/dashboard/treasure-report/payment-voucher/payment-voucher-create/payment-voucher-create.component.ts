import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {AdminSegmentSelectComponent} from '../../../journal-voucher/admin-segment-select/admin-segment-select.component';
import {FundSegmentSelectComponent} from '../../../journal-voucher/fund-segment-select/fund-segment-select.component';
import {EconomicSegmentSelectComponent} from '../../../journal-voucher/economic-segment-select/economic-segment-select.component';
import {ProgrammingSegmentSelectComponent} from '../../../journal-voucher/programming-segment-select/programming-segment-select.component';
import {GeoCodeSegmentSelectComponent} from '../../../journal-voucher/geo-code-segment-select/geo-code-segment-select.component';
import {AdminSegmentEmployeeSelectComponent} from '../../default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component';
import {FunctionalSegmentSelectComponent} from '../../../journal-voucher/functional-segment-select/functional-segment-select.component';
import {CurrencyService} from '../../../../../shared/services/currency.service';
import {TreasureReportService} from '../../../../../shared/services/treasure-report.service';
import * as moment from 'moment';
import {PaymentVoucherService} from 'app/shared/services/payment-voucher.service';
import {DefaultSettingVoucherInfoService} from '../../../../../shared/services/default-setting-voucher-info';
import {AlertService} from '../../../../../shared/services/alert.service';
import {SelectAieComponent} from '../select-aie/select-aie.component';
import {PaymentApprovalService} from "../../../../../shared/services/payment-approval.service";
import {CompanyInformationService} from "../../../../../shared/services/company-information.service";
import {MatTabGroup} from "@angular/material/tabs";

@Component({
    selector: 'app-payment-voucher-create',
    templateUrl: './payment-voucher-create.component.html',
    styleUrls: ['./payment-voucher-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PaymentVoucherCreateComponent implements OnInit {
    dialogTitle: any;
    schedulePayeeEmployeeForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
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
    paymentApprovals = [];
    currencies = [];
    aies = [];
    sourceType;
    isPaymentApproval: any = false;
    paymentApprovalSelected: any;
    tab = 'CREATE PV FORM';
    updatedData: any;
    currentDate: any = moment(new Date()).format('YYYY-MM-DD');

    constructor(public matDialogRef: MatDialogRef<PaymentVoucherCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private currencyService: CurrencyService,
                private treasureReportService: TreasureReportService,
                private paymentVoucherService: PaymentVoucherService,
                private defaultSettingVoucherInfoService: DefaultSettingVoucherInfoService,
                private alertService: AlertService,
                private paymentApprovalService: PaymentApprovalService,
                private companyInformationService: CompanyInformationService) {
        if (_data.action === 'EDIT') {
            this.header = _data['item']['types'].name;
            this.sourceType = _data['item'].type;
            this.sources = [{
                'name': _data['item']['voucherSourceUnit'].id + ' - ' + _data['item']['voucherSourceUnit'].longName,
                'value': _data['item']['voucherSourceUnit'].id,
                'isPersonalAdvanceUnit': _data['item']['voucherSourceUnit'].isPersonalAdvanceUnit
            }];
            this.updatedData = _data['item'];
        } else {
            this.header = _data.header;
            this.sourceType = _data.type;
            this.sources = _data.source;
        }
        this.dialogTitle = this.header + ' - Payment Voucher';
    }

    ngOnInit(): void {
        this.getCompanySetting();
        this.getCurrencies();
        this.getPaymentApproval({'inUse': 1});
        this.refresh();
        if (this.updatedData) {
            this.patchForm();
        }
    }

    refresh() {
        this.schedulePayeeEmployeeForm = this.fb.group({
            sourceUnit: [{value: '', disabled: true}],
            valueDate: [''],
            paymentApprovalId: [''],
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
            this.schedulePayeeEmployeeForm.patchValue({
                'sourceUnit': this.sources[0].value
            });
        }

        this.getDefaultSettingVoucherInfo();
    }

    getCurrencies() {
        this.currencies = [];
        this.currencyService.getCurrency({page: -1}).subscribe(data => {
            this.currencies = data.items;
        });
    }

    getPaymentApproval(data) {
        this.paymentApprovals = [];
        this.paymentApprovalService.list({page: -1, ...data}).subscribe(data => {
            this.paymentApprovals = data.items;
        });
    }

    getCompanySetting() {
        this.companyInformationService.getCompanySetting().subscribe(data => {
            if (data.items && data.items.length > 0) {
                this.isPaymentApproval = data.items[0].isPaymentApproval;
            }
        })
    }

    patchForm() {
        this.isPaymentApproval = (this.updatedData && this.updatedData['isPaymentApproval']) ? this.updatedData['isPaymentApproval'] : false;

        this.aies = [{
            id: (this.updatedData && this.updatedData['aie']) ? this.updatedData['aie'].id : '',
            name: (this.updatedData && this.updatedData['aie']) ? this.updatedData['aie'].aieNumber : ''
        }];
        this.adminSegments = [{
            'name': (this.updatedData && this.updatedData['adminSegment']) ? this.updatedData['adminSegment'].name : '',
            'id': (this.updatedData && this.updatedData['adminSegment']) ? this.updatedData['adminSegment'].id : '',
        }];
        this.economicSegments = [{
            'name': (this.updatedData && ['economicSegment']) ? this.updatedData['economicSegment'].name : '',
            'id': (this.updatedData && ['economicSegment']) ? this.updatedData['economicSegment'].id : ''
        }];
        this.fundSegments = [{
            'name': (this.updatedData && ['fundSegment']) ? this.updatedData['fundSegment'].name : '',
            'id': (this.updatedData && ['fundSegment']) ? this.updatedData['fundSegment'].id : ''
        }];
        this.checkingOfficers = [{
            'name': (this.updatedData && this.updatedData['checkingOfficer']) ? this.updatedData['checkingOfficer'].firstName + ' ' + this.updatedData['checkingOfficer'].lastName : '',
            'id': (this.updatedData && this.updatedData['checkingOfficer']) ? this.updatedData['checkingOfficer'].id : ''
        }];
        this.payingOfficers = [{
            'name': (this.updatedData && this.updatedData['payingOfficer']) ? this.updatedData['payingOfficer'].firstName + ' ' + this.updatedData['payingOfficer'].lastName : '',
            'id': (this.updatedData && this.updatedData['payingOfficer']) ? this.updatedData['payingOfficer'].id : ''
        }];
        this.financialControllers = [{
            'name': (this.updatedData && this.updatedData['financialController']) ? this.updatedData['financialController'].firstName + ' ' + this.updatedData['financialController'].lastName : '',
            'id': (this.updatedData && this.updatedData['financialController']) ? this.updatedData['financialController'].id : ''
        }];
        this.schedulePayeeEmployeeForm.patchValue({
            valueDate: (this.updatedData && this.updatedData['valueDate']) ? this.updatedData['valueDate'] : '',
            paymentApprovalId: (this.updatedData && this.updatedData['paymentApproveId'] && this.isPaymentApproval) ? this.updatedData['paymentApproveId'] : '',
            payee: (this.updatedData && this.updatedData['payee']) ? this.updatedData['payee'] : '',
            currencyId: (this.updatedData && this.updatedData['currencyId']) ? this.updatedData['currencyId'] : '',
            currency: (this.updatedData && this.updatedData['currency']) ? this.updatedData['currency'].singularCurrencyName : '',
            paymentDescription: (this.updatedData && this.updatedData['paymentDescription']) ? this.updatedData['paymentDescription'] : '',
            xRate: (this.updatedData && this.updatedData['xRate']) ? this.updatedData['xRate'] : '',
            xRateCurrency: (this.updatedData && this.updatedData['xRate'] && this.updatedData['currency'].singularCurrencyName) ? this.updatedData['xRate'] + ' ' + this.updatedData['currency'].singularCurrencyName : '',
            officialXRate: (this.updatedData && this.updatedData['officialXRate']) ? this.updatedData['officialXRate'] : '',
            aieId: (this.updatedData && this.updatedData['aieId']) ? this.updatedData['aieId'] : '',
            adminSegmentId: (this.updatedData && this.updatedData['adminSegmentId']) ? this.updatedData['adminSegmentId'] : '',
            adminSegmentCode: (this.updatedData && this.updatedData['adminSegment']) ? this.updatedData['adminSegmentId'].id : '',
            fundSegmentId: (this.updatedData && this.updatedData['fundSegmentId']) ? this.updatedData['fundSegmentId'] : '',
            fundSegmentCode: (this.updatedData && this.updatedData['fundSegment']) ? this.updatedData['fundSegment'].id : '',
            economicSegmentId: (this.updatedData && this.updatedData['economicSegmentId']) ? this.updatedData['economicSegmentId'] : '',
            economicSegmentCode: (this.updatedData && this.updatedData['economicSegment']) ? this.updatedData['economicSegment'].id : '',
            programSegmentId: (this.updatedData && this.updatedData['programSegmentId']) ? this.updatedData['programSegmentId'] : '',
            programmeSegmentCode: (this.updatedData && this.updatedData['programmeSegment']) ? this.updatedData['programmeSegment'].id : '',
            functionalSegmentId: (this.updatedData && this.updatedData['functionalSegmentId']) ? this.updatedData['functionalSegmentId'] : '',
            functionalSegmentCode: (this.updatedData && this.updatedData['functionalSegment']) ? this.updatedData['functionalSegment'].id : '',
            geoCodeSegmentId: (this.updatedData && this.updatedData['geoCodeSegmentId']) ? this.updatedData['geoCodeSegmentId'] : '',
            geoCodeSegmentCode: (this.updatedData && this.updatedData['geoCodeSegment']) ? this.updatedData['geoCodeSegment'].id : '',
            checkingOfficerId: (this.updatedData && this.updatedData['checkingOfficerId']) ? this.updatedData['checkingOfficerId'] : '',
            payingOfficerId: (this.updatedData && this.updatedData['payingOfficerId']) ? this.updatedData['payingOfficerId'] : '',
            financialControllerId: (this.updatedData && this.updatedData['financialControllerId']) ? this.updatedData['financialControllerId'] : '',
        });

        if (this.isPaymentApproval) {
            this.schedulePayeeEmployeeForm.controls['valueDate'].disable();
            this.schedulePayeeEmployeeForm.controls['payee'].disable();
            this.schedulePayeeEmployeeForm.controls['currency'].disable();
            this.schedulePayeeEmployeeForm.controls['currencyId'].disable();
            this.schedulePayeeEmployeeForm.controls['adminSegmentId'].disable();
            this.schedulePayeeEmployeeForm.controls['economicSegmentId'].disable();
            this.schedulePayeeEmployeeForm.controls['fundSegmentId'].disable();
            this.paymentApprovalSelected = (this.updatedData && this.updatedData['paymentApproval']) ? this.updatedData['paymentApproval'] : '';
        }
    }

    savePaymentVoucher() {
        this.isSubmitted = true;
        if (!this.schedulePayeeEmployeeForm.getRawValue().sourceUnit) {
            this.alertService.showErrors('Please Fill Source unit');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().valueDate) {
            this.alertService.showErrors('Please Fill Value Date');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().payee) {
            this.alertService.showErrors('Please Fill Payee');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().paymentApprovalId) {
            this.alertService.showErrors('Please Choose Payment Approval Id');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().currencyId) {
            this.alertService.showErrors('Please Fill Currency');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().paymentDescription) {
            this.alertService.showErrors('Please Fill Being Payed For');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().xRate) {
            this.alertService.showErrors('Please Fill X Rate');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().officialXRate) {
            this.alertService.showErrors('Please Fill Official X Rate International');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().aieId) {
            this.alertService.showErrors('Please Fill AIE No.');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().adminSegmentId) {
            this.alertService.showErrors('Please Fill Admin Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().fundSegmentId) {
            this.alertService.showErrors('Please Fill Fund Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().economicSegmentId) {
            this.alertService.showErrors('Please Fill Economic Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().programSegmentId) {
            this.alertService.showErrors('Please Fill Programme Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().functionalSegmentId) {
            this.alertService.showErrors('Please Fill Functional Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().geoCodeSegmentId) {
            this.alertService.showErrors('Please Fill Geo Code Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().checkingOfficerId) {
            this.alertService.showErrors('Please Fill Checking Officer');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().payingOfficerId) {
            this.alertService.showErrors('Please Fill Paying Officer');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().financialControllerId) {
            this.alertService.showErrors('Please Fill Financial Controller');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            let params = {
                'sourceUnit': this.schedulePayeeEmployeeForm.getRawValue().sourceUnit ? this.sources[0].name : '',
                'voucherSourceUnitId': this.schedulePayeeEmployeeForm.getRawValue().sourceUnit ? this.schedulePayeeEmployeeForm.getRawValue().sourceUnit : '',
                'valueDate': moment(this.schedulePayeeEmployeeForm.getRawValue().valueDate).format('YYYY-MM-DD') ? moment(this.schedulePayeeEmployeeForm.getRawValue().valueDate).format('YYYY-MM-DD') : '',
                'paymentApproveId': this.schedulePayeeEmployeeForm.getRawValue().paymentApprovalId ? this.schedulePayeeEmployeeForm.getRawValue().paymentApprovalId : '',
                'payee': this.schedulePayeeEmployeeForm.getRawValue().payee ? this.schedulePayeeEmployeeForm.getRawValue().payee : '',
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
            params['type'] = this.sourceType;
            if (this.paymentApprovalSelected && this.paymentApprovalSelected['paymentApprovalPayees']) {
                let payeeIds = [];
                this.paymentApprovalSelected['paymentApprovalPayees'].forEach(pA => {
                    if (pA['checked']) {
                        payeeIds.push({
                            'id': pA.id,
                            'amount': pA.amount
                        });
                    }
                });
                params['payees'] = payeeIds;
            }
            if (!this.updatedData) {
                this.paymentVoucherService.save(params).subscribe(data => {
                    this.schedulePayeeEmployeeForm.reset();
                    this.isSubmitted = false;
                    this.matDialogRef.close(this.schedulePayeeEmployeeForm);
                });
            } else {
                this.paymentVoucherService.update(this.updatedData.id, params).subscribe(data => {
                    this.schedulePayeeEmployeeForm.reset();
                    this.isSubmitted = false;
                    this.matDialogRef.close(this.schedulePayeeEmployeeForm);
                });
            }
        }
    }

    savePayeeEmployee() {
        this.isSubmitted = true;
        if (!this.schedulePayeeEmployeeForm.getRawValue().sourceUnit) {
            this.alertService.showErrors('Please Fill Source unit');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().valueDate) {
            this.alertService.showErrors('Please Fill Value Date');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().payee) {
            this.alertService.showErrors('Please Fill Payee');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().currencyId) {
            this.alertService.showErrors('Please Fill Currency');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().paymentDescription) {
            this.alertService.showErrors('Please Fill Being Payed For');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().xRate) {
            this.alertService.showErrors('Please Fill X Rate');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().officialXRate) {
            this.alertService.showErrors('Please Fill Official X Rate International');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().aieId) {
            this.alertService.showErrors('Please Fill AIE No.');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().adminSegmentId) {
            this.alertService.showErrors('Please Fill Admin Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().fundSegmentId) {
            this.alertService.showErrors('Please Fill Fund Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().economicSegmentId) {
            this.alertService.showErrors('Please Fill Economic Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().programSegmentId) {
            this.alertService.showErrors('Please Fill Programme Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().functionalSegmentId) {
            this.alertService.showErrors('Please Fill Functional Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().geoCodeSegmentId) {
            this.alertService.showErrors('Please Fill Geo Code Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().checkingOfficerId) {
            this.alertService.showErrors('Please Fill Checking Officer');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().payingOfficerId) {
            this.alertService.showErrors('Please Fill Paying Officer');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.getRawValue().financialControllerId) {
            this.alertService.showErrors('Please Fill Financial Controller');
            this.isSubmitted = false;
            return;
        }

        if (!this.schedulePayeeEmployeeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            let params = {
                'sourceUnit': this.schedulePayeeEmployeeForm.getRawValue().sourceUnit ? this.sources[0].name : '',
                'voucherSourceUnitId': this.schedulePayeeEmployeeForm.getRawValue().sourceUnit ? this.schedulePayeeEmployeeForm.getRawValue().sourceUnit : '',
                'valueDate': moment(this.schedulePayeeEmployeeForm.getRawValue().valueDate).format('YYYY-MM-DD') ? moment(this.schedulePayeeEmployeeForm.getRawValue().valueDate).format('YYYY-MM-DD') : '',
                'payee': this.schedulePayeeEmployeeForm.getRawValue().payee ? this.schedulePayeeEmployeeForm.getRawValue().payee : '',
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
            params['type'] = this.sourceType;
            this.paymentVoucherService.save(params).subscribe(data => {
                this.schedulePayeeEmployeeForm.reset();
                this.isSubmitted = false;
                this.matDialogRef.close(this.schedulePayeeEmployeeForm);
            });
        }
    }

    adminSegmentSelect() {
        if (this.isPaymentApproval) {
            return;
        }
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
        if (this.isPaymentApproval) {
            return;
        }
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
        if (this.isPaymentApproval) {
            return;
        }
        this.dialogRef = this._matDialog.open(EconomicSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                allowAssetOnly: (this.sourceType === 'PERSONAL_ADVANCES_VOUCHER')
            }
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

    selectPaymentApproval(event) {
        if (this.paymentApprovals && this.paymentApprovals.length > 0) {
            let paymentApproval = {};
            this.paymentApprovals.forEach(pA => {
                if (parseInt(pA.id) === parseInt(event.value)) {
                    paymentApproval = pA;
                }
            });
            this.paymentApprovalSelected = paymentApproval;
            if (paymentApproval) {
                this.adminSegments = [{
                    'name': paymentApproval['adminSegment'].name,
                    'id': paymentApproval['adminSegment'].id
                }];
                this.economicSegments = [{
                    'name': paymentApproval['economicSegment'].name,
                    'id': paymentApproval['economicSegment'].id
                }];
                this.fundSegments = [{
                    'name': paymentApproval['fundSegment'].name,
                    'id': paymentApproval['fundSegment'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    adminSegmentId: paymentApproval['adminSegment'].id,
                    adminSegmentCode: paymentApproval['adminSegment'].id,
                    disabled: true
                });
                this.schedulePayeeEmployeeForm.patchValue({
                    economicSegmentId: paymentApproval['economicSegment'].id,
                    economicSegmentCode: paymentApproval['economicSegment'].id,
                    disabled: true
                });
                this.schedulePayeeEmployeeForm.patchValue({
                    fundSegmentId: paymentApproval['fundSegment'].id,
                    fundSegmentCode: paymentApproval['fundSegment'].id,
                    disabled: true
                });
                this.schedulePayeeEmployeeForm.patchValue({
                    'payee': (paymentApproval && paymentApproval['employeeCustomer']) ? paymentApproval['employeeCustomer'] : '',
                    'currencyId': (paymentApproval && paymentApproval['currencyId'] ? paymentApproval['currencyId'] : ''),
                    'currency': (paymentApproval && paymentApproval['currency'] && paymentApproval['currency']['singularCurrencyName'] ? paymentApproval['currency']['singularCurrencyName'] : ''),
                    'valueDate': (paymentApproval && this.currentDate) ? moment(this.currentDate).format('YYYY-MM-DD') : '',
                });
                this.schedulePayeeEmployeeForm.controls['valueDate'].disable();
                this.schedulePayeeEmployeeForm.controls['payee'].disable();
                this.schedulePayeeEmployeeForm.controls['currency'].disable();
                this.schedulePayeeEmployeeForm.controls['currencyId'].disable();
                this.schedulePayeeEmployeeForm.controls['adminSegmentId'].disable();
                this.schedulePayeeEmployeeForm.controls['economicSegmentId'].disable();
                this.schedulePayeeEmployeeForm.controls['fundSegmentId'].disable();
            }
        }
    }

    getDefaultSettingVoucherInfo() {
        this.defaultSettingVoucherInfoService.detail().subscribe(data => {
            if (data && data.adminSegment && data.adminSegmentId) {
                this.adminSegments = [{
                    'name': data['adminSegment'].name,
                    'id': data['adminSegment'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    'adminSegmentCode': data.adminSegmentId,
                    'adminSegmentId': data.adminSegmentId,
                });
            }
            if (data && data.fundSegment && data.fundSegmentId) {
                this.fundSegments = [{
                    'name': data['fundSegment'].name,
                    'id': data['fundSegment'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    'fundSegmentCode': data.fundSegmentId,
                    'fundSegmentId': data.fundSegmentId,
                });
            }
            if (data && data.fundSegment && data.fundSegmentId) {
                this.fundSegments = [{
                    'name': data['fundSegment'].name,
                    'id': data['fundSegment'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    'fundSegmentCode': data.fundSegmentId,
                    'fundSegmentId': data.fundSegmentId,
                });
            }
            if (data && data.fundSegment && data.economicSegmentId) {
                this.economicSegments = [{
                    'name': data['economicSegment'].name,
                    'id': data['economicSegment'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    'economicSegmentCode': data.economicSegmentId,
                    'economicSegmentId': data.economicSegmentId,
                });
            }
            if (data && data.programSegment && data.programSegmentId) {
                this.programmeSegments = [{
                    'name': data['programSegment'].name,
                    'id': data['programSegment'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    'programmeSegmentCode': data.programSegmentId,
                    'programSegmentId': data.programSegmentId,
                });
            }
            if (data && data.functionalSegment && data.functionalSegmentId) {
                this.functionalSegments = [{
                    'name': data['functionalSegment'].name,
                    'id': data['functionalSegment'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    'functionalSegmentCode': data.functionalSegmentId,
                    'functionalSegmentId': data.functionalSegmentId,
                });
            }
            if (data && data.geoCodeSegment && data.geoCodeSegmentId) {
                this.geoCodeSegments = [{
                    'name': data['geoCodeSegment'].name,
                    'id': data['geoCodeSegment'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    'geoCodeSegmentCode': data.geoCodeSegmentId,
                    'geoCodeSegmentId': data.geoCodeSegmentId,
                });
            }
            if (data && data.checkingOfficer && data.checkingOfficerId) {
                this.checkingOfficers = [{
                    'name': data['checkingOfficer'].firstName + ' ' + data['checkingOfficer'].lastName,
                    'id': data['checkingOfficer'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    'checkingOfficerId': data.checkingOfficerId ? data.checkingOfficerId : ''
                });
            }
            if (data && data.payingOfficer && data.payingOfficerId) {
                this.payingOfficers = [{
                    'name': data['payingOfficer'].firstName + ' ' + data['payingOfficer'].lastName,
                    'id': data['payingOfficer'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    'payingOfficerId': data.payingOfficerId ? data.payingOfficerId : ''
                });
            }
            if (data && data.financialController && data.financialControllerId) {
                this.financialControllers = [{
                    'name': data['financialController'].firstName + ' ' + data['financialController'].lastName,
                    'id': data['financialController'].id
                }];
                this.schedulePayeeEmployeeForm.patchValue({
                    'financialControllerId': data.financialControllerId ? data.financialControllerId : '',
                });
            }
        });
    }

    setXRate() {
        if (this.schedulePayeeEmployeeForm.value && this.schedulePayeeEmployeeForm.value.xRate && this.schedulePayeeEmployeeForm.value && this.schedulePayeeEmployeeForm.getRawValue().currency) {
            this.schedulePayeeEmployeeForm.patchValue({
                'xRateCurrency': this.schedulePayeeEmployeeForm.value.xRate + ' ' + this.schedulePayeeEmployeeForm.getRawValue().currency,
            });
        } else if (!this.schedulePayeeEmployeeForm.getRawValue().currency) {
            this.alertService.showErrors('Please fill Currency');
        } else if (!this.schedulePayeeEmployeeForm.value.xRate) {
            this.alertService.showErrors('Please fill X Rate');
        }
    }

    aieSegmentSelect() {
        this.dialogRef = this._matDialog.open(SelectAieComponent, {
            panelClass: 'transaction-items-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.aies = [{
                id: response.id,
                name: response.aieNumber,
            }];
            this.schedulePayeeEmployeeForm.patchValue({
                'aieId': response.id
            });
        });
    }

    tabChange(event) {
        this.tab = event['tab'].textLabel;
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