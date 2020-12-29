import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '../../../../shared/services/alert.service';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {EconomicSegmentSelectComponent} from '../../journal-voucher/economic-segment-select/economic-segment-select.component';
import {AdminSegmentSelectComponent} from '../../journal-voucher/admin-segment-select/admin-segment-select.component';
import {FundSegmentSelectComponent} from '../../journal-voucher/fund-segment-select/fund-segment-select.component';
import {IfrReportService} from '../../../../shared/services/ifr-report.service';
import {AppConstants} from "../../../../shared/constants/app-constants";

@Component({
    selector: 'app-application-fund-reports',
    templateUrl: './application-fund-reports.component.html',
    styleUrls: ['./application-fund-reports.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ApplicationFundReportsComponent implements OnInit {
    filterFundReportDataForm: FormGroup;
    applicationFundReportData = [];
    panelOpenState: boolean = false;
    sourceUnit = [];
    statuses = [];
    dialogRef: any;
    status = 'ALL';
    reports = [];
    reportTypes = AppConstants.REPORT_TYPES;
    semesterList = AppConstants.SEMESTERS;
    quarterList = AppConstants.QUARTERS;
    monthList = AppConstants.MONTHS;
    fundSegmentsData;
    adminUnitData;
    economicCodeData;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };

    constructor(private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private ifrReportService: IfrReportService) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.filterFundReportDataForm = this.fb.group({
            'fundSegment': [{value: '', disabled: true}],
            'adminUnit': [{value: '', disabled: true}],
            'EconomicCode': [{value: '', disabled: true}],
            'report': [''],
            'report_type': ['']
        });

        this.filterFundReportDataForm.get('report_type').valueChanges.subscribe(val => {
            this.reports = [];
            this.filterFundReportDataForm.get('report').patchValue('');
            if (val === 'SEMESTER') {
                this.reports = this.semesterList;
            } else if (val === 'QUARTER') {
                this.reports = this.quarterList;
            } else {
                this.reports = this.monthList;
            }
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
            this.economicCodeData = [{
                id: response.id,
                name: response.combinedCode + ' - ' + response.name
            }];
            this.filterFundReportDataForm.get('EconomicCode').patchValue(response.id);
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
            this.filterFundReportDataForm.get('adminUnit').patchValue(response.id);
        });
    }

    fundSegmentSelect() {
        this.dialogRef = this._matDialog.open(FundSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.fundSegmentsData = [{
                'name': response.name,
                'id': response.id
            }];
            this.filterFundReportDataForm.get('fundSegment').patchValue(response.id);
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getApplicationFundReport();
    }

    submit() {
        const formData = this.filterFundReportDataForm.getRawValue();
        const param = {
            fundSegmentId: formData.fundSegment,
            adminSegmentId: formData.adminUnit,
            economicSegmentId: formData.EconomicCode,
            report: formData.report,
            report_type: formData.report_type
        };
        this.getApplicationFundReport(param);
    }

    getApplicationFundReport(params = {}) {
        this.ifrReportService.applicationOfFundData(params).subscribe(data => {
            // console.log('--->>>', data);
            this.applicationFundReportData = data;
        });
    }

    getChildReportData(item) {
        if (item && item.id) {
            this.ifrReportService.applicationOfFundChildData({economicSegmentId: item.id}).subscribe(data => {
                item['childTableData'] = data;
                // console.log('--->child data', data);
            });
        }
    }
}
