import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '@fuse/animations';
import {AlertService} from 'app/shared/services/alert.service';
import * as moment from 'moment';
import {TrialBalanceReportService} from 'app/shared/services/trial-balance-report.service';
import {PermissionConstant} from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-trial-balance',
    templateUrl: './trial-balance.component.html',
    styleUrls: ['./trial-balance.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TrialBalanceComponent implements OnInit {
    filterTrialBalanceReportForm: FormGroup;
    trailReportMainData = [];
    permissionAddNotesTrail = [PermissionConstant.TRAIL_BALANCE_NOTES_ADD];
    panelOpenState: boolean = false;

    constructor(private fb: FormBuilder,
                private trialBalanceReportService: TrialBalanceReportService,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.filterTrialBalanceReportForm = this.fb.group({
            'from': ['', Validators.required],
            'to': ['', Validators.required]
        });
        this.getTrailBalanceData({});
    }

    getTrailBalanceData(params) {
        this.trialBalanceReportService.getTrailReport(params).subscribe(data => {
            this.trailReportMainData = data.items;
            if (this.trailReportMainData && this.trailReportMainData.length > 0) {
                this.trailReportMainData.forEach(d => {
                    d['isOpen'] = !this.panelOpenState;
                    this.getChildReport(d);
                });
                this.panelOpenState = !this.panelOpenState;
            }
        });
    }

    filterTrailBalance() {
        if (this.filterTrialBalanceReportForm.value.from === '' || this.filterTrialBalanceReportForm.value.to === '') {
            if (this.filterTrialBalanceReportForm.value.from === '') {
                this.alertService.showErrors("From date is required");
            } else if (this.filterTrialBalanceReportForm.value.to === '') {
                this.alertService.showErrors("To date is required");
            }
        } else {
            const f = this.filterTrialBalanceReportForm.value;
            const fromDate = moment(f.from).format('YYYY-MM-DD');
            const toDate = moment(f.to).format('YYYY-MM-DD');
            const params = {
                fromDate: fromDate,
                toDate: toDate
            };
            this.getTrailBalanceData(params);
        }
    }

    getChildReport(reportData) {
        const params = {};
        if (reportData && reportData.id) {
            params['parentId'] = reportData.id;
            this.trialBalanceReportService.getTrailReport(params).subscribe(data => {
                reportData['childs'] = data.items;
            });
        }
    }

    addNote(economicSegmentId) {
        this.trialBalanceReportService.addNote(economicSegmentId, {'type': 'Trail_balance'}).subscribe(data => {
            this.getTrailBalanceData({});
        });
    }

    openAll() {
        if (this.trailReportMainData && this.trailReportMainData.length > 0) {
            this.trailReportMainData.forEach(d => {
                d['isOpen'] = !this.panelOpenState;
                this.getChildReport(d);
            });
            this.panelOpenState = !this.panelOpenState;
        }
    }
}
