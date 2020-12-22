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
import {IfrReportService} from '../../../../shared/services/ifr-report.service';

@Component({
    selector: 'app-sources-uses-fund',
    templateUrl: './sources-uses-fund.component.html',
    styleUrls: ['./sources-uses-fund.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SourcesUsesFundComponent implements OnInit {
    filterSourceUsesDataForm: FormGroup;
    fundUseData = [ ];
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

    reports = [];
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
    fundSegmentsData;
    adminUnitData;
    economicCodeData;
    constructor(private fb: FormBuilder,
                private _matDialog: MatDialog,
                private ifrReportService: IfrReportService,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.filterSourceUsesDataForm = this.fb.group({
            'radioType': ['PROGRAMME'],
            'adminUnit': [{value: '', disabled: true}],
            'report': [''],
            'report_type': ['']
        });
        this.filterSourceUsesDataForm.get('report_type').valueChanges.subscribe(val => {
            this.reports = [];
            this.filterSourceUsesDataForm.get('report').patchValue('');
            if (val === 'SEMESTER') {
                this.reports = this.semesterList;
            } else {
                this.reports = this.quarterList;
            }
        });

    }
    adminSegmentSelect() {
        this.dialogRef = this._matDialog.open(AdminSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                // console.log('bye');
                return;
            }
            this.adminUnitData = [{
                'name': response.name,
                'id': response.id
            }];
            this.filterSourceUsesDataForm.get('adminUnit').patchValue(response.id);
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        // this.getReceiptVoucher();
    }

    submit() {
        const formData = this.filterSourceUsesDataForm.getRawValue();
        const param = {
            adminSegmentId: formData.adminUnit,
            report: formData.report,
            report_type: formData.report_type
        };
        this.getSourcesFundReport(param);
    }

    getSourcesFundReport(params = {}) {
        this.ifrReportService.sourcesFundData(params).subscribe(data => {
            // console.log('--->>>', data);
            this.fundSegmentsData = data;
        });
    }
    getChildReportData(item) {
        if (item && item.id) {
            this.ifrReportService.sourcesFundData({economicSegmentId: item.id}).subscribe(data => {
                item['childTableData'] = data;
                // console.log('--->child data', data);
            });
        }
    }
}
