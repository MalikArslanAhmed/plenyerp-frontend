import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '@fuse/animations';
import {AlertService} from 'app/shared/services/alert.service';
import {JournalVoucherLedgerReportService} from 'app/shared/services/journal-voucher-ledger-report.service';
import * as moment from 'moment';

@Component({
    selector: 'app-statement-of-position',
    templateUrl: './statement-of-position.component.html',
    styleUrls: ['./statement-of-position.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StatementOfPositionComponent implements OnInit {
    filterStatementOfPositionReportForm: FormGroup;
    statmentPositionData = [];
    childStatementPositionData = [];

    constructor(private jvLedgerReportService: JournalVoucherLedgerReportService,
                private fb: FormBuilder,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.filterStatementOfPositionReportForm = this.fb.group({
            'from': ['', Validators.required],
            'to': ['', Validators.required]
        });
        this.getStatementPositionData({});
    }
 
    getStatementPositionData(params) {
        this.jvLedgerReportService.getStatementPositionReport(params).subscribe(data => {
            this.statmentPositionData = data.items;
            // this.assetData = this.statmentPositionData['asset'];
            // this.liabilitiesData = this.statmentPositionData['liabilities'];
        });
    }

    getChildReportData(data) {
        const params = {};
        if (data && data.id) {
            params['parentId'] = data.id;
            this.childStatementPositionData = [];
            this.jvLedgerReportService.getStatementPositionReport(params).subscribe(data => {
                this.childStatementPositionData = data.items;
            })
        }
    }

    filterStatementOfPosition() {
        if (this.filterStatementOfPositionReportForm.value.from === '' || this.filterStatementOfPositionReportForm.value.to === '') {
            if (this.filterStatementOfPositionReportForm.value.from === '') {
                this.alertService.showErrors("From date is required");
            } else if (this.filterStatementOfPositionReportForm.value.to === '') {
                this.alertService.showErrors("To date is required");
            }
        } else {
            const f = this.filterStatementOfPositionReportForm.value;
            const fromDate = moment(f.from).format('YYYY-MM-DD');
            const toDate = moment(f.to).format('YYYY-MM-DD');
            const params = {
                fromDate: fromDate,
                toDate: toDate
            };
            this.getStatementPositionData(params);
        }
    }
}
