import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-rv-report-list-headers',
    templateUrl: './rv-report-list-headers.component.html',
    styleUrls: ['./rv-report-list-headers.component.scss']
})
export class RvReportListHeadersComponent implements OnInit {
    dialogTitle: any;
    listHeadersForm: FormGroup;
    isSubmitted = false;
    // managers: any = [];
    updateData: any;
    availableColumns = ['S.No.', 'RV Year', 'Deptal No.', 'Payee Names', 'Amount (Net)', 'Payment Ref. (#)', 'Last Actioned', 'Currency',
        'Value Date', 'Type Of Payee', 'Xrate', 'XRate To USD', 'Ref. AIE', 'Ref. AIE Title', 'Prepared Date', 'COA: Admin', 'COA: Programme', 'COA: Geo Code',
        'COA: Fund', 'COA: Functional', 'COA: Economic', 'Admin FullCode', 'Admin: Title', 'Programme: Title', 'Programme: Full Code', 'Economic: Full Code',
        'Economic: Title', 'Geo: Title', 'Geo: Full Code', 'Fund: Title', 'Fund: Full Code', 'Functional: Title', 'Functional: Full Code', 'Payee Id', 'Details/Naration', 'Account',
        'Amount', 'Parent Voucher Year', 'Parent Voucher Ref', 'Paid TDate', 'Checked?', 'Approved?', 'Audited?',
        'Approved Date', 'Checked Date', 'Audited Date', 'Paid?', 'Paid Date', 'Bank Acct ID', 'Approval RefNo', 'JV RefNo', 'Status'];
    selectedColumns = [];


    constructor(public matDialogRef: MatDialogRef<RvReportListHeadersComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder) {
        this.dialogTitle = 'Update Columns';
        this.selectedColumns = _data.selectedCol;
        if (_data.manager) {
            this.updateData = _data;
        }
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh(): void {
        const config: any = {
            headers: [this.selectedColumns, Validators.required]
        };
        this.listHeadersForm = this.fb.group(config);
    }

    updateList() {
        this.isSubmitted = true;
        if (!this.listHeadersForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
            this.selectedColumns = this.listHeadersForm.getRawValue().headers;

        }
    }
}
