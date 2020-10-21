import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '@fuse/animations';
import {AlertService} from 'app/shared/services/alert.service';
import * as moment from 'moment';
import {TrialBalanceReportService} from 'app/shared/services/trial-balance-report.service';

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
    childTrialBalanceData = [];

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
        })
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

    getChildReport(data) {
        const params = {};
        if (data && data.economicSegmentId) {
            params['parentId'] = data.economicSegmentId;
            this.childTrialBalanceData = [];
            this.trialBalanceReportService.getTrailReport(params).subscribe(data => {
                this.childTrialBalanceData = data.items
            });
        }
    }

    addNote(economicSegmentId) {
        this.trialBalanceReportService.addNote(economicSegmentId, {}).subscribe(data => {
            this.getTrailBalanceData({});
        });
    }
}
