import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {TrialBalanceReportService} from "../../../../shared/services/trial-balance-report.service";

@Component({
    selector: 'app-trial-balance-list',
    templateUrl: './trial-balance-list.component.html',
    styleUrls: ['./trial-balance-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TrialBalanceListComponent implements OnInit {
    trailReportMainData = [
        /*{
          'sno':1,
          'accTitle':'Ashish',
          'title' : 'Ashish1',
          'credit' : 1000,
          'debit': 2000,
          'balance':1000,
          'reportDetails':[
            {
              'fullCode':1,
              'lineCode':2,
              'title':'Govt share of FAAC',
              'credit': 5000,
              'debit': 2000,
              'balance': 0.00
            },
            {
              'fullCode':2,
              'lineCode':2,
              'title':'Grants',
              'credit': 5000,
              'debit': 2000,
              'balance': 0.00
            }
          ]
        },
        {
          'sno':2,
          'accTitle':'Mishra',
          'title' : 'Ashish2',
          'credit' : 1000,
          'debit': 2000,
          'balance':1000,
          'reportDetails':[
            {
              'fullCode':1,
              'lineCode':2,
              'title':'Govt share of FAAC111',
              'credit': 5000,
              'debit': 2000,
              'balance': 0.00
            },
            {
              'fullCode':21,
              'lineCode':2,
              'title':'Grants',
              'credit': 5000,
              'debit': 2000,
              'balance': 0.00
            }
          ]
        }*/
    ];

    childTrialBalanceData = [];

    constructor(private trialBalanceReportService: TrialBalanceReportService) {
    }

    ngOnInit(): void {
        //   console.log("abc",this.dataSource)
        this.getTrailBalanceData();
    }

    getTrailBalanceData() {
        this.trialBalanceReportService.getTrailReport({}).subscribe(data => {
            this.trailReportMainData = data.items
        })
    }

    getChildReport(data) {
        const params = {};
        if (data && data.economicSegmentId) {
            params['parentId'] = data.economicSegmentId;
            // console.log('apr', params);
            this.trialBalanceReportService.getTrailReport(params).subscribe(data => {
                this.childTrialBalanceData = data.items
            })
        }
    }
}
