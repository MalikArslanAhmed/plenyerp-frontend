import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {JournalVoucherLedgerReportService} from 'app/shared/services/journal-voucher-ledger-report.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EconomicSegmentSelectComponent} from '../journal-voucher/economic-segment-select/economic-segment-select.component';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';
import {AlertService} from '../../../shared/services/alert.service';
import {MonthlyActivityEconomicSegmentComponent} from './monthly-activity-economic-segment/monthly-activity-economic-segment.component';
import {MatAccordion} from '@angular/material/expansion';

@Component({
    selector: 'app-monthly-activity',
    templateUrl: './monthly-activity.component.html',
    styleUrls: ['./monthly-activity.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MonthlyActivityComponent implements OnInit {
    data = [];
    dialogRef: any;
    filterJVLegderSiblingReportForm: FormGroup;
    economicSegments = [];
    @ViewChild(MatAccordion) accordion: MatAccordion;
    panelOpenState: boolean = false;

    constructor(private jvLedgerReportService: JournalVoucherLedgerReportService,
                private fb: FormBuilder,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getMonthlyActivityData({});
        this.filterJVLegderSiblingReportForm = this.fb.group({
            'economicSegmentId': ['']
        });
    }

    getMonthlyActivityData(params) {
        this.jvLedgerReportService.getMonthlyActivityReport(params).subscribe(data => {
            this.data = data.items;
            if (this.data && this.data.length > 0) {
                this.data.forEach(d => {
                    d['isOpen'] = !this.panelOpenState;
                    this.getChildData(d);
                });
                this.panelOpenState = !this.panelOpenState;
            }
        });
    }

    getChildData(item, index?) {
        const params = {};
        params['parentId'] = item.id;
        this.jvLedgerReportService.getMonthlyActivityReport(params).subscribe(data => {
            item['child'] = data.items;
        });
    }

    economicSegmentSelect() {
        this.dialogRef = this._matDialog.open(MonthlyActivityEconomicSegmentComponent, {
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
        const params = {};
        params['economicSegmentId'] = this.filterJVLegderSiblingReportForm.value.economicSegmentId;
        this.getMonthlyActivityData(params);
    }

    openAll() {
        if (this.data && this.data.length > 0) {
            this.data.forEach(d => {
                d['isOpen'] = !this.panelOpenState;
                this.getChildData(d);
            });
            this.panelOpenState = !this.panelOpenState;
        }
    }
}
