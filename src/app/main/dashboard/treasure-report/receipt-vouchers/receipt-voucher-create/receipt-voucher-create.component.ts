import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CurrencyService} from '../../../../../shared/services/currency.service';
import {TreasureReportService} from '../../../../../shared/services/treasure-report.service';
import {DefaultSettingVoucherInfoService} from '../../../../../shared/services/default-setting-voucher-info';
import {AlertService} from '../../../../../shared/services/alert.service';
import * as moment from 'moment';
import {AdminSegmentSelectComponent} from '../../../journal-voucher/admin-segment-select/admin-segment-select.component';
import {FundSegmentSelectComponent} from '../../../journal-voucher/fund-segment-select/fund-segment-select.component';
import {EconomicSegmentSelectComponent} from '../../../journal-voucher/economic-segment-select/economic-segment-select.component';
import {ProgrammingSegmentSelectComponent} from '../../../journal-voucher/programming-segment-select/programming-segment-select.component';
import {FunctionalSegmentSelectComponent} from '../../../journal-voucher/functional-segment-select/functional-segment-select.component';
import {GeoCodeSegmentSelectComponent} from '../../../journal-voucher/geo-code-segment-select/geo-code-segment-select.component';
import {AdminSegmentEmployeeSelectComponent} from '../../default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ReceiptVoucherService} from '../../../../../shared/services/receipt-voucher.service';
import {CashbookService} from '../../../../../shared/services/cashbook.service';
import {GlobalService} from "../../../../../shared/services/global.service";

@Component({
    selector: 'app-receipt-voucher-create',
    templateUrl: './receipt-voucher-create.component.html',
    styleUrls: ['./receipt-voucher-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ReceiptVoucherCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    receiptVoucherCreateForm: FormGroup;
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
    receivingOfficers = [];
    payingOfficers = [];
    financialControllers = [];
    header: any;
    sources = [];
    currencies = [];
    aies = [];
    cashbookAccountList = [];
    cashbookData: any;
    currentDate: any = moment(new Date()).format('YYYY-MM-DD');
    user: any;
    type: any;
    updatedData: any;

    constructor(public matDialogRef: MatDialogRef<ReceiptVoucherCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private currencyService: CurrencyService,
                private treasureReportService: TreasureReportService,
                private receiptVoucherService: ReceiptVoucherService,
                private cashbookService: CashbookService,
                private defaultSettingVoucherInfoService: DefaultSettingVoucherInfoService,
                private alertService: AlertService,
                private globalService: GlobalService) {
        if (_data.action === 'EDIT') {
            this.header = _data['item']['types'].name;
            this.type = _data['item'].type;
            this.sources = [{
                'name': _data['item']['voucherSourceUnit'].id + ' - ' + _data['item']['voucherSourceUnit'].longName,
                'value': _data['item']['voucherSourceUnit'].id
            }];
            this.updatedData = _data['item'];
        } else {
            this.header = _data.header;
            this.type = _data.type;
            this.sources = _data.source;
        }
        this.dialogTitle = this.header + ' - Receipt Voucher';
    }

    ngOnInit(): void {
        this.getcashbookList();
        this.getCurrencies();
        this.refresh();
        if (this.updatedData) {
            this.patchForm();
        }
    }

    refresh() {
        this.receiptVoucherCreateForm = this.fb.group({
            sourceUnit: [{value: '', disabled: true}],
            valueDate: [''],
            payee: ['EMPLOYEE'],
            paymentDescription: [''],
            xRate: [''],
            officialXRate: [''],
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
            receivingOfficerId: [{value: '', disabled: true}],
            cashbookId: [{value: '', disabled: true}],
            prepare: [{value: '', disabled: true}],
            close: [{value: '', disabled: true}],
            prepByName: [{value: '', disabled: true}],
            closeByName: [{value: '', disabled: true}],
            cashBookAccountId: [''],
            preparedDate: [{value: '', disabled: true}],
            closedDate: [{value: '', disabled: true}]
        });
        this.user = this.globalService.getSelf();

        if (this.sources && this.sources.length > 0) {
            this.receiptVoucherCreateForm.patchValue({
                'sourceUnit': this.sources[0].value
            });
        }

        this.getDefaultSettingVoucherInfo();

        this.receiptVoucherCreateForm.get('cashBookAccountId').valueChanges.subscribe(val => {
            this.cashbookItem();
        });

        this.receiptVoucherCreateForm.patchValue({
            preparedDate: this.currentDate,
            prepByName: this.user.name
        })
    }

    getCurrencies() {
        this.currencies = [];
        this.currencyService.getCurrency({page: -1}).subscribe(data => {
            this.currencies = data.items;
        });
    }

    patchForm() {
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
        this.receivingOfficers = [{
            'name': (this.updatedData && this.updatedData['receivingOfficer']) ? this.updatedData['receivingOfficer'].firstName + ' ' + this.updatedData['receivingOfficer'].lastName : '',
            'id': (this.updatedData && this.updatedData['receivingOfficer']) ? this.updatedData['receivingOfficer'].id : ''
        }];
        this.receiptVoucherCreateForm.patchValue({
            valueDate: (this.updatedData && this.updatedData['valueDate']) ? this.updatedData['valueDate'] : '',
            closedDate: (this.updatedData && this.updatedData['closedDate']) ? this.updatedData['closedDate'] : '',
            payee: (this.updatedData && this.updatedData['payee']) ? this.updatedData['payee'] : '',
            paymentDescription: (this.updatedData && this.updatedData['paymentDescription']) ? this.updatedData['paymentDescription'] : '',
            xRate: (this.updatedData && this.updatedData['xRate']) ? this.updatedData['xRate'] : '',
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
            receivingOfficerId: (this.updatedData && this.updatedData['receivingOfficerId']) ? this.updatedData['receivingOfficerId'] : '',
            cashBookAccountId: (this.updatedData && this.updatedData['cashbookId']) ? this.updatedData['cashbookId'] : ''
        });

        if (this.updatedData['cashbookId']) {
            this.cashbookAccountList = [];
            this.cashbookService.list({}).subscribe(data => {
                this.cashbookAccountList = data.items;

                let cashbookData = '';
                const selectedCashbookId = this.updatedData['cashbookId'];
                if (this.cashbookAccountList && this.cashbookAccountList.length > 0) {
                    this.cashbookAccountList.forEach(val => {
                        if (val.id === selectedCashbookId) {
                            cashbookData = val
                        }
                    });
                }
                this.cashbookData = cashbookData;
            });
        }
    }

    savePayeeEmployee() {
        this.isSubmitted = true;
        if (!this.receiptVoucherCreateForm.getRawValue().sourceUnit) {
            this.alertService.showErrors('Please Fill Source unit');
            this.isSubmitted = false;
            return;
        }

        if (!this.receiptVoucherCreateForm.getRawValue().valueDate) {
            this.alertService.showErrors('Please Fill Value Date');
            this.isSubmitted = false;
            return;
        }

        if (!this.receiptVoucherCreateForm.getRawValue().paymentDescription) {
            this.alertService.showErrors('Please Fill Being Payer For');
            this.isSubmitted = false;
            return;
        }

        if (!this.receiptVoucherCreateForm.getRawValue().xRate) {
            this.alertService.showErrors('Please Fill X Rate');
            this.isSubmitted = false;
            return;
        }

        if (!this.receiptVoucherCreateForm.getRawValue().officialXRate) {
            this.alertService.showErrors('Please Fill Official X Rate International');
            this.isSubmitted = false;
            return;
        }
        if (!this.receiptVoucherCreateForm.getRawValue().adminSegmentId) {
            this.alertService.showErrors('Please Fill Admin Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.receiptVoucherCreateForm.getRawValue().fundSegmentId) {
            this.alertService.showErrors('Please Fill Fund Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.receiptVoucherCreateForm.getRawValue().economicSegmentId) {
            this.alertService.showErrors('Please Fill Economic Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.receiptVoucherCreateForm.getRawValue().programSegmentId) {
            this.alertService.showErrors('Please Fill Programme Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.receiptVoucherCreateForm.getRawValue().functionalSegmentId) {
            this.alertService.showErrors('Please Fill Functional Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.receiptVoucherCreateForm.getRawValue().geoCodeSegmentId) {
            this.alertService.showErrors('Please Fill Geo Code Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.receiptVoucherCreateForm.getRawValue().receivingOfficerId) {
            this.alertService.showErrors('Please Fill Checking Officer');
            this.isSubmitted = false;
            return;
        }

        if (!this.receiptVoucherCreateForm.getRawValue().cashBookAccountId) {
            this.alertService.showErrors('Please Fill Cashbook Account');
            this.isSubmitted = false;
            return;
        }
        if (!this.receiptVoucherCreateForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            let params = {
                'sourceDepartment': this.receiptVoucherCreateForm.getRawValue().sourceUnit ? this.sources[0].name : '',
                'voucherSourceUnitId': this.receiptVoucherCreateForm.getRawValue().sourceUnit ? this.receiptVoucherCreateForm.getRawValue().sourceUnit : '',
                'valueDate': moment(this.receiptVoucherCreateForm.getRawValue().valueDate).format('YYYY-MM-DD') ? moment(this.receiptVoucherCreateForm.getRawValue().valueDate).format('YYYY-MM-DD') : '',
                'payee': this.receiptVoucherCreateForm.getRawValue().payee ? this.receiptVoucherCreateForm.getRawValue().payee : '',
                'type': this.type ? this.type : '',
                'paymentDescription': this.receiptVoucherCreateForm.getRawValue().paymentDescription ? this.receiptVoucherCreateForm.getRawValue().paymentDescription : '',
                'xRate': this.receiptVoucherCreateForm.getRawValue().xRate ? this.receiptVoucherCreateForm.getRawValue().xRate : '',
                'officialXRate': this.receiptVoucherCreateForm.getRawValue().officialXRate ? this.receiptVoucherCreateForm.getRawValue().officialXRate : '',
                'adminSegmentId': this.receiptVoucherCreateForm.getRawValue().adminSegmentId ? this.receiptVoucherCreateForm.getRawValue().adminSegmentId : '',
                'fundSegmentId': this.receiptVoucherCreateForm.getRawValue().fundSegmentId ? this.receiptVoucherCreateForm.getRawValue().fundSegmentId : '',
                'economicSegmentId': this.receiptVoucherCreateForm.getRawValue().economicSegmentId ? this.receiptVoucherCreateForm.getRawValue().economicSegmentId : '',
                'programSegmentId': this.receiptVoucherCreateForm.getRawValue().programSegmentId ? this.receiptVoucherCreateForm.getRawValue().programSegmentId : '',
                'functionalSegmentId': this.receiptVoucherCreateForm.getRawValue().functionalSegmentId ? this.receiptVoucherCreateForm.getRawValue().functionalSegmentId : '',
                'geoCodeSegmentId': this.receiptVoucherCreateForm.getRawValue().geoCodeSegmentId ? this.receiptVoucherCreateForm.getRawValue().geoCodeSegmentId : '',
                'receivingOfficerId': this.receiptVoucherCreateForm.getRawValue().receivingOfficerId ? this.receiptVoucherCreateForm.getRawValue().receivingOfficerId : '',
                'cashbookId': this.receiptVoucherCreateForm.getRawValue().cashBookAccountId ? this.receiptVoucherCreateForm.getRawValue().cashBookAccountId : '',
            };
            if (!this.updatedData) {
                this.receiptVoucherService.save(params).subscribe(data => {
                    this.receiptVoucherCreateForm.reset();
                    this.isSubmitted = false;
                    this.matDialogRef.close(this.receiptVoucherCreateForm);
                });
            } else {
                this.receiptVoucherService.update(this.updatedData.id, params).subscribe(data => {
                    this.receiptVoucherCreateForm.reset();
                    this.isSubmitted = false;
                    this.matDialogRef.close(this.receiptVoucherCreateForm);
                });
            }
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
            this.receiptVoucherCreateForm.patchValue({
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
            this.receiptVoucherCreateForm.patchValue({
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
            this.receiptVoucherCreateForm.patchValue({
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
            this.receiptVoucherCreateForm.patchValue({
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
            this.receiptVoucherCreateForm.patchValue({
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
            this.receiptVoucherCreateForm.patchValue({
                geoCodeSegmentCode: response.id,
                geoCodeSegmentId: response.id,
                disabled: true
            });
        });
    }

    selectAdminEmployee(type) {
        let allowType: any = 'BOTH';
        let node: any = undefined;
        if (type === 'Select Checking Officer' || type === 'Select Paying Officer' || type === 'Select Financial Control' || type === 'Select Receiving Officer') {
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
                this.receiptVoucherCreateForm.patchValue({
                    checkingOfficerId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Receiving Officer') {
                this.receivingOfficers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.receiptVoucherCreateForm.patchValue({
                    receivingOfficerId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Paying Officer') {
                this.payingOfficers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.receiptVoucherCreateForm.patchValue({
                    payingOfficerId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Financial Control') {
                this.financialControllers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.receiptVoucherCreateForm.patchValue({
                    financialControllerId: response['empData'].id,
                    disabled: true
                });
            }
        });
    }

    getDefaultSettingVoucherInfo() {
        this.defaultSettingVoucherInfoService.detail().subscribe(data => {
            if (data && data.adminSegment && data.adminSegmentId) {
                this.adminSegments = [{
                    'name': data['adminSegment'].name,
                    'id': data['adminSegment'].id
                }];
                this.receiptVoucherCreateForm.patchValue({
                    'adminSegmentCode': data.adminSegmentId,
                    'adminSegmentId': data.adminSegmentId,
                });
            }
            if (data && data.fundSegment && data.fundSegmentId) {
                this.fundSegments = [{
                    'name': data['fundSegment'].name,
                    'id': data['fundSegment'].id
                }];
                this.receiptVoucherCreateForm.patchValue({
                    'fundSegmentCode': data.fundSegmentId,
                    'fundSegmentId': data.fundSegmentId,
                });
            }
            if (data && data.fundSegment && data.fundSegmentId) {
                this.fundSegments = [{
                    'name': data['fundSegment'].name,
                    'id': data['fundSegment'].id
                }];
                this.receiptVoucherCreateForm.patchValue({
                    'fundSegmentCode': data.fundSegmentId,
                    'fundSegmentId': data.fundSegmentId,
                });
            }
            if (data && data.fundSegment && data.economicSegmentId) {
                this.economicSegments = [{
                    'name': data['economicSegment'].name,
                    'id': data['economicSegment'].id
                }];
                this.receiptVoucherCreateForm.patchValue({
                    'economicSegmentCode': data.economicSegmentId,
                    'economicSegmentId': data.economicSegmentId,
                });
            }
            if (data && data.programSegment && data.programSegmentId) {
                this.programmeSegments = [{
                    'name': data['programSegment'].name,
                    'id': data['programSegment'].id
                }];
                this.receiptVoucherCreateForm.patchValue({
                    'programmeSegmentCode': data.programSegmentId,
                    'programSegmentId': data.programSegmentId,
                });
            }
            if (data && data.functionalSegment && data.functionalSegmentId) {
                this.functionalSegments = [{
                    'name': data['functionalSegment'].name,
                    'id': data['functionalSegment'].id
                }];
                this.receiptVoucherCreateForm.patchValue({
                    'functionalSegmentCode': data.functionalSegmentId,
                    'functionalSegmentId': data.functionalSegmentId,
                });
            }
            if (data && data.geoCodeSegment && data.geoCodeSegmentId) {
                this.geoCodeSegments = [{
                    'name': data['geoCodeSegment'].name,
                    'id': data['geoCodeSegment'].id
                }];
                this.receiptVoucherCreateForm.patchValue({
                    'geoCodeSegmentCode': data.geoCodeSegmentId,
                    'geoCodeSegmentId': data.geoCodeSegmentId,
                });
            }
            if (data && data.checkingOfficer && data.checkingOfficerId) {
                this.checkingOfficers = [{
                    'name': data['checkingOfficer'].firstName + ' ' + data['checkingOfficer'].lastName,
                    'id': data['checkingOfficer'].id
                }];
                this.receiptVoucherCreateForm.patchValue({
                    'checkingOfficerId': data.checkingOfficerId ? data.checkingOfficerId : ''
                });
            }
            if (data && data.payingOfficer && data.payingOfficerId) {
                this.payingOfficers = [{
                    'name': data['payingOfficer'].firstName + ' ' + data['payingOfficer'].lastName,
                    'id': data['payingOfficer'].id
                }];
                this.receiptVoucherCreateForm.patchValue({
                    'payingOfficerId': data.payingOfficerId ? data.payingOfficerId : ''
                });
            }
            if (data && data.financialController && data.financialControllerId) {
                this.financialControllers = [{
                    'name': data['financialController'].firstName + ' ' + data['financialController'].lastName,
                    'id': data['financialController'].id
                }];
                this.receiptVoucherCreateForm.patchValue({
                    'financialControllerId': data.financialControllerId ? data.financialControllerId : '',
                });
            }
        });
    }

    getcashbookList() {
        this.cashbookAccountList = [];
        this.cashbookService.list({}).subscribe(data => {
            this.cashbookAccountList = data.items;
        });
    }

    cashbookItem() {
        let cashbookData = '';
        const selectedCashbookId = this.receiptVoucherCreateForm.get('cashBookAccountId').value;
        if (this.cashbookAccountList && this.cashbookAccountList.length > 0) {
            this.cashbookAccountList.forEach(val => {
                if (val.id === selectedCashbookId) {
                    cashbookData = val
                }
            });
        }
        this.cashbookData = cashbookData;
    }
}
