import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EconomicSegmentSelectComponent} from "../../../journal-voucher/economic-segment-select/economic-segment-select.component";
import {AlertService} from "../../../../../shared/services/alert.service";
import {PaymentVoucherService} from "../../../../../shared/services/payment-voucher.service";

@Component({
    selector: 'app-schedule-economic-codes',
    templateUrl: './schedule-economic-codes.component.html',
    styleUrls: ['./schedule-economic-codes.component.scss']
})
export class ScheduleEconomicCodesComponent implements OnInit {
    action: any;
    dialogTitle: any;
    economicCodeForm: FormGroup;
    dialogRef: any;
    banks = [];
    economicSegments = [];
    ledgers = [];
    isSubmitted = false;
    payeeData: any;

    constructor(
        public matDialogRef: MatDialogRef<ScheduleEconomicCodesComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private alertService: AlertService,
        private paymentVoucherService: PaymentVoucherService) {
        this.payeeData = _data.pv;
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.economicCodeForm = this.fb.group({
            year: [{value: '', disabled: true}],
            deptalId: [{value: '', disabled: true}],
            economicCode: [{value: '', disabled: true}],
            economicSegmentName: [{value: '', disabled: true}],
            grossAmount: [{value: '', disabled: true}],
            payeeName: [{value: '', disabled: true}],
            economicSegmentId: [{value: '', disabled: true}],
            economicName: [{value: '', disabled: true}],
            amount: [''],
        });
        let payeeName = '';
        if (this._data && this._data['pv'] && this._data['pv']['adminCompany']) {
            payeeName = this._data['pv']['adminCompany'].name;
        } else if (this._data && this._data['pv'] && this._data['pv']['employee']) {
            payeeName = this._data['pv']['employee'].firstName + ' ' + this._data['pv']['employee'].lastName;
        }
        this.economicCodeForm.patchValue({
            'year': this._data.report.year,
            'deptalId': this._data.report.deptalId,
            'economicCode': this._data.report.economicSegment.combinedCode,
            'economicSegmentName': this._data['report'].economicSegment.name,
            'grossAmount': this._data['pv'].netAmount,
            'payeeName': payeeName
        })
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

    addLedger() {
        if (!this.economicCodeForm.getRawValue().economicSegmentId) {
            this.alertService.showErrors('Please Fill Economic Segment');
            return;
        } else if (!this.economicCodeForm.getRawValue().amount) {
            this.alertService.showErrors('Please Fill Amount');
            return;
        }
        let foundLedger = false;
        if (this.ledgers.length > 0) {
            this.ledgers.forEach(led => {
                if (parseInt(led['economicSegmentId']) === parseInt(this.economicCodeForm.getRawValue().economicSegmentId)) {
                    foundLedger = true;
                }
            })
        }
        if (foundLedger) {
            this.alertService.showErrors('Economic Segment already exist');
            return;
        }

        if (parseInt(this.economicCodeForm.getRawValue().amount) > parseInt(this._data['pv'].netAmount)) {
            this.alertService.showErrors('Amount can\'t be greater than gross amount');
            return;
        }

        this.ledgers.push({
            'economicSegmentId': this.economicCodeForm.getRawValue().economicSegmentId,
            'economicName': this.economicCodeForm.getRawValue().economicName,
            'amount': this.economicCodeForm.getRawValue().amount
        });
        this.economicCodeForm.patchValue({
            'economicSegmentId': '',
            'economicName': '',
            'amount': '',
        });
    }

    deleteLedger(index) {
        this.ledgers.splice(index, 1);
    }

    saveEconomicCode() {
        this.isSubmitted = true;
        if (!this.economicCodeForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
            let params = {
                scheduleEconomics: this.ledgers
            };
            this.paymentVoucherService.scheduleEconomic(this.payeeData.id, params).subscribe(data => {
                this.economicCodeForm.reset();
                this.isSubmitted = false;
                this.matDialogRef.close(this.economicCodeForm);
            });
        }
    }
}
