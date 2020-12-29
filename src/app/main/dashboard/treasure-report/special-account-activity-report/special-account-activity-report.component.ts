import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '../../../../shared/services/alert.service';
import {TreasureReportService} from '../../../../shared/services/treasure-report.service';
import * as moment from 'moment';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {ReceiptVoucherService} from '../../../../shared/services/receipt-voucher.service';
import {ScheduleEconomicCodesComponent} from '../payment-voucher/schedule-economic-codes/schedule-economic-codes.component';
import {EconomicSegmentSelectComponent} from '../../journal-voucher/economic-segment-select/economic-segment-select.component';
import {AdminSegmentSelectComponent} from '../../journal-voucher/admin-segment-select/admin-segment-select.component';
import {FundSegmentSelectComponent} from '../../journal-voucher/fund-segment-select/fund-segment-select.component';
import {AppConstants} from "../../../../shared/constants/app-constants";

@Component({
    selector: 'app-special-account-activity-report',
    templateUrl: './special-account-activity-report.component.html',
    styleUrls: ['./special-account-activity-report.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SpecialAccountActivityReportComponent implements OnInit {
    showTableDataForm: FormGroup;
    reportListData = [
        {
            item: 'abcd',
            section: '12332',
            forecast_semester: 'sdfs',
            current_semester: 'fdgh',
            cum_semester: 'sfdg',
        },
        {
            item: 'abcd',
            section: '12332',
            forecast_semester: 'sdfs',
            current_semester: 'fdgh',
            cum_semester: 'sfdg',
        }
    ];
    panelOpenState: boolean = false;
    sourceUnit = [];
    statuses = [];
    dialogRef: any;
    status = 'ALL';
    reportTypes = AppConstants.REPORT_TYPES;
    semesterList = AppConstants.SEMESTERS;
    quarterList = AppConstants.QUARTERS;
    monthlyList = AppConstants.MONTHS;
    reports = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };

    constructor(private fb: FormBuilder,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.showTableDataForm = this.fb.group({
            'report': [''],
            'report_type': ['']
        });
        this.showTableDataForm.get('report_type').valueChanges.subscribe(val => {
            this.reports = [];
            this.showTableDataForm.get('report').patchValue('');
            if (val === 'SEMESTER') {
                this.reports = this.semesterList;
            } else if (val === 'QUARTER') {
                this.reports = this.quarterList;
            } else if (val === 'MONTHLY') {
                this.reports = this.monthlyList;
            }
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        // this.getReceiptVoucher();
    }
}
