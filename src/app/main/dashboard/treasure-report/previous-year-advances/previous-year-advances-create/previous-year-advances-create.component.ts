import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from "moment";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CurrencyService} from "../../../../../shared/services/currency.service";
import {TreasureReportService} from "../../../../../shared/services/treasure-report.service";
import {CashbookService} from "../../../../../shared/services/cashbook.service";
import {DefaultSettingVoucherInfoService} from "../../../../../shared/services/default-setting-voucher-info";
import {AlertService} from "../../../../../shared/services/alert.service";
import {GlobalService} from "../../../../../shared/services/global.service";
import {AdminSegmentSelectComponent} from "../../../journal-voucher/admin-segment-select/admin-segment-select.component";
import {FundSegmentSelectComponent} from "../../../journal-voucher/fund-segment-select/fund-segment-select.component";
import {EconomicSegmentSelectComponent} from "../../../journal-voucher/economic-segment-select/economic-segment-select.component";
import {ProgrammingSegmentSelectComponent} from "../../../journal-voucher/programming-segment-select/programming-segment-select.component";
import {FunctionalSegmentSelectComponent} from "../../../journal-voucher/functional-segment-select/functional-segment-select.component";
import {GeoCodeSegmentSelectComponent} from "../../../journal-voucher/geo-code-segment-select/geo-code-segment-select.component";
import {AdminSegmentEmployeeSelectComponent} from "../../default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {PreviousYearAdvancesService} from "../../../../../shared/services/previous-year-advances.service";

@Component({
    selector: 'app-previous-year-advances-create',
    templateUrl: './previous-year-advances-create.component.html',
    styleUrls: ['./previous-year-advances-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PreviousYearAdvancesCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    previousYearAdvancesCreateForm: FormGroup;
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

    constructor(public matDialogRef: MatDialogRef<PreviousYearAdvancesCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private currencyService: CurrencyService,
                private treasureReportService: TreasureReportService,
                private previousYearAdvanceService: PreviousYearAdvancesService,
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
        this.dialogTitle = this.header + ' - Previous Year Advances';
    }

    ngOnInit(): void {
        this.getCurrencies();
        this.refresh();
        this.getcashbookList();
        if (this.updatedData) {
            this.patchForm();
        }
    }

    refresh() {
        this.previousYearAdvancesCreateForm = this.fb.group({
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
            //receivingOfficerId: [{value: '', disabled: true}],
            cashbookId: [{value: '', disabled: true}],
            prepare: [{value: '', disabled: true}],
            close: [{value: '', disabled: true}],
            prepByName: [{value: '', disabled: true}],
            closeByName: [{value: '', disabled: true}],
            cashBookAccountId: [''],
            preparedDate: [{value: '', disabled: true}],
            //closedDate: [{value: '', disabled: true}],
            checkingOfficerId: [{value: '', disabled: true}],
            payingOfficerId: [{value: '', disabled: true}],
            financialControllerId: [{value: '', disabled: true}]
        });
        this.user = this.globalService.getSelf();

        if (this.sources && this.sources.length > 0) {
            this.previousYearAdvancesCreateForm.patchValue({
                'sourceUnit': this.sources[0].value
            });
        }

        this.getDefaultSettingVoucherInfo();

        this.previousYearAdvancesCreateForm.get('cashBookAccountId').valueChanges.subscribe(val => {
            this.cashbookItem();
        });

        this.previousYearAdvancesCreateForm.patchValue({
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
        this.previousYearAdvancesCreateForm.patchValue({
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
            cashBookAccountId: (this.updatedData && this.updatedData['cashbookId']) ? this.updatedData['cashbookId'] : '',
            checkingOfficerId: (this.updatedData && this.updatedData['checkingOfficerId']) ? this.updatedData['checkingOfficerId'] : '',
            payingOfficerId: (this.updatedData && this.updatedData['payingOfficerId']) ? this.updatedData['payingOfficerId'] : '',
            financialControllerId: (this.updatedData && this.updatedData['financialControllerId']) ? this.updatedData['financialControllerId'] : '',
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

    savePreviousYearAdvances() {
        this.isSubmitted = true;
        if (!this.previousYearAdvancesCreateForm.getRawValue().sourceUnit) {
            this.alertService.showErrors('Please Fill Source unit');
            this.isSubmitted = false;
            return;
        }

        if (!this.previousYearAdvancesCreateForm.getRawValue().valueDate) {
            this.alertService.showErrors('Please Fill Value Date');
            this.isSubmitted = false;
            return;
        }

        if (!this.previousYearAdvancesCreateForm.getRawValue().paymentDescription) {
            this.alertService.showErrors('Please Fill Being Payer For');
            this.isSubmitted = false;
            return;
        }

        if (!this.previousYearAdvancesCreateForm.getRawValue().xRate) {
            this.alertService.showErrors('Please Fill X Rate');
            this.isSubmitted = false;
            return;
        }

        if (!this.previousYearAdvancesCreateForm.getRawValue().officialXRate) {
            this.alertService.showErrors('Please Fill Official X Rate International');
            this.isSubmitted = false;
            return;
        }
        if (!this.previousYearAdvancesCreateForm.getRawValue().adminSegmentId) {
            this.alertService.showErrors('Please Fill Admin Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.previousYearAdvancesCreateForm.getRawValue().fundSegmentId) {
            this.alertService.showErrors('Please Fill Fund Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.previousYearAdvancesCreateForm.getRawValue().economicSegmentId) {
            this.alertService.showErrors('Please Fill Economic Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.previousYearAdvancesCreateForm.getRawValue().programSegmentId) {
            this.alertService.showErrors('Please Fill Programme Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.previousYearAdvancesCreateForm.getRawValue().functionalSegmentId) {
            this.alertService.showErrors('Please Fill Functional Segment');
            this.isSubmitted = false;
            return;
        }

        if (!this.previousYearAdvancesCreateForm.getRawValue().geoCodeSegmentId) {
            this.alertService.showErrors('Please Fill Geo Code Segment');
            this.isSubmitted = false;
            return;
        }

        /*if (!this.previousYearAdvancesCreateForm.getRawValue().receivingOfficerId) {
            this.alertService.showErrors('Please Fill Checking Officer');
            this.isSubmitted = false;
            return;
        }*/

        if (!this.previousYearAdvancesCreateForm.getRawValue().checkingOfficerId) {
            this.alertService.showErrors('Please Fill Checking Officer');
            this.isSubmitted = false;
            return;
        }

        if (!this.previousYearAdvancesCreateForm.getRawValue().payingOfficerId) {
            this.alertService.showErrors('Please Fill Paying Officer');
            this.isSubmitted = false;
            return;
        }

        if (!this.previousYearAdvancesCreateForm.getRawValue().financialControllerId) {
            this.alertService.showErrors('Please Fill Financial Controller');
            this.isSubmitted = false;
            return;
        }

        if (!this.previousYearAdvancesCreateForm.getRawValue().cashBookAccountId) {
            this.alertService.showErrors('Please Fill Cashbook Account');
            this.isSubmitted = false;
            return;
        }
        if (!this.previousYearAdvancesCreateForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            let params = {
                'sourceUnit': this.previousYearAdvancesCreateForm.getRawValue().sourceUnit ? this.sources[0].name : '',
                'voucherSourceUnitId': this.previousYearAdvancesCreateForm.getRawValue().sourceUnit ? this.previousYearAdvancesCreateForm.getRawValue().sourceUnit : '',
                'valueDate': moment(this.previousYearAdvancesCreateForm.getRawValue().valueDate).format('YYYY-MM-DD') ? moment(this.previousYearAdvancesCreateForm.getRawValue().valueDate).format('YYYY-MM-DD') : '',
                'payee': this.previousYearAdvancesCreateForm.getRawValue().payee ? this.previousYearAdvancesCreateForm.getRawValue().payee : '',
                'type': this.type ? this.type : '',
                'paymentDescription': this.previousYearAdvancesCreateForm.getRawValue().paymentDescription ? this.previousYearAdvancesCreateForm.getRawValue().paymentDescription : '',
                'xRate': this.previousYearAdvancesCreateForm.getRawValue().xRate ? this.previousYearAdvancesCreateForm.getRawValue().xRate : '',
                'officialXRate': this.previousYearAdvancesCreateForm.getRawValue().officialXRate ? this.previousYearAdvancesCreateForm.getRawValue().officialXRate : '',
                'adminSegmentId': this.previousYearAdvancesCreateForm.getRawValue().adminSegmentId ? this.previousYearAdvancesCreateForm.getRawValue().adminSegmentId : '',
                'fundSegmentId': this.previousYearAdvancesCreateForm.getRawValue().fundSegmentId ? this.previousYearAdvancesCreateForm.getRawValue().fundSegmentId : '',
                'economicSegmentId': this.previousYearAdvancesCreateForm.getRawValue().economicSegmentId ? this.previousYearAdvancesCreateForm.getRawValue().economicSegmentId : '',
                'programSegmentId': this.previousYearAdvancesCreateForm.getRawValue().programSegmentId ? this.previousYearAdvancesCreateForm.getRawValue().programSegmentId : '',
                'functionalSegmentId': this.previousYearAdvancesCreateForm.getRawValue().functionalSegmentId ? this.previousYearAdvancesCreateForm.getRawValue().functionalSegmentId : '',
                'geoCodeSegmentId': this.previousYearAdvancesCreateForm.getRawValue().geoCodeSegmentId ? this.previousYearAdvancesCreateForm.getRawValue().geoCodeSegmentId : '',
                //'receivingOfficerId': this.previousYearAdvancesCreateForm.getRawValue().receivingOfficerId ? this.previousYearAdvancesCreateForm.getRawValue().receivingOfficerId : '',
                'cashbookId': this.previousYearAdvancesCreateForm.getRawValue().cashBookAccountId ? this.previousYearAdvancesCreateForm.getRawValue().cashBookAccountId : '',
                'checkingOfficerId': this.previousYearAdvancesCreateForm.getRawValue().checkingOfficerId ? this.previousYearAdvancesCreateForm.getRawValue().checkingOfficerId : '',
                'payingOfficerId': this.previousYearAdvancesCreateForm.getRawValue().payingOfficerId ? this.previousYearAdvancesCreateForm.getRawValue().payingOfficerId : '',
                'financialControllerId': this.previousYearAdvancesCreateForm.getRawValue().financialControllerId ? this.previousYearAdvancesCreateForm.getRawValue().financialControllerId : '',
            };
            if (this.updatedData) {
                this.previousYearAdvanceService.save(params).subscribe(data => {
                    this.previousYearAdvancesCreateForm.reset();
                    this.isSubmitted = false;
                    this.matDialogRef.close(this.previousYearAdvancesCreateForm);
                });
            } else {
                this.previousYearAdvanceService.updatePreviousYearAdvances(this.updatedData.id, params).subscribe(data => {
                    this.previousYearAdvancesCreateForm.reset();
                    this.isSubmitted = false;
                    this.matDialogRef.close(this.previousYearAdvancesCreateForm);
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
            this.previousYearAdvancesCreateForm.patchValue({
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
            this.previousYearAdvancesCreateForm.patchValue({
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
            this.previousYearAdvancesCreateForm.patchValue({
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
            this.previousYearAdvancesCreateForm.patchValue({
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
            this.previousYearAdvancesCreateForm.patchValue({
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
            this.previousYearAdvancesCreateForm.patchValue({
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
                this.previousYearAdvancesCreateForm.patchValue({
                    checkingOfficerId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Receiving Officer') {
                this.receivingOfficers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                /*this.previousYearAdvancesCreateForm.patchValue({
                    receivingOfficerId: response['empData'].id,
                    disabled: true
                });*/
            } else if (type === 'Select Paying Officer') {
                this.payingOfficers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.previousYearAdvancesCreateForm.patchValue({
                    payingOfficerId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Financial Control') {
                this.financialControllers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.previousYearAdvancesCreateForm.patchValue({
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
                this.previousYearAdvancesCreateForm.patchValue({
                    'adminSegmentCode': data.adminSegmentId,
                    'adminSegmentId': data.adminSegmentId,
                });
            }
            if (data && data.fundSegment && data.fundSegmentId) {
                this.fundSegments = [{
                    'name': data['fundSegment'].name,
                    'id': data['fundSegment'].id
                }];
                this.previousYearAdvancesCreateForm.patchValue({
                    'fundSegmentCode': data.fundSegmentId,
                    'fundSegmentId': data.fundSegmentId,
                });
            }
            if (data && data.fundSegment && data.fundSegmentId) {
                this.fundSegments = [{
                    'name': data['fundSegment'].name,
                    'id': data['fundSegment'].id
                }];
                this.previousYearAdvancesCreateForm.patchValue({
                    'fundSegmentCode': data.fundSegmentId,
                    'fundSegmentId': data.fundSegmentId,
                });
            }
            if (data && data.fundSegment && data.economicSegmentId) {
                this.economicSegments = [{
                    'name': data['economicSegment'].name,
                    'id': data['economicSegment'].id
                }];
                this.previousYearAdvancesCreateForm.patchValue({
                    'economicSegmentCode': data.economicSegmentId,
                    'economicSegmentId': data.economicSegmentId,
                });
            }
            if (data && data.programSegment && data.programSegmentId) {
                this.programmeSegments = [{
                    'name': data['programSegment'].name,
                    'id': data['programSegment'].id
                }];
                this.previousYearAdvancesCreateForm.patchValue({
                    'programmeSegmentCode': data.programSegmentId,
                    'programSegmentId': data.programSegmentId,
                });
            }
            if (data && data.functionalSegment && data.functionalSegmentId) {
                this.functionalSegments = [{
                    'name': data['functionalSegment'].name,
                    'id': data['functionalSegment'].id
                }];
                this.previousYearAdvancesCreateForm.patchValue({
                    'functionalSegmentCode': data.functionalSegmentId,
                    'functionalSegmentId': data.functionalSegmentId,
                });
            }
            if (data && data.geoCodeSegment && data.geoCodeSegmentId) {
                this.geoCodeSegments = [{
                    'name': data['geoCodeSegment'].name,
                    'id': data['geoCodeSegment'].id
                }];
                this.previousYearAdvancesCreateForm.patchValue({
                    'geoCodeSegmentCode': data.geoCodeSegmentId,
                    'geoCodeSegmentId': data.geoCodeSegmentId,
                });
            }
            if (data && data.checkingOfficer && data.checkingOfficerId) {
                this.checkingOfficers = [{
                    'name': data['checkingOfficer'].firstName + ' ' + data['checkingOfficer'].lastName,
                    'id': data['checkingOfficer'].id
                }];
                this.previousYearAdvancesCreateForm.patchValue({
                    'checkingOfficerId': data.checkingOfficerId ? data.checkingOfficerId : ''
                });
            }
            if (data && data.payingOfficer && data.payingOfficerId) {
                this.payingOfficers = [{
                    'name': data['payingOfficer'].firstName + ' ' + data['payingOfficer'].lastName,
                    'id': data['payingOfficer'].id
                }];
                this.previousYearAdvancesCreateForm.patchValue({
                    'payingOfficerId': data.payingOfficerId ? data.payingOfficerId : ''
                });
            }
            if (data && data.financialController && data.financialControllerId) {
                this.financialControllers = [{
                    'name': data['financialController'].firstName + ' ' + data['financialController'].lastName,
                    'id': data['financialController'].id
                }];
                this.previousYearAdvancesCreateForm.patchValue({
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
        const selectedCashbookId = this.previousYearAdvancesCreateForm.get('cashBookAccountId').value;
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
