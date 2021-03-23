import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FuseSidebarService} from "../../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FundSegmentSelectComponent} from "../../journal-voucher/fund-segment-select/fund-segment-select.component";
import {ProgrammingSegmentSelectComponent} from "../../journal-voucher/programming-segment-select/programming-segment-select.component";
import {FunctionalSegmentSelectComponent} from "../../journal-voucher/functional-segment-select/functional-segment-select.component";
import {GeoCodeSegmentSelectComponent} from "../../journal-voucher/geo-code-segment-select/geo-code-segment-select.component";
import {EconomicSegmentSelectComponent} from "../../journal-voucher/economic-segment-select/economic-segment-select.component";
import {AdminSegmentSelectComponent} from "../../journal-voucher/admin-segment-select/admin-segment-select.component";
import {AdminSegmentEmployeeSelectComponent} from './admin-segment-employee-select/admin-segment-employee-select.component';
import {AlertService} from "../../../../shared/services/alert.service";
import {DefaultSettingVoucherInfoService} from "../../../../shared/services/default-setting-voucher-info";
import {AdminSegmentSelectAccountHeadComponent} from './admin-segment-select-account-head/admin-segment-select-account-head.component';
import {SubOrgranisationSelectComponent} from './sub-orgranisation-select/sub-orgranisation-select.component';
import {PermissionConstant} from '../../../../shared/constants/permission-constant';

@Component({
    selector: 'app-default-setting-voucher-info',
    templateUrl: './default-setting-voucher-info.component.html',
    styleUrls: ['./default-setting-voucher-info.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DefaultSettingVoucherInfoComponent implements OnInit {

    permissionDefaultSetting = [PermissionConstant.DEFAULT_SETTINGS_EDIT];
    voucherInfoForm: FormGroup;
    accountHeads = [];
    subOrganisations = [];
    adminSegments = [];
    fundSegments = [];
    programmes = [];
    functionalSegments = [];
    geoCodes = [];
    economicCodes = [];
    checkingOfficers = [];
    payingOfficers = [];
    financialControllers = [];
    dialogRef: any;
    accounHeadNode: any;
    isSubmitted = false;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private fb: FormBuilder,
        private alertService: AlertService,
        private defaultSettingVoucherInfoService: DefaultSettingVoucherInfoService) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.voucherInfoForm = this.fb.group({
            'accountHeadId': [{value: '', disabled: true}],
            'subOrganisationId': [{value: '', disabled: true}],
            'adminSegmentId': [{value: '', disabled: true}],
            'fundSegmentId': [{value: '', disabled: true}],
            'programSegmentId': [{value: '', disabled: true}],
            'functionalSegmentId': [{value: '', disabled: true}],
            'geoCodeSegmentId': [{value: '', disabled: true}],
            'economicSegmentId': [{value: '', disabled: true}],
            'checkingOfficerId': [{value: '', disabled: true}],
            'payingOfficerId': [{value: '', disabled: true}],
            'financialControllerId': [{value: '', disabled: true}]
        });
        this.getDefaultSettingVoucherInfo();
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
            this.voucherInfoForm.patchValue({
                adminSegmentId: response.id,
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
            this.voucherInfoForm.patchValue({
                fundSegmentId: response.id,
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
            this.programmes = [{
                'name': response.name,
                'id': response.id
            }];
            this.voucherInfoForm.patchValue({
                programSegmentId: response.id,
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
            this.functionalSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.voucherInfoForm.patchValue({
                functionalSegmentId: response.id,
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
            this.geoCodes = [{
                'name': response.name,
                'id': response.id
            }];
            this.voucherInfoForm.patchValue({
                geoCodeSegmentId: response.id,
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
            this.economicCodes = [{
                'name': response.name,
                'id': response.id
            }];
            this.voucherInfoForm.patchValue({
                economicSegmentId: response.id,
                disabled: true
            });
        });
    }

    selectAdminAccountHead() {
        this.dialogRef = this._matDialog.open(AdminSegmentSelectAccountHeadComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            // console.log('response', response);
            if (!response) {
                return;
            }
            this.accounHeadNode = response;
            this.accountHeads = [{
                'name': response.name,
                'id': response.id
            }];
            this.voucherInfoForm.patchValue({
                accountHeadId: response.id,
                disabled: true
            });
        });
    }

    selectAdminEmployee(type) {
        let allowType: any = 'BOTH';
        let node: any = undefined;
        if (type === 'Select Account Head') {
            allowType = 'PARENT';
        } else if (type === 'Sub Organisation') {
            if (!this.accounHeadNode) {
                this.alertService.showErrors('Choose Account Head Data ..!');
                return;
            } else {
                node = this.accounHeadNode;
                allowType = 'BOTH';
            }
        } else if (type === 'Select Checking Officer' || type === 'Select Paying Officer' || type === 'Select Financial Control') {
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
            this.accounHeadNode = response['node'];
            if (type === 'Select Account Head') {
                this.accountHeads = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.voucherInfoForm.patchValue({
                    accountHeadId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Checking Officer') {
                this.checkingOfficers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.voucherInfoForm.patchValue({
                    checkingOfficerId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Paying Officer') {
                this.payingOfficers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.voucherInfoForm.patchValue({
                    payingOfficerId: response['empData'].id,
                    disabled: true
                });
            } else if (type === 'Select Financial Control') {
                this.financialControllers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.voucherInfoForm.patchValue({
                    financialControllerId: response['empData'].id,
                    disabled: true
                });
            }
        });
    }

    selectSubOrganisation() {
        let node: any = undefined;
        if (!this.accounHeadNode) {
            this.alertService.showErrors('Choose Account Head Data ..!');
            return;
        } else {
            node = this.accounHeadNode;
        }

        this.dialogRef = this._matDialog.open(SubOrgranisationSelectComponent, {
            panelClass: 'contact-form-dialog',
            data: {node: node}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.subOrganisations = [{
                'name': response.name,
                'id': response.id
            }];
            this.voucherInfoForm.patchValue({
                subOrganisationId: response.id,
                disabled: true
            });
        });
    }

    getDefaultSettingVoucherInfo() {
        this.defaultSettingVoucherInfoService.detail().subscribe(data => {
            if (data.accountHead) {
                this.accountHeads = [{
                    'name': data.accountHead.name,
                    'id': data.accountHead.id
                }];
                this.voucherInfoForm.patchValue({
                    accountHeadId: data.accountHeadId,
                    disabled: true
                });
            }
            if (data.subOrganisation) {
                this.subOrganisations = [{
                    'id': data.subOrganisation.id,
                    'name': data.subOrganisation.name
                }];
                this.voucherInfoForm.patchValue({
                    subOrganisationId: data.subOrganisationId,
                    disabled: true
                });
            }
            if (data.adminSegment) {
                this.adminSegments = [{
                    'id': data.adminSegment.id,
                    'name': data.adminSegment.name
                }];
                this.voucherInfoForm.patchValue({
                    adminSegmentId: data.adminSegmentId,
                    disabled: true
                });
            }
            if (data.fundSegment) {
                this.fundSegments = [{
                    'id': data.fundSegment.id,
                    'name': data.fundSegment.name
                }];
                this.voucherInfoForm.patchValue({
                    fundSegmentId: data.fundSegmentId,
                    disabled: true
                });
            }
            if (data.programSegment) {
                this.programmes = [{
                    'id': data.programSegment.id,
                    'name': data.programSegment.name
                }];
                this.voucherInfoForm.patchValue({
                    programSegmentId: data.programSegmentId,
                    disabled: true
                });
            }
            if (data.functionalSegment) {
                this.functionalSegments = [{
                    'id': data.functionalSegment.id,
                    'name': data.functionalSegment.name
                }];
                this.voucherInfoForm.patchValue({
                    functionalSegmentId: data.functionalSegmentId,
                    disabled: true
                });
            }
            if (data.geoCodeSegment) {
                this.geoCodes = [{
                    'id': data.geoCodeSegment.id,
                    'name': data.geoCodeSegment.name
                }];
                this.voucherInfoForm.patchValue({
                    geoCodeSegmentId: data.geoCodeSegmentId,
                    disabled: true
                });
            }
            if (data.economicSegment) {
                this.economicCodes = [{
                    'id': data.economicSegment.id,
                    'name': data.economicSegment.name
                }];
                this.voucherInfoForm.patchValue({
                    economicSegmentId: data.economicSegmentId,
                    disabled: true
                });
            }
            if (data.checkingOfficer) {
                this.checkingOfficers = [{
                    'id': data.checkingOfficer.id,
                    'name': data.checkingOfficer.firstName + ' ' + data.checkingOfficer.lastName
                }];
                this.voucherInfoForm.patchValue({
                    checkingOfficerId: data.checkingOfficerId,
                    disabled: true
                });
            }
            if (data.payingOfficer) {
                this.payingOfficers = [{
                    'id': data.payingOfficer.id,
                    'name': data.payingOfficer.firstName + ' ' + data.payingOfficer.lastName
                }];
                this.voucherInfoForm.patchValue({
                    payingOfficerId: data.payingOfficerId,
                    disabled: true
                });
            }
            if (data.financialController) {
                this.financialControllers = [{
                    'id': data.financialController.id,
                    'name': data.financialController.firstName + ' ' + data.financialController.lastName
                }];
                this.voucherInfoForm.patchValue({
                    financialControllerId: data.financialControllerId,
                    disabled: true
                });
            }
        });
    }

    submitVoucherInfo() {
        this.isSubmitted = true;
        if (this.isSubmitted) {
            this.defaultSettingVoucherInfoService.save(this.voucherInfoForm.value).subscribe(data => {
                this.voucherInfoForm.reset();
                this.isSubmitted = false;
                this.getDefaultSettingVoucherInfo();
            });
        }
    }
}
