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
    selectedStatus = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    reportTypes = [
        {
        name: 'Semester Wise',
        value: 'SEMESTER'
        },
        {
            name: 'Quarter Wise',
            value: 'QUARTER'
        }
    ];

    reports = [ ];
    semesterList = [
        {
            name: '1st Semester',
            value: '1'
        },
        {
            name: '2nd Semester',
            value: '2'
        }
    ];
    quarterList = [
        {
            name: '1st Quarter',
            value: '1'
        },
        {
            name: '2nd Quarter',
            value: '2'
        },
        {
            name: '3rd Quarter',
            value: '3'
        },
        {
            name: '4th Quarter',
            value: '4'
        }
    ];
    constructor(private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService) {
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
            } else {
                this.reports = this.quarterList;
            }
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        // this.getReceiptVoucher();
    }

}
