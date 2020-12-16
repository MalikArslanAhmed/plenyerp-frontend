import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-report-list-headers',
    templateUrl: './report-list-headers.component.html',
    styleUrls: ['./report-list-headers.component.scss']
})
export class ReportListHeadersComponent implements OnInit {
    dialogTitle: any;
    listHeadersForm: FormGroup;
    isSubmitted = false;
    // managers: any = [];
    updateData: any;

    // availableColumns = ['SN', 'Title', 'File No', 'Staff ID', 'Gender', 'Marital Status', 'Emp. Photo', 'Expected Exit Date', 'Exited', 'First Name', 'Last Name', 'Grade Level', 'Type of Exit', 'Type of Appointment', 'TIN No', 'Street', 'State', 'PFA No', 'Salary Scale', 'RefNo TypeOfExit', 'RefNo TypeOfAppointment', 'Qualifications', 'Permanent Staff', 'Pension Started', 'New Enrollment', 'Passport No', 'Passport Issued on', 'Passport Issued at', 'Passport Expires on', 'NHF No', 'Nature Of Exit', 'Nationality', 'National ID No', 'Mobile Phone', 'Maiden Name', 'Job Position', 'Grade Level Step', 'Department', 'Address', 'Address Country', 'Email', 'Drivers Licence No', 'Designation', 'Date Last Increment', 'Date Pension Started', 'Date of Birth', 'Date Last Promoted', 'Date Current Appt', 'Date Employed', 'Date Assumed Duty', 'Confirmed', 'Address LGA', 'City', 'Address State', 'Citizen Country', 'Citizen LGA', 'Citizen Region', 'Citizen State', 'Confirmation Due Date'];
    availableColumns = ['S.No.', 'PV Year', 'Deptal No.', 'Payee Names', 'Amount (Net)', 'Taxes', 'Total Amount', 'Payment Ref. (#)', 'Last Actioned', 'Currency',
        'Value Date', 'Type Of Payee', 'Xrate', 'XRate To USD', 'Ref. AIE', 'Ref. AIE Title', 'Prepared Date', 'COA: Admin', 'COA: Programme', 'COA: Geo Code',
        'COA: Fund', 'COA: Functional', 'COA: Economic', 'Admin FullCode', 'Admin: Title', 'Programme: Title', 'Programme: Full Code', 'Economic: Full Code',
        'Economic: Title', 'Geo: Title', 'Geo: Full Code', 'Fund: Title', 'Fund: Full Code', 'Functional: Title', 'Functional: Full Code',
        'Checking Officer', 'Paying Officer', 'Financials Controller', 'Payee Id', 'Details/Naration', 'Account',
        'Amount', 'Parent Voucher Year', 'Parent Voucher Ref', 'Paid TDate', 'Checked?', 'Approved?', 'Audited?',
        'Approved Date', 'Checked Date', 'Audited Date', 'Paid?', 'Paid Date', 'Bank Acct ID', 'Approval RefNo', 'JV RefNo', 'Status'];
    selectedColumns = [];


    constructor(public matDialogRef: MatDialogRef<ReportListHeadersComponent>,
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
