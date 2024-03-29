import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AlertService} from '../../../../../shared/services/alert.service';
import {PaymentVoucherService} from '../../../../../shared/services/payment-voucher.service';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {EconomicSegmentSelectComponent} from '../../../journal-voucher/economic-segment-select/economic-segment-select.component';
import {RetireVoucherService} from '../../../../../shared/services/retire-voucher.service';
import * as moment from 'moment';
import {getLiteralValue} from 'codelyzer/util/getLiteralValue';

@Component({
    selector: 'app-liabilities',
    templateUrl: './liabilities.component.html',
    styleUrls: ['./liabilities.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LiabilitiesComponent implements OnInit {
    action: any;
    dialogTitle: any;
    liabilityForm: FormGroup;
    dialogRef: any;
    banks = [];
    economicSegments = [];
    liabilityData = [];
    isSubmitted = false;
    payeeData: any;
    reportData: any;

    constructor(
        public matDialogRef: MatDialogRef<LiabilitiesComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private alertService: AlertService,
        private paymentVoucherService: PaymentVoucherService,
        private retireVoucherService: RetireVoucherService) {
        this.reportData = _data.report;
        this.payeeData = _data.pv;

        if (this.payeeData['id']) {
            this.getLiabilities();
        }
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.liabilityForm = this.fb.group({
            id: [''],
            year: [{value: '', disabled: true}],
            deptalId: [{value: '', disabled: true}],
            lastActioned: [{value: '', disabled: true}],
            grossAmount: [{value: '', disabled: true}],
            economicSegmentId: [{value: '', disabled: true}],
            economicName: [{value: '', disabled: true}],
            liability: [''],
            amount: [''],
            details: [''],
            companyId: [this.payeeData.companyId],
            employeeId: [this.payeeData.employeeId],
        });
        this.liabilityForm.patchValue({
            'year': this._data['pv'].year,
            'deptalId': this._data['pv'].deptalId,
            'lastActioned': this._data['pv'].lastActioned,
            'grossAmount': this._data.pv.payee.netAmount
            // 'grossAmount': (this._data['pv'].totalAmount && this._data['pv'].totalTax && this._data['pv'].totalAmount.amount && this._data['pv'].totalTax.tax) ? parseInt(this._data['pv'].totalAmount.amount) + parseInt(this._data['pv'].totalTax.tax) : 0
        });
    }

    economicSegmentSelect() {
        this.dialogRef = this._matDialog.open(EconomicSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                allowExpenditureAssetOnly: true
            }
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.economicSegments = [{
                id: response.id,
                name: response.combinedCode + ' - ' + response.name
            }];
            this.liabilityForm.patchValue({
                economicSegmentId: response.id,
                economicName: response.name,
            });
        });
    }

    getLiabilities() {
        let params = {
            page: -1,
            companyId: this.payeeData.companyId || '',
            employeeId: this.payeeData.employeeId || '',
        };
        this.retireVoucherService.getLiabilities(this.payeeData['id'], params).subscribe(data => {
            let liabilityData = [];
            if (data && data.length > 0) {
                data.forEach(retire => {
                    if (retire && retire['retireLiabilities'] && retire['retireLiabilities'].length > 0) {
                        retire['retireLiabilities'].forEach(item => {
                            liabilityData.push({
                                id: item.id,
                                economicSegmentId: item.economicSegmentId,
                                economicName: item['economicSegment'].name,
                                liabilityValueDate: item.liabilityValueDate,
                                details: item.details,
                                amount: item.amount,
                                companyId: item.companyId,
                                employeeId: item.employeeId
                            });
                        });
                    }
                });
                this.liabilityData = liabilityData;
            }
        });
    }

    addLiablity() {
        if (!this.liabilityForm.getRawValue().economicSegmentId) {
            this.alertService.showErrors('Please Fill Economic Segment');
            return;
        } else if (!this.liabilityForm.getRawValue().amount) {
            this.alertService.showErrors('Please Fill Amount');
            return;
        }
        let foundLedger = false;
        if (this.liabilityData.length > 0) {
            this.liabilityData.forEach(led => {
                if (parseInt(led['economicSegmentId']) === parseInt(this.liabilityForm.getRawValue().economicSegmentId) && (parseInt(led['employeeId']) === parseInt(this.liabilityForm.getRawValue().employeeId) || parseInt(led['companyId']) === parseInt(this.liabilityForm.getRawValue().companyId))) {
                    foundLedger = true;
                }
            });
        }
        if (foundLedger) {
            this.alertService.showErrors('Economic Segment already exist');
            return;
        }

        /*if (parseInt(this.liabilityForm.getRawValue().amount) > parseInt(this.liabilityForm.getRawValue().grossAmount)) {
            this.alertService.showErrors('Amount can\'t be greater than gross amount');
            return;
        }*/

        this.liabilityData.push({
            liabilityValueDate: this.liabilityForm.getRawValue().liability ? moment(this.liabilityForm.getRawValue().liability).format('YYYY-MM-DD') : '',
            economicSegmentId: this.liabilityForm.getRawValue().economicSegmentId ? this.liabilityForm.getRawValue().economicSegmentId : '',
            economicName: this.liabilityForm.getRawValue().economicName ? this.liabilityForm.getRawValue().economicName : '',
            details: this.liabilityForm.getRawValue().details ? this.liabilityForm.getRawValue().details : '',
            amount: this.liabilityForm.getRawValue().amount ? this.liabilityForm.getRawValue().amount : '',
            companyId: this.liabilityForm.getRawValue().companyId,
            employeeId: this.liabilityForm.getRawValue().employeeId
        });
        this.liabilityForm.patchValue({
            'liability': '',
            'economicSegmentId': '',
            'economicName': '',
            'details': '',
            'amount': ''
        });
    }

    deleteLedger(index) {
        const deletedLiability = this.liabilityData[index];
        if (deletedLiability.id) {
            this.retireVoucherService.deleteLiability(this.liabilityData[index].id).subscribe(
                d => {
                    this.liabilityData.splice(index, 1);
                }
            );
        } else {
            this.liabilityData.splice(index, 1);
        }
    }

    saveLiabilities() {
        this.isSubmitted = true;
        if (!this.liabilityForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            const newLiabilityData = [];
            this.liabilityData.forEach(liability => {
                if (!liability.id) {
                    newLiabilityData.push(liability);
                }
            });
            let params = {
                'paymentVoucherId': this.payeeData.id,
                'liabilities': newLiabilityData
            };
            this.retireVoucherService.liabilities(params).subscribe(data => {
                this.liabilityForm.reset();
                this.isSubmitted = false;
                this.matDialogRef.close(this.liabilityForm);
            });
        }
    }
}
