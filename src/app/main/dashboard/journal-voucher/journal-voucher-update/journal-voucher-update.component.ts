import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GlobalService} from "../../../../shared/services/global.service";
import {JournalVoucherService} from "../../../../shared/services/journal-voucher.service";
import {FundSegmentSelectComponent} from "../fund-segment-select/fund-segment-select.component";
import * as moment from "moment";

@Component({
    selector: 'app-journal-voucher-update',
    templateUrl: './journal-voucher-update.component.html',
    styleUrls: ['./journal-voucher-update.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class JournalVoucherUpdateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    journalVoucherCreateForm: FormGroup;
    isSubmitted = false;
    updateData: any;
    dialogRef: any;
    fundSegments = [];
    user: any;

    constructor(public matDialogRef: MatDialogRef<JournalVoucherUpdateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private globalService: GlobalService,
                private journalVoucherService: JournalVoucherService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Journal Voucher';
            if (_data.journalVoucher) {
                this.updateData = _data.journalVoucher;
            }
        }
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.user = this.globalService.getSelf();
        this.journalVoucherCreateForm = this.fb.group({
            'jvSourceApp': [{value: 'PLINYEGL', disabled: true}],
            'batchNumber': [''],
            'jvValueDate': [''],
            'fundSegmentId': [''],
            'fundSegmentCode': [{value: '', disabled: true}],
            'preparedValueDate': [''],
            'preparedTransactionDate': [''],
            'preparedUserId': [{value: this.user.id, disabled: true}],
            'preparedUsername': [{value: this.user.name, disabled: true}],
            'checkedValueDate': [''],
            'checkedTransactionDate': [''],
            'checkedUserId': [{value: this.user.id, disabled: true}],
            'checkedUsername': [{value: this.user.name, disabled: true}],
            'postedValueDate': [''],
            'postedTransactionDate': [''],
            'postedUserId': [{value: this.user.id, disabled: true}],
            'postedUsername': [{value: this.user.name, disabled: true}],
            'jvReference': [''],
            'transactionDetails': [''],
            'fundSegmentName': ['']
        });

        if (this.updateData) {
            this.patchFormValue();
        }
    }

    patchFormValue() {
        if (this.updateData && this.updateData.fundSegment) {
            this.fundSegments = [this.updateData.fundSegment];
        }
        this.journalVoucherCreateForm.patchValue({
            'batchNumber': (this.updateData && this.updateData.batchNumber) ? this.updateData.batchNumber : '',
            'jvValueDate': (this.updateData && this.updateData.jvValueDate) ? this.updateData.jvValueDate : '',
            'fundSegmentId': (this.updateData && this.updateData.fundSegment.id) ? this.updateData.fundSegment.id : '',
            'fundSegmentCode': (this.updateData && this.updateData.fundSegment.id) ? this.updateData.fundSegment.id : '',
            'preparedValueDate': (this.updateData && this.updateData.preparedValueDate) ? this.updateData.preparedValueDate : '',
            'preparedTransactionDate': (this.updateData && this.updateData.preparedTransactionDate) ? this.updateData.preparedTransactionDate : '',
            'preparedUserId': (this.updateData && this.updateData.preparedUser && this.updateData.preparedUser.id) ? this.updateData.preparedUser.id : this.user.id,
            'preparedUsername': (this.updateData && this.updateData.preparedUser && this.updateData.preparedUser.name) ? this.updateData.preparedUser.name : this.user.name,
            'checkedValueDate': (this.updateData && this.updateData.checkedValueDate) ? this.updateData.checkedValueDate : '',
            'checkedTransactionDate': (this.updateData && this.updateData.checkedTransactionDate) ? this.updateData.checkedTransactionDate : '',
            'checkedUserId': (this.updateData && this.updateData.checked && this.updateData.checkedUser.id) ? this.updateData.checkedUser.id : this.user.id,
            'checkedUsername': (this.updateData && this.updateData.checked && this.updateData.checkedUser.name) ? this.updateData.checkedUser.name : this.user.name,
            'postedValueDate': (this.updateData && this.updateData.postedValueDate) ? this.updateData.postedValueDate : '',
            'postedTransactionDate': (this.updateData && this.updateData.postedTransactionDate) ? this.updateData.postedTransactionDate : '',
            'postedUserId': (this.updateData && this.updateData.posted && this.updateData.postedUser.id) ? this.updateData.postedUser.id : this.user.id,
            'postedUsername': (this.updateData && this.updateData.posted && this.updateData.postedUser.name) ? this.updateData.postedUser.name : this.user.name,
            'jvReference': (this.updateData && this.updateData.jvReference) ? this.updateData.jvReference : '',
            'transactionDetails': (this.updateData && this.updateData.transactionDetails) ? this.updateData.transactionDetails : '',
            'fundSegmentName': (this.updateData && this.updateData.fundSegment.name) ? this.updateData.fundSegment.name : ''
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
            this.journalVoucherCreateForm.patchValue({
                fundSegmentId: response.id,
                fundSegmentCode: response.id,
                disabled: true
            });
        });
    }

    updateJournalVoucher() {
        const params = {
            'jvSourceApp': this.journalVoucherCreateForm.value.jvSourceApp ? this.journalVoucherCreateForm.value.jvSourceApp : '',
            'batchNumber': this.journalVoucherCreateForm.value.batchNumber ? this.journalVoucherCreateForm.value.batchNumber : '',
            'jvValueDate': this.journalVoucherCreateForm.value.jvValueDate ? moment(this.journalVoucherCreateForm.value.jvValueDate).format('YYYY-MM-DD') : '',
            'fundSegmentId': this.journalVoucherCreateForm.value.fundSegmentId ? this.journalVoucherCreateForm.value.fundSegmentId : '',
            'fundSegmentCode': this.journalVoucherCreateForm.value.fundSegmentCode ? this.journalVoucherCreateForm.value.fundSegmentCode : '',
            'preparedValueDate': this.journalVoucherCreateForm.value.preparedValueDate ? moment(this.journalVoucherCreateForm.value.preparedValueDate).format('YYYY-MM-DD') : '',
            'preparedTransactionDate': this.journalVoucherCreateForm.value.preparedTransactionDate ? moment(this.journalVoucherCreateForm.value.preparedTransactionDate).format('YYYY-MM-DD') : '',
            'preparedUserId': this.journalVoucherCreateForm.value.preparedValueDate && this.journalVoucherCreateForm.value.preparedUserId ? this.journalVoucherCreateForm.value.preparedUserId : '',
            'preparedUsername': this.journalVoucherCreateForm.value.preparedValueDate && this.journalVoucherCreateForm.value.preparedUsername ? this.journalVoucherCreateForm.value.preparedUsername : '',
            'checkedValueDate': this.journalVoucherCreateForm.value.checkedValueDate ? moment(this.journalVoucherCreateForm.value.checkedValueDate).format('YYYY-MM-DD') : '',
            'checkedTransactionDate': this.journalVoucherCreateForm.value.checkedTransactionDate ? moment(this.journalVoucherCreateForm.value.checkedTransactionDate).format('YYYY-MM-DD') : '',
            'checkedUserId': this.journalVoucherCreateForm.value.checkedValueDate && this.journalVoucherCreateForm.value.checkedUserId ? this.journalVoucherCreateForm.value.checkedUserId : '',
            'checkedUsername': this.journalVoucherCreateForm.value.checkedValueDate && this.journalVoucherCreateForm.value.checkedUsername ? this.journalVoucherCreateForm.value.checkedUsername : '',
            'postedValueDate': this.journalVoucherCreateForm.value.postedValueDate ? moment(this.journalVoucherCreateForm.value.postedValueDate).format('YYYY-MM-DD') : '',
            'postedTransactionDate': this.journalVoucherCreateForm.value.postedTransactionDate ? moment(this.journalVoucherCreateForm.value.postedTransactionDate).format('YYYY-MM-DD') : '',
            'postedUserId': this.journalVoucherCreateForm.value.postedValueDate && this.journalVoucherCreateForm.value.postedUserId ? this.journalVoucherCreateForm.value.postedUserId : '',
            'postedUsername': this.journalVoucherCreateForm.value.postedValueDate && this.journalVoucherCreateForm.value.postedUsername ? this.journalVoucherCreateForm.value.postedUsername : '',
            'jvReference': this.journalVoucherCreateForm.value.jvReference ? this.journalVoucherCreateForm.value.jvReference : '',
            'transactionDetails': this.journalVoucherCreateForm.value.transactionDetails ? this.journalVoucherCreateForm.value.transactionDetails : '',
            'fundSegmentName': this.journalVoucherCreateForm.value.fundSegmentName ? this.journalVoucherCreateForm.value.fundSegmentName : ''
        };
        this.isSubmitted = true;
        if (!this.journalVoucherCreateForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.journalVoucherService.update(this.updateData.id, params).subscribe(data => {
                this.journalVoucherCreateForm.reset();
                this.isSubmitted = false;
                this.matDialogRef.close(this.journalVoucherCreateForm);
            });
        }
    }
}
