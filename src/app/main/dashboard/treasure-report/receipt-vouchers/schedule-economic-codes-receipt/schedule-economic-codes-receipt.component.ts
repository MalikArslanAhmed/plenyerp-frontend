import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../../../shared/services/alert.service";
import {EconomicSegmentSelectComponent} from "../../../journal-voucher/economic-segment-select/economic-segment-select.component";
import {fuseAnimations} from "../../../../../../@fuse/animations";
import {ReceiptVoucherService} from "../../../../../shared/services/receipt-voucher.service";

@Component({
    selector: 'app-schedule-economic-codes-receipt',
    templateUrl: './schedule-economic-codes-receipt.component.html',
    styleUrls: ['./schedule-economic-codes-receipt.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ScheduleEconomicCodesReceiptComponent implements OnInit {
    action: any;
    dialogTitle: any;
    economicCodeForm: FormGroup;
    dialogRef: any;
    banks = [];
    economicSegments = [];
    ledgers = [];
    isSubmitted = false;
    payeeData: any;
    reportData: any;

    constructor(
        public matDialogRef: MatDialogRef<ScheduleEconomicCodesReceiptComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private alertService: AlertService,
        private receiptVoucherService: ReceiptVoucherService) {
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
        console.log('this._data', this._data);
        this.economicCodeForm.patchValue({
            'year': this._data.report.year,
            'deptalId': this._data.report.deptalId,
            'economicCode': this._data.report.economicSegment.combinedCode,
            'economicSegmentName': this._data['report'].economicSegment.name,
            'grossAmount': this._data['pv'].totalAmount,
            'payeeName': payeeName
        });
        this.getPayeeEconomicCode();
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

    getPayeeEconomicCode() {
        this.receiptVoucherService.getScheduleEconomic(this.reportData.id, {payeeVoucherId: this.payeeData.id}).subscribe(data => {
            let ledgers = [];
            if (data && data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    ledgers.push({
                        'economicSegmentId': item.economicSegmentId,
                        'economicName': item['economicSegment'].name,
                        'amount': item.amount
                    });
                });
                this.ledgers = ledgers;
            }
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

        if (parseInt(this.economicCodeForm.getRawValue().amount) > parseInt(this._data['pv'].totalAmount)) {
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
            this.receiptVoucherService.scheduleEconomic(this.payeeData.id, params).subscribe(data => {
                this.economicCodeForm.reset();
                this.isSubmitted = false;
                this.matDialogRef.close(this.economicCodeForm);
            });
        }
    }
}
