import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {JournalVoucherLedgerReportService} from 'app/shared/services/journal-voucher-ledger-report.service';
import {fuseAnimations} from '../../../../@fuse/animations';
import {AlertService} from "../../../shared/services/alert.service";
import { EconomicSegmentSelectComponent } from '../journal-voucher/economic-segment-select/economic-segment-select.component';
import { ProgrammingSegmentSelectComponent } from '../journal-voucher/programming-segment-select/programming-segment-select.component';

@Component({
    selector: 'app-journal-voucher-ledger-report',
    templateUrl: './journal-voucher-ledger-report.component.html',
    styleUrls: ['./journal-voucher-ledger-report.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class JournalVoucherLedgerReportComponent implements OnInit {
    jvReportData: any;
    dialogRef: any;
    filterJVLegderReportForm: FormGroup;
    economicSegments = [];
    programmeSegments = [];
    economicPopupShow = false;;
    programmePopupShow = false;
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
                private alertService: AlertService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.filterJVLegderReportForm = this.fb.group({
            'type': [''],
            'economicSegmentId': [''],
            'programmeSegmentId':['']
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
                
                params['economicSegmentId'] = this.filterJVLegderReportForm.value.economicSegmentId
            } else if (this.filterJVLegderReportForm.value.type === 2) {
                params['programmeSegmentId'] = this.filterJVLegderReportForm.value.programmeSegmentId
            }
            this.getLedgerReport(params);
        }
    }

    selectOption(event)
    {
        if(event.value === 1)
        {
            this.economicPopupShow = true;
            this.programmePopupShow = false;
        }
        if(event.value === 2)
        {
            this.programmePopupShow = true;
            this.economicPopupShow = false;
        }
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
            this.filterJVLegderReportForm.patchValue({
                economicSegmentId: response.id,
                disabled: true
            });
        });
    }

    programmeSegmentSelect() {
        this.dialogRef = this._matDialog.open(ProgrammingSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.programmeSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.filterJVLegderReportForm.patchValue({
                programmeSegmentId: response.id,
                disabled: true
            });
        });
    }

}
