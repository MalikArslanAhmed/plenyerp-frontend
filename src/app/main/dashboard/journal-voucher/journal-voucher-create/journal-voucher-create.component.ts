import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-journal-voucher-create',
    templateUrl: './journal-voucher-create.component.html',
    styleUrls: ['./journal-voucher-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class JournalVoucherCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    journalVoucherCreateForm: FormGroup;
    addDetailForm: FormGroup;
    isSubmitted = false;
    updateData: any;
    addDetails = false;

    constructor(public matDialogRef: MatDialogRef<JournalVoucherCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit New Journal Voucher';
            if (_data.designation) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Create New Journal Voucher';
        }
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.journalVoucherCreateForm = this.fb.group({
            'jvRefNo': [''],
            'jvSourceApp': [''],
            'batchNo': [''],
            'jvValueDate': [''],
            'fundSegmentCode': [''],
            'valueDate': [''],
            'trxnDate': [''],
            'userId': [''],
            'username': [''],
            'jvReference': [''],
            'transactionDetails': [''],
            'fundSegmentName': ['']
        });

        this.addDetailForm = this.fb.group({
            'jvNo': [''],
            'lineNo': [''],
            'adminSegmentCode': [''],
            'fetchedAdminSegmentCode': [''],
            'originalTransactionCurrency': [''],
            'fundSegmentCode': [''],
            'sampleFundSegmentFetched': [''],
            'xRateLocalToNaira': [''],
            'officialBankXRateLocalToUsd': [''],
            'economicSegmentCode': [''],
            'fetchedEconomicSegmentCode': [''],
            'accountNameLineDetails': [''],
            'programmeSegmentCode': [''],
            'fetchedProgrammeSegmentCode': [''],
            'lineRefrence': [''],
            'functionalSegmentCode': [''],
            'fetchedFunctionalSegmentCode': [''],
            'lineValueInTrxnCurrency': [''],
            'geoCodeSegmentCode': [''],
            'fetchedGeoCodeSegmentCode': [''],
            'lvLine': [''],
            'debitCreditLineValue': ['']
        });
    }
}
