import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {JournalVoucherLedgerReportService} from 'app/shared/services/journal-voucher-ledger-report.service';
import {fuseAnimations} from '../../../../@fuse/animations';
import {AlertService} from "../../../shared/services/alert.service";

@Component({
    selector: 'app-journal-voucher-ledger-report',
    templateUrl: './journal-voucher-ledger-report.component.html',
    styleUrls: ['./journal-voucher-ledger-report.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class JournalVoucherLedgerReportComponent implements OnInit {
    jvReportData: any;
    filterJVLegderReportForm: FormGroup;
    sourceApp = [
        {
            'id': 1,
            'name': 'Economic Segment'
        },
        {
            'id': 2,
            'name': 'Programme Segment'
        }
    ];

    constructor(private jvLedgerReportService: JournalVoucherLedgerReportService,
                private fb: FormBuilder,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.filterJVLegderReportForm = this.fb.group({
            'type': [''],
            'id': ['']
        });
        this.getLedgerReport({});
    }

    getLedgerReport(params) {
        this.jvLedgerReportService.getJVLedgerReport(params).subscribe(data => {
            this.jvReportData = data.items
        });
    }

    submitReport() {
        if (this.filterJVLegderReportForm.value.type === '' || this.filterJVLegderReportForm.value.id === '') {
            if (this.filterJVLegderReportForm.value.type === '') {
                this.alertService.showErrors('Please choose type of selection');
            } else if (this.filterJVLegderReportForm.value.id === '') {
                this.alertService.showErrors('Please fill corresponding id');
            }
        } else {
            const params = {};
            if (this.filterJVLegderReportForm.value.type === 1) {
                params['economicSegmentId'] = this.filterJVLegderReportForm.value.id
            } else if (this.filterJVLegderReportForm.value.type === 2) {
                params['programmeSegmentId'] = this.filterJVLegderReportForm.value.id
            }
            this.getLedgerReport(params);
        }
    }
}
