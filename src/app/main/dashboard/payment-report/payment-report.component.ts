import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {fuseAnimations} from '@fuse/animations';
import {AlertService} from 'app/shared/services/alert.service';
import {JournalVoucherLedgerReportService} from 'app/shared/services/journal-voucher-ledger-report.service';
import * as moment from 'moment';
import {EconomicSegmentSelectComponent} from '../journal-voucher/economic-segment-select/economic-segment-select.component';
import {PaymentReportService} from '../../../shared/services/payment-report.service';
import {EmpListHeadersComponent} from '../employees/employee-list/emp-list-headers/emp-list-headers.component';
import {ReportListHeadersComponent} from './report-list-headers/report-list-headers.component';

@Component({
    selector: 'app-payment-report',
    templateUrl: './payment-report.component.html',
    styleUrls: ['./payment-report.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PaymentReportComponent implements OnInit {
    dialogRef: any;
    paymentReportForm: FormGroup;
    paymentReportData = [];
    economicSegments = [];
    displayedColumns = ['S.No.', 'PV Year', 'Deptal No.', 'Payee Names', 'Amount (Net)', 'Taxes', 'Payment Ref. (#)', 'Last Actioned', 'Status'];
    panelOpenState: boolean = false;

    constructor(private paymentReportService: PaymentReportService,
                private fb: FormBuilder,
                private alertService: AlertService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.paymentReportForm = this.fb.group({
            'fromDate': [''],
            'toDate': ['']
        });
        this.getPyamentVoucher({});
    }

    getChildReportData(item) {
        const params = {};
        if (item && item.id) {
            params['parentId'] = item.id;
            this.paymentReportService.getSchedulePayee(item.id, {page: -1}).subscribe(data => {
                item['payees'] = data.items;
            });
        }
    }

    openAll() {
        if (this.paymentReportData && this.paymentReportData.length > 0) {
            this.paymentReportData.forEach(d => {
                d['isOpen'] = !this.panelOpenState;
                this.getChildReportData(d);
            });
            this.panelOpenState = !this.panelOpenState;
        }
    }

    getPyamentVoucher(params, openAll?) {
        this.paymentReportService.get(params).subscribe(data => {
            this.paymentReportData = data.items;
            if (this.paymentReportData && this.paymentReportData.length > 0) {
                this.paymentReportData.forEach(d => {
                    d['checked'] = false;
                    d['lastActioned'] = moment(d['updatedAt']).format('YYYY-MM-DD');
                    d['isOpen'] = openAll ? true : !this.panelOpenState;
                    this.getChildReportData(d);
                });
                this.panelOpenState = !this.panelOpenState;
            }
        });
    }

    checkPV(index, event) {
        this.paymentReportData[index].checked = event.checked;
    }
    tabClick(report, event) {
        if (event.tab['textLabel'] === 'Economic Codes') {
            this.getEconomicCodes(report);
        }
    }
    getEconomicCodes(report) {
        this.paymentReportService.getScheduleEconomic(report.id).subscribe(data => {
            report['economic'] = data.items;
        });
    }

    addColumn() {
        this.dialogRef = this._matDialog.open(ReportListHeadersComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', selectedCol: this.displayedColumns}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            // this.getEmployees();
            const formData = response.getRawValue();
            this.displayedColumns = formData.headers;
        });
    }

    getColumnData(columnData: string) {
        let isColumnDataMatch: boolean = false;
        // console.log('---sn', columnData);
        if (this.displayedColumns && this.displayedColumns.length) {
            this.displayedColumns.forEach(val => {
                if (val === columnData) {
                    isColumnDataMatch = true;
                }
            });
        }
        return isColumnDataMatch;

    }
}
