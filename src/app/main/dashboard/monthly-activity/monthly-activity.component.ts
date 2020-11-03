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
    // panelOpenState = false;
    data = [];
    childData = [];
    /*data = [
        {
            name: 'Current Assets',
            combinedCode: 31,
            january: 0,
            february: 0,
            march: 0,
            april: 0,
            may: 100,
            june: 0,
            july: 0,
            august: 200,
            september: 0,
            november: 0,
            december: 0,
            previousYears: 0,
            total: 300,
            child: [
                {
                    name: 'Current Assets',
                    combinedCode: 31,
                    january: 0,
                    february: 0,
                    march: 0,
                    april: 0,
                    may: 100,
                    june: 0,
                    july: 0,
                    august: 200,
                    september: 0,
                    november: 0,
                    december: 0,
                    previousYears: 0,
                    total: 300,
                    child: [
                        {
                            name: '1',
                            combinedCode: 31,
                            january: 0,
                            february: 0,
                            march: 0,
                            april: 0,
                            may: 100,
                            june: 0,
                            july: 0,
                            august: 200,
                            september: 0,
                            november: 0,
                            december: 0,
                            previousYears: 0,
                            total: 300
                        },
                        {
                            name: '2',
                            combinedCode: 31,
                            january: 0,
                            february: 0,
                            march: 0,
                            april: 0,
                            may: 100,
                            june: 0,
                            july: 0,
                            august: 200,
                            september: 0,
                            november: 0,
                            december: 0,
                            previousYears: 0,
                            total: 300,
                            child: [
                                {
                                    name: 'Current Assets',
                                    combinedCode: 31,
                                    january: 0,
                                    february: 0,
                                    march: 0,
                                    april: 0,
                                    may: 100,
                                    june: 0,
                                    july: 0,
                                    august: 200,
                                    september: 0,
                                    november: 0,
                                    december: 0,
                                    previousYears: 0,
                                    total: 300
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Current Assets',
                    combinedCode: 31,
                    january: 0,
                    february: 0,
                    march: 0,
                    april: 0,
                    may: 100,
                    june: 0,
                    july: 0,
                    august: 200,
                    september: 0,
                    november: 0,
                    december: 0,
                    previousYears: 0,
                    total: 300
                }
            ]
        },
        {
            name: 'Non-Current Assets',
            combinedCode: 32,
            january: 0,
            february: 0,
            march: 0,
            april: 0,
            may: 100,
            june: 0,
            july: 0,
            august: 200,
            september: 0,
            november: 0,
            december: 0,
            previousYears: 0,
            total: 300
        }
    ];*/
    dialogRef: any;
    filterJVLegderSiblingReportForm: FormGroup;
    economicSegments = [];
    @ViewChild(MatAccordion) accordion: MatAccordion;
    panelOpenState: boolean = false;

    constructor(private jvLedgerReportService: JournalVoucherLedgerReportService,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.getMonthlyActivityData({});

        this.filterJVLegderSiblingReportForm = this.fb.group({
            'economicSegmentId': ['']
        });
        // this.getChildData({id: 7}, 1);
    }

    getMonthlyActivityData(params) {
        this.jvLedgerReportService.getMonthlyActivityReport(params).subscribe(data => {
            this.data = data.items;
        });
    }

    getChildData(item, index?) {
        console.log('--->>>anup');
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
        console.log('--->>>open all');
        this.panelOpenState = !this.panelOpenState;
        if (this.data && this.data.length) {
            this.data.forEach(d => {
                console.log('--->>data', d);
                this.getChildData(d);
            });
        }
    }
}
