import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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

@Component({
    selector: 'app-default-setting-voucher-info',
    templateUrl: './default-setting-voucher-info.component.html',
    styleUrls: ['./default-setting-voucher-info.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DefaultSettingVoucherInfoComponent implements OnInit {
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
            console.log('response', response);
            this.accounHeadNode = response['node'];
            if (!response) {
                return;
            }

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
                this.checkingOfficers = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.voucherInfoForm.patchValue({
                    checkingOfficerId: response['empData'].id,
                    disabled: true
                });
            }
        });
    }

    submitVoucherInfo() {
        this.isSubmitted = true;
        console.log('this.voucherInfoForm', this.voucherInfoForm.value);
        /*if (!this.voucherInfoForm.valid) {
            console.log('aaaaaa');
            this.isSubmitted = false;
            return;
        }*/

        if (this.isSubmitted) {
            // this.cashbookAccountForm.value['cashbookMonthly'] = this.cashbookMonthly;
            console.log('this.cashbookAccountForm', this.voucherInfoForm.value);
            this.defaultSettingVoucherInfoService.save(this.voucherInfoForm.value).subscribe(data => {
                this.voucherInfoForm.reset();
                // this.matDialogRef.close(this.cashbookAccountForm);
                this.isSubmitted = false;
            });
        }
    }
}
