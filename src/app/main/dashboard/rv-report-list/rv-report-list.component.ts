import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {fuseAnimations} from '@fuse/animations';
import {AlertService} from 'app/shared/services/alert.service';
import * as moment from 'moment';
import {PaymentReportService} from '../../../shared/services/payment-report.service';
import {RvReportListHeadersComponent} from './rv-report-list-headers/rv-report-list-headers.component';
import {RvReportService} from '../../../shared/services/rv-report.service';

@Component({
    selector: 'app-rv-report-list',
    templateUrl: './rv-report-list.component.html',
    styleUrls: ['./rv-report-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RvReportListComponent implements OnInit {
    dialogRef: any;
    rvPaymentReportForm: FormGroup;
    rvPaymentReportData = [];
    economicSegments = [];
    displayedColumns = ['S.No.', 'RV Year', 'Deptal No.', 'Payee Names', 'Amount (Net)', 'Payment Ref. (#)', 'Last Actioned', 'Status'];
    panelOpenState: boolean = false;

    constructor(private rvReportService: RvReportService,
                private fb: FormBuilder,
                private alertService: AlertService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.rvPaymentReportForm = this.fb.group({
            'fromDate': [''],
            'toDate': ['']
        });
        this.getRvReportList({});
    }

    getChildReportData(item) {
        const params = {};
        if (item && item.id) {
            params['parentId'] = item.id;
            this.rvReportService.getSchedulePayee(item.id, {page: -1}).subscribe(data => {
                item['payees'] = data.items;
            });
        }
    }

    openAll() {
        if (this.rvPaymentReportData && this.rvPaymentReportData.length > 0) {
            this.rvPaymentReportData.forEach(d => {
                d['isOpen'] = !this.panelOpenState;
                this.getChildReportData(d);
            });
            this.panelOpenState = !this.panelOpenState;
        }
    }

    getRvReportList(params, openAll?) {
        this.rvReportService.get(params).subscribe(data => {
            this.rvPaymentReportData = data.items;
            if (this.rvPaymentReportData && this.rvPaymentReportData.length > 0) {
                this.rvPaymentReportData.forEach(d => {
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
        this.rvPaymentReportData[index].checked = event.checked;
    }
    tabClick(report, event) {
        if (event.tab['textLabel'] === 'Economic Codes') {
            this.getEconomicCodes(report);
        }
    }
    getEconomicCodes(report) {
        this.rvReportService.getScheduleEconomic(report.id).subscribe(data => {
            report['economic'] = data.items;
        });
    }

    addColumn() {
        this.dialogRef = this._matDialog.open(RvReportListHeadersComponent, {
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
