import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../../../shared/services/alert.service";
import {PaymentVoucherService} from "../../../../../shared/services/payment-voucher.service";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {EconomicSegmentSelectComponent} from "../../../journal-voucher/economic-segment-select/economic-segment-select.component";

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
    economicCodeForm: FormGroup;
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
        private paymentVoucherService: PaymentVoucherService) {
        console.log('_data', _data);
        this.reportData = _data.report;
        this.payeeData = _data.pv;
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.economicCodeForm = this.fb.group({
            year: [{value: '', disabled: true}],
            deptalId: [{value: '', disabled: true}],
            lastActioned: [{value: '', disabled: true}],
            grossAmount: [{value: '', disabled: true}],
            payeeName: [{value: '', disabled: true}],
            economicSegmentId: [{value: '', disabled: true}],
            economicName: [{value: '', disabled: true}],
            liability: [''],
            refNo: [''],
            amount: [''],
            details: [''],
        });
        let payeeName = '';
        if (this._data && this._data['pv'] && this._data['pv']['adminCompany']) {
            payeeName = this._data['pv']['adminCompany'].name;
        } else if (this._data && this._data['pv'] && this._data['pv']['employee']) {
            payeeName = this._data['pv']['employee'].firstName + ' ' + this._data['pv']['employee'].lastName;
        }
        console.log('aaaaaaa', this._data['pv']);
        this.economicCodeForm.patchValue({
            'year': this._data['pv'].year,
            'deptalId': this._data['pv'].deptalId,
            'lastActioned': this._data['pv'].lastActioned,
            // 'grossAmount': parseInt(this._data['pv'].totalAmount.amount) + parseInt(this._data['pv'].totalTax.tax),
            'grossAmount': 0,
            'payeeName': payeeName
        });
        // this.getPayeeEconomicCode();
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
                id: response.id,
                name: response.combinedCode + ' - ' + response.name
            }];
            this.economicCodeForm.patchValue({
                economicSegmentId: response.id,
                economicName: response.name,
            });
        });
    }

    /*getPayeeEconomicCode() {
        this.paymentVoucherService.getScheduleEconomic(this.reportData.id, {payeeVoucherId: this.payeeData.id}).subscribe(data => {
            let liabilityData = [];
            if (data && data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    liabilityData.push({
                        'economicSegmentId': item.economicSegmentId,
                        'economicName': item['economicSegment'].name,
                        'amount': item.amount
                    });
                });
                this.liabilityData = liabilityData;
            }
        });
    }*/

    addLiablity() {
        if (!this.economicCodeForm.getRawValue().economicSegmentId) {
            this.alertService.showErrors('Please Fill Economic Segment');
            return;
        } else if (!this.economicCodeForm.getRawValue().amount) {
            this.alertService.showErrors('Please Fill Amount');
            return;
        }
        let foundLedger = false;
        if (this.liabilityData.length > 0) {
            this.liabilityData.forEach(led => {
                if (parseInt(led['economicSegmentId']) === parseInt(this.economicCodeForm.getRawValue().economicSegmentId)) {
                    foundLedger = true;
                }
            })
        }
        if (foundLedger) {
            this.alertService.showErrors('Economic Segment already exist');
            return;
        }

        /*if (parseInt(this.economicCodeForm.getRawValue().amount) > parseInt(this.economicCodeForm.getRawValue().grossAmount)) {
            this.alertService.showErrors('Amount can\'t be greater than gross amount');
            return;
        }*/

        this.liabilityData.push({
            'economicSegmentId': this.economicCodeForm.getRawValue().economicSegmentId,
            'economicName': this.economicCodeForm.getRawValue().economicName,
            'refNo': this.economicCodeForm.getRawValue().refNo,
            'description': this.economicCodeForm.getRawValue().description,
            'amount': this.economicCodeForm.getRawValue().amount
        });
        this.economicCodeForm.patchValue({
            'economicSegmentId': '',
            'economicName': '',
            'refNo': '',
            'description': '',
            'amount': '',
        });
    }

    /*deleteLedger(index) {
        this.liabilityData.splice(index, 1);
    }*/

    saveEconomicCode() {
        this.isSubmitted = true;
        if (!this.economicCodeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            let params = {
                scheduleEconomics: this.liabilityData
            };
            this.paymentVoucherService.scheduleEconomic(this.payeeData.id, params).subscribe(data => {
                this.economicCodeForm.reset();
                this.isSubmitted = false;
                this.matDialogRef.close(this.economicCodeForm);
            });
        }
    }
}
