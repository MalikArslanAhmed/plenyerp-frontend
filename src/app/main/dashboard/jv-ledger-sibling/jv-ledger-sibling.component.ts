import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {fuseAnimations} from '@fuse/animations';
import {AlertService} from 'app/shared/services/alert.service';
import {JournalVoucherLedgerReportService} from 'app/shared/services/journal-voucher-ledger-report.service';
import * as moment from 'moment';
import {EconomicSegmentSelectComponent} from '../journal-voucher/economic-segment-select/economic-segment-select.component';

@Component({
    selector: 'app-jv-ledger-sibling',
    templateUrl: './jv-ledger-sibling.component.html',
    styleUrls: ['./jv-ledger-sibling.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class JvLedgerSiblingComponent implements OnInit {
    dialogRef: any;
    filterJVLegderSiblingReportForm: FormGroup;
    economicSegments = [];
    siblingReportData = [];

    constructor(private jvLedgerReportService: JournalVoucherLedgerReportService,
                private fb: FormBuilder,
                private alertService: AlertService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.filterJVLegderSiblingReportForm = this.fb.group({
            'economicSegmentId': [''],
            'fromDate': [''],
            'toDate': ['']
        });
    }

    economicSegmentSelect() {
        this.dialogRef = this._matDialog.open(EconomicSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.economicSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.filterJVLegderSiblingReportForm.patchValue({
                economicSegmentId: response.id,
                disabled: true
            });
        });
    }

    submitReport() {
        const params = {}
        if (this.filterJVLegderSiblingReportForm.value.economicSegmentId === '') {
            this.alertService.showErrors("Please Select Economic Segment")
        } else {
            if (this.filterJVLegderSiblingReportForm.value.fromDate === '' && this.filterJVLegderSiblingReportForm.value.toDate === '') {
                params['economicSegmentId'] = this.filterJVLegderSiblingReportForm.value.economicSegmentId;
                this.getJVLedgerSiblingReport(params);
            }
            if (this.filterJVLegderSiblingReportForm.value.fromDate && this.filterJVLegderSiblingReportForm.value.toDate === '') {
                this.alertService.showErrors("To date is required");
            } else if (this.filterJVLegderSiblingReportForm.value.toDate && this.filterJVLegderSiblingReportForm.value.fromDate === '') {
                this.alertService.showErrors("From Date is required");
            }
            if (this.filterJVLegderSiblingReportForm.value.toDate && this.filterJVLegderSiblingReportForm.value.fromDate) {
                const f = this.filterJVLegderSiblingReportForm.value;
                const fromDate = moment(f.fromDate).format('YYYY-MM-DD');
                const toDate = moment(f.toDate).format('YYYY-MM-DD');
                params['fromDate'] = fromDate;
                params['toDate'] = toDate;
                this.getJVLedgerSiblingReport(params);
            }
        }
    }

    getJVLedgerSiblingReport(params) {
        this.jvLedgerReportService.getJVLedgerSiblingReport(params).subscribe(data => {
            this.siblingReportData = data.items;
        });
    }
}
