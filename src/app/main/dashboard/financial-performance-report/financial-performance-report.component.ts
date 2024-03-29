import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '@fuse/animations';
import {AlertService} from 'app/shared/services/alert.service';
import {JournalVoucherLedgerReportService} from 'app/shared/services/journal-voucher-ledger-report.service';
import * as moment from 'moment';

@Component({
    selector: 'app-financial-performance-report',
    templateUrl: './financial-performance-report.component.html',
    styleUrls: ['./financial-performance-report.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FinancialPerformanceReportComponent implements OnInit {
    filterFinancialPerformanceReportForm: FormGroup;
    financialPerformaceData = [];
    panelOpenState: boolean = false;

    constructor(private jvLedgerReportService: JournalVoucherLedgerReportService,
                private fb: FormBuilder,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.filterFinancialPerformanceReportForm = this.fb.group({
            'from': ['', Validators.required],
            'to': ['', Validators.required]
        });
        this.getFinancialPerformanceData({});
    }

    getFinancialPerformanceData(params) {
        this.jvLedgerReportService.getFinanceStatementReport(params).subscribe(data => {
            this.financialPerformaceData = data.items;
            if (this.financialPerformaceData && this.financialPerformaceData.length > 0) {
                this.financialPerformaceData.forEach(d => {
                    d['isOpen'] = !this.panelOpenState;
                    this.getChildReportData(d);
                });
                this.panelOpenState = !this.panelOpenState;
            }
        });
    }

    getChildReportData(item) {
        const params = {};
        if (item && item.id) {
            params['parentId'] = item.id;
            this.jvLedgerReportService.getFinanceStatementReport(params).subscribe(data => {
                item['childs'] = data.items;
            });
        }
    }

    filterFinancialPerformance() {
        if (this.filterFinancialPerformanceReportForm.value.from === '' || this.filterFinancialPerformanceReportForm.value.to === '') {
            if (this.filterFinancialPerformanceReportForm.value.from === '') {
                this.alertService.showErrors("From date is required");
            } else if (this.filterFinancialPerformanceReportForm.value.to === '') {
                this.alertService.showErrors("To date is required");
            }
        } else {
            const f = this.filterFinancialPerformanceReportForm.value;
            const fromDate = moment(f.from).format('YYYY-MM-DD');
            const toDate = moment(f.to).format('YYYY-MM-DD');
            const params = {
                fromDate: fromDate,
                toDate: toDate
            };
            this.getFinancialPerformanceData(params);
        }
    }

    openAll() {
        if (this.financialPerformaceData && this.financialPerformaceData.length > 0) {
            this.financialPerformaceData.forEach(d => {
                d['isOpen'] = !this.panelOpenState;
                this.getChildReportData(d);
            });
            this.panelOpenState = !this.panelOpenState;
        }
    }

}
