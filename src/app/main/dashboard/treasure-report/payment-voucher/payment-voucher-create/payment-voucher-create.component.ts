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

    constructor(public matDialogRef: MatDialogRef<PaymentVoucherCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog) {
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
            console.log('this.sources', this.sources);
        }
    }

    ngOnInit(): void {
        this.refresh();
        // this.checkForUpdate();
    }

    refresh() {
        this.schedulePayeeEmployeeForm = this.fb.group({
            sourceUnit: [{value: '', disabled: true}],
            departmentalNo: [''],
            voucherNo: [{value: '', disabled: true}],
            valueDate: [''],
            paymentApprovalRef: [''],
            payee: ['EMPLOYEE'],
            currencyCode: [''],
            currency: [''],
            beingPayedFor: [''],
            xRate: [''],
            xRateCurrency: [{value: '', disabled: true}],
            officialXRateInternational: [''],
            aieNo: [''],
            adminSegmentCode: [{value: '', disabled: true}],
            adminSegmentId: [''],
            fundSegmentCode: [{value: '', disabled: true}],
            fundSegmentId: [''],
            economicSegmentCode: [{value: '', disabled: true}],
            economicSegmentId: [''],
            programmeSegmentCode: [{value: '', disabled: true}],
            programmeSegmentId: [''],
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
    }

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
            console.log('this.schedulePayeeEmployeeForm.value', this.schedulePayeeEmployeeForm.value);
            /*this.contactInfoService.addCountry(this.schedulePayeeEmployeeForm.value).subscribe(data => {
                this.schedulePayeeEmployeeForm.reset();
                this.isSubmitted = false;
            });*/
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
                programmeSegmentId: response.id,
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
}
