import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {TreasureReportService} from '../../../../../shared/services/treasure-report.service';
import {AdminSegmentEmployeeSelectComponent} from "../../default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component";
import {DefaultSettingVoucherInfoService} from "../../../../../shared/services/default-setting-voucher-info";
import {PermissionConstant} from '../../../../../shared/constants/permission-constant';

@Component({
    selector: 'app-voucher-source-unit-create',
    templateUrl: './voucher-source-unit-create.component.html',
    styleUrls: ['./voucher-source-unit-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class VoucherSourceUnitCreateComponent implements OnInit {
    permissionConstant = PermissionConstant;
    action: any;
    dialogTitle: any;
    voucherSourceUnitForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    checkingOfficers = [];
    payingOfficers = [];
    financialControllers = [];
    dialogRef: any;

    constructor(public matDialogRef: MatDialogRef<VoucherSourceUnitCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private treasureReportService: TreasureReportService,
                private defaultSettingVoucherInfoService: DefaultSettingVoucherInfoService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Voucher Source Unit';
            if (_data.voucher) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Voucher Source Unit';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.voucherSourceUnitForm = this.fb.group({
            longName: [''],
            shortName: [''],
            nextPvIndexNumber: [''],
            nextRvIndexNumber: [''],
            honourCertificate: [''],
            checkingOfficerId: [{value: '', disabled: true}],
            payingOfficerId: [{value: '', disabled: true}],
            financialControllerId: [{value: '', disabled: true}],
            retirementId: [''],
            reverseVoucherId: [''],
            revalidationId: [''],
            taxVoucherId: [''],
            isPersonalAdvanceUnit: [false],
        });
        this.voucherSourceUnitForm.patchValue({
            'retirementId': 11,
            'reverseVoucherId': 10,
            'revalidationId': 19
        });
        this.getDefaultSettingVoucherInfo();
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
            this.voucherSourceUnitForm.patchValue({
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

    saveVoucherSourceUnit() {
        if (!this.voucherSourceUnitForm.valid) {
            return;
        }
        this.treasureReportService.save(this.voucherSourceUnitForm.getRawValue()).subscribe(data => {
            console.log('data', data);
            this.matDialogRef.close(this.voucherSourceUnitForm);
            this.voucherSourceUnitForm.reset();
        });
    }

    updateVoucherSourceUnit() {
        if (!this.voucherSourceUnitForm.valid) {
            return;
        }
        this.treasureReportService.update(this.updateData.voucher.id, this.voucherSourceUnitForm.getRawValue()).subscribe(data => {
            this.updateData = undefined;
            this.matDialogRef.close(this.voucherSourceUnitForm);
            this.voucherSourceUnitForm.reset();
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
                this.voucherSourceUnitForm.patchValue({
                    checkingOfficerId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Paying Officer') {
                this.payingOfficers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.voucherSourceUnitForm.patchValue({
                    payingOfficerId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Financial Control') {
                this.financialControllers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.voucherSourceUnitForm.patchValue({
                    financialControllerId: response['empData'].id,
                    disabled: true
                });
            }
        });
    }

    getDefaultSettingVoucherInfo() {
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
    }
}
