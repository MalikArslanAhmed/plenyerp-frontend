import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {JournalVoucherLedgerReportService} from "../../../../shared/services/journal-voucher-ledger-report.service";
import {AlertService} from "../../../../shared/services/alert.service";
import * as moment from "moment";
import {CashbookCreateComponent} from "../cashbook/cashbook-create/cashbook-create.component";
import {MatDialog} from "@angular/material/dialog";
import {SchedulePayeeCustomerComponent} from './schedule-payee-customer/schedule-payee-customer.component';
import {SchedulePayeeEmployeeComponent} from "./schedule-payee-employee/schedule-payee-employee.component";

@Component({
    selector: 'app-payment-voucher',
    templateUrl: './payment-voucher.component.html',
    styleUrls: ['./payment-voucher.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PaymentVoucherComponent implements OnInit {
    filterPaymentVoucherForm: FormGroup;
    searchPaymentVoucherForm: FormGroup;
    paymentVoucherData = [
        {
            'year': '2018',
            'deptalNo': '1200003',
            'payeeName': 'Abhishek Mishra',
            'amount': '20,000',
            'taxes': '0',
            'paymentRef': '1241',
            'lastActioned': '31-Dec-2018',
            'status': 'Checked',
            'payee': [
                {
                    'id': 1,
                    'name': 'Test Name',
                    'amountNet': 10000,
                    'taxes': 1000,
                    'amountTotal': 200000,
                    'details': 'New Test Details',
                    'bankTitle': 'CBI',
                    'bankAC': '1199008899',
                    'typeOfBankAC': 'Savings',
                    'bank': 'Central Bank Of India',
                    'bankBranch': 'New Delhi',
                    'sortCode': 'CBIN',
                    'paymentRef': 'New',
                    'status': 'Checked',
                },
                {
                    'id': 2,
                    'name': 'Test Name 2',
                    'amountNet': 10000,
                    'taxes': 1000,
                    'amountTotal': 200000,
                    'details': 'New Test Details',
                    'bankTitle': 'CBI',
                    'bankAC': '1199008899',
                    'typeOfBankAC': 'Savings',
                    'bank': 'Central Bank Of India',
                    'bankBranch': 'New Delhi',
                    'sortCode': 'CBIN',
                    'paymentRef': 'New',
                    'status': 'Checked',
                }
            ],
            'economic': [
                {
                    'id': 1,
                    'account': 'Test Name',
                    'amount': 10000
                },
                {
                    'id': 2,
                    'account': 'Test Name 2',
                    'amount': 10000
                }
            ]
        },
        {
            'year': '2019',
            'deptalNo': '1200002',
            'payeeName': 'Ankit Mishra',
            'amount': '35,000',
            'taxes': '0',
            'paymentRef': '1214',
            'lastActioned': '31-Dec-2018',
            'status': 'Approved',
            'payee': [
                {
                    'id': 1,
                    'name': 'Test Name',
                    'amountNet': 10000,
                    'taxes': 1000,
                    'amountTotal': 200000,
                    'details': 'New Test Details',
                    'bankTitle': 'CBI',
                    'bankAC': '1199008899',
                    'typeOfBankAC': 'Savings',
                    'bank': 'Central Bank Of India',
                    'bankBranch': 'New Delhi',
                    'sortCode': 'CBIN',
                    'paymentRef': 'New',
                    'status': 'Checked',
                },
                {
                    'id': 2,
                    'name': 'Test Name 2',
                    'amountNet': 10000,
                    'taxes': 1000,
                    'amountTotal': 200000,
                    'details': 'New Test Details',
                    'bankTitle': 'CBI',
                    'bankAC': '1199008899',
                    'typeOfBankAC': 'Savings',
                    'bank': 'Central Bank Of India',
                    'bankBranch': 'New Delhi',
                    'sortCode': 'CBIN',
                    'paymentRef': 'New',
                    'status': 'Checked',
                }
            ],
            'economic': [
                {
                    'id': 1,
                    'account': 'Test Name',
                    'amount': 10000
                },
                {
                    'id': 2,
                    'account': 'Test Name 2',
                    'amount': 10000
                }
            ]
        }
    ];
    panelOpenState: boolean = false;
    sourceUnit = [
        {
            'name': 'Loan & Advances',
            'value': 'LOAN_AND_ADVANCES'
        }
    ];
    statuses = [
        {
            'name': 'All',
            'value': 'ALL'
        },
        {
            'name': 'New',
            'value': 'NEW'
        },
        {
            'name': 'Checked',
            'value': 'CHECKED'
        },
        {
            'name': 'Approved',
            'value': 'APPROVED'
        },
        {
            'name': 'Budget Codes Verified',
            'value': 'BUDGET_CODES_VERIFIED'
        },
        {
            'name': 'Audited',
            'value': 'AUDITED'
        },
        {
            'name': 'Closed',
            'value': 'CLOSED'
        },
        {
            'name': 'Posted to GL (#)',
            'value': 'POSTED_TO_gl'
        },
        {
            'name': 'On Mandate',
            'value': 'ON_MANDATE'
        }
    ];
    dialogRef: any;

    constructor(private jvLedgerReportService: JournalVoucherLedgerReportService,
                private fb: FormBuilder,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.filterPaymentVoucherForm = this.fb.group({
            'sourceUnit': [''],
            'status': ['']
        });
        this.searchPaymentVoucherForm = this.fb.group({
            'search': ['']
        });
    }

    /*getStatementPositionData(params) {
        this.jvLedgerReportService.getStatementPositionReport(params).subscribe(data => {
            this.paymentVoucherData = data.items;
            if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
                this.paymentVoucherData.forEach(d => {
                    d['isOpen'] = !this.panelOpenState;
                    this.getChildReportData(d);
                });
                this.panelOpenState = !this.panelOpenState;
            }
        });
    }*/

    getChildReportData(item) {
        const params = {};
        if (item && item.id) {
            params['parentId'] = item.id;
            this.jvLedgerReportService.getStatementPositionReport(params).subscribe(data => {
                item['childs'] = data.items;
            });
        }
    }

    scheduleEmployee() {
        this.dialogRef = this._matDialog.open(SchedulePayeeEmployeeComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            // this.getUserRoleList.getcashbookList();
        });
    }

    scheduleCustomers() {
        this.dialogRef = this._matDialog.open(SchedulePayeeCustomerComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            // this.getUserRoleList.getcashbookList();
        });
    }

    filterPaymentVoucher() {
        console.log('filterPaymentVoucherForm', this.filterPaymentVoucherForm.value);
    }

    search() {
        console.log('searchPaymentVoucherForm', this.searchPaymentVoucherForm.value);
    }
}
