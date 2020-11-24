import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {JournalVoucherLedgerReportService} from "../../../../shared/services/journal-voucher-ledger-report.service";
import {MatDialog} from "@angular/material/dialog";
import {SchedulePayeeCustomerComponent} from './schedule-payee-customer/schedule-payee-customer.component';
import {SchedulePayeeEmployeeComponent} from "./schedule-payee-employee/schedule-payee-employee.component";
import {PaymentVoucherCreateComponent} from './payment-voucher-create/payment-voucher-create.component';
import {AlertService} from "../../../../shared/services/alert.service";
import {PaymentVoucherService} from "../../../../shared/services/payment-voucher.service";
import * as moment from "moment";
import {TreasureReportService} from "../../../../shared/services/treasure-report.service";

@Component({
    selector: 'app-payment-voucher',
    templateUrl: './payment-voucher.component.html',
    styleUrls: ['./payment-voucher.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PaymentVoucherComponent implements OnInit {
    filterPaymentVoucherForm: FormGroup;
    createPaymentVoucherForm: FormGroup;
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
    sourceUnit = [];
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
    types = [
        {
            'name': 'Expenditure Voucher',
            'value': 'EXPENDITURE_VOUCHER'
        },
        {
            'name': 'Non-Personal Advances',
            'value': 'NON_PERSONAL_ADVANCES'
        },
        {
            'name': 'Personal Advances',
            'value': 'PERSONAL_ADVANCES'
        },
        {
            'name': 'Special Imprest',
            'value': 'SPECIAL_IMPREST'
        },
        {
            'name': 'Standing Imprest',
            'value': 'STANDING_IMPREST'
        },
        {
            'name': 'Transfer - Cashbook',
            'value': 'TRANSFER_CASHBOOKS'
        },
        {
            'name': 'Remitance',
            'value': 'REMITANCE'
        },
        {
            'name': 'Deposit',
            'value': 'DEPOSIT'
        },
        {
            'name': 'Expenditure Credit',
            'value': 'EXPENDITURE_CREDIT'
        },
    ];
    dialogRef: any;

    constructor(private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private paymentVoucherService: PaymentVoucherService,
                private treasureReportService: TreasureReportService) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getPyamentVoucher({});
        this.getVoucherSourceUnitList()
    }

    refresh() {
        this.filterPaymentVoucherForm = this.fb.group({
            'status': ['ALL'],
            'search': ['']
        });
        this.createPaymentVoucherForm = this.fb.group({
            'sourceUnit': [''],
            'type': ['']
        });
    }

    getPyamentVoucher(params) {
        this.paymentVoucherService.get(params).subscribe(data => {
            this.paymentVoucherData = data.items;
            if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
                this.paymentVoucherData.forEach(d => {
                    d['lastActioned'] = moment(d['updatedAt']).format('YYYY-MM-DD');
                    d['isOpen'] = !this.panelOpenState;
                    this.getChildReportData(d);
                });
                this.panelOpenState = !this.panelOpenState;
            }
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
        /*if (item && item.id) {
            params['parentId'] = item.id;
            this.jvLedgerReportService.getStatementPositionReport(params).subscribe(data => {
                item['childs'] = data.items;
            });
        }*/
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
        });
    }

    filterPaymentVoucher() {
        console.log('filterPaymentVoucherForm', this.filterPaymentVoucherForm.value);
    }

    addPaymentVoucher() {
        if (this.createPaymentVoucherForm.value['sourceUnit'] === '') {
            this.alertService.showErrors('Please Choose Voucher Source Unit');
            return;
        } else if (this.createPaymentVoucherForm.value['type'] === '') {
            this.alertService.showErrors('Please Choose Payment Voucher Type');
            return;
        }

        if (this.types && this.types.length > 0 && this.sourceUnit && this.sourceUnit.length > 0) {
            let selectedType = '';
            this.types.forEach(type => {
                if (type.value === this.createPaymentVoucherForm.value['type']) {
                    selectedType = type.name;
                }
            });

            let selectedSource = [];
            this.sourceUnit.forEach(source => {
                if (source.id === this.createPaymentVoucherForm.value['sourceUnit']) {
                    selectedSource.push({
                        'name': source.id + ' - ' + source.longName,
                        'value': source.id
                    });
                }
            });

            this.dialogRef = this._matDialog.open(PaymentVoucherCreateComponent, {
                panelClass: 'contact-form-dialog',
                data: {action: 'CREATE', header: selectedType, source: selectedSource}
            });
            this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
                // console.log('response', response);
                if (!response) {
                    return;
                }
            });
        }
    }

    getVoucherSourceUnitList() {
        this.sourceUnit = [];
        this.treasureReportService.list({page: -1}).subscribe(data => {
            this.sourceUnit = data.items;
        });
    }
}
