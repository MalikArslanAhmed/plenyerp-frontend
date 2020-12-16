import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdminSegmentSelectComponent} from "../journal-voucher/admin-segment-select/admin-segment-select.component";
import {MatDialog} from "@angular/material/dialog";
import {SummaryReportService} from "../../../shared/services/summary-report.service";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
    selector: 'app-summary-report-non-personal-advances',
    templateUrl: './summary-report-non-personal-advances.component.html',
    styleUrls: ['./summary-report-non-personal-advances.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SummaryReportNonPersonalAdvancesComponent implements OnInit {
    summaryReportFilterForm: FormGroup;
    adminSegments = [{
        'id': 1,
        'name': 'Administrative Segment'
    }];
    dialogRef: any;
    reportData = [];

    constructor(private fb: FormBuilder,
                private _matDialog: MatDialog,
                private summaryReportService: SummaryReportService,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.summaryReportFilterForm = this.fb.group({
            'adminSegmentId': [{value: '', disabled: true}]
        });
        this.summaryReportFilterForm.patchValue({
           'adminSegmentId': 1
        });
        this.getDepartments();
    }

    adminSegmentSelect() {
        this.dialogRef = this._matDialog.open(AdminSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.adminSegments = [];
            this.adminSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.summaryReportFilterForm.patchValue({
                adminSegmentId: response.id,
                disabled: true
            });
        });
    }

    filterSummaryReport() {
        if (!this.summaryReportFilterForm.value || !this.summaryReportFilterForm.value.adminSegmentId) {
            this.alertService.showErrors('Please Select Admin Segment');
            return;
        }

        this.summaryReportService.summaryReportNonPersonal({
            'page': -1,
            'adminSegmentIds': [this.summaryReportFilterForm.value.adminSegmentId]
        }).subscribe(data => {
            this.reportData = data;
        });
    }

    getDepartments() {
        this.summaryReportService.summaryReportNonPersonal({'page': -1}).subscribe(data => {
            this.reportData = data;
        });
    }

    getEmployee(department) {
        this.summaryReportService.summaryReportNonPersonal({
            'page': -1,
            'adminSegmentId': department['adminSegmentId']
        }).subscribe(data => {
            department['employees'] = data;
        });
    }

    getPaymentVoucher(department, employee) {
        this.summaryReportService.summaryReportNonPersonal({
            'page': -1,
            'adminSegmentId': department['adminSegmentId'],
            'employeeId': employee['employeeId']
        }).subscribe(data => {
            employee['paymentVouchers'] = data;
        });
    }
}
