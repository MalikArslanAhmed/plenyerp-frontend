import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {JournalVoucherLedgerReportService} from 'app/shared/services/journal-voucher-ledger-report.service';

@Component({
    selector: 'app-monthly-activity',
    templateUrl: './monthly-activity.component.html',
    styleUrls: ['./monthly-activity.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MonthlyActivityComponent implements OnInit {
    // panelOpenState = false;
    // data = [];
    childData = [];
    data = [
        {
            "name": "Current Assets",
            "combinedCode": 31,
            "january": 0,
            "february": 0,
            "march": 0,
            "april": 0,
            "may": 100,
            "june": 0,
            "july": 0,
            "august": 200,
            "september": 0,
            "november": 0,
            "december": 0,
            "previousYears": 0,
            "total": 300,
            "child": [
                {
                    "name": "Current Assets",
                    "combinedCode": 31,
                    "january": 0,
                    "february": 0,
                    "march": 0,
                    "april": 0,
                    "may": 100,
                    "june": 0,
                    "july": 0,
                    "august": 200,
                    "september": 0,
                    "november": 0,
                    "december": 0,
                    "previousYears": 0,
                    "total": 300,
                    "child": [
                        {
                            "name": "1",
                            "combinedCode": 31,
                            "january": 0,
                            "february": 0,
                            "march": 0,
                            "april": 0,
                            "may": 100,
                            "june": 0,
                            "july": 0,
                            "august": 200,
                            "september": 0,
                            "november": 0,
                            "december": 0,
                            "previousYears": 0,
                            "total": 300
                        },
                        {
                            "name": "2",
                            "combinedCode": 31,
                            "january": 0,
                            "february": 0,
                            "march": 0,
                            "april": 0,
                            "may": 100,
                            "june": 0,
                            "july": 0,
                            "august": 200,
                            "september": 0,
                            "november": 0,
                            "december": 0,
                            "previousYears": 0,
                            "total": 300,
                            "child": [
                                {
                                    "name": "Current Assets",
                                    "combinedCode": 31,
                                    "january": 0,
                                    "february": 0,
                                    "march": 0,
                                    "april": 0,
                                    "may": 100,
                                    "june": 0,
                                    "july": 0,
                                    "august": 200,
                                    "september": 0,
                                    "november": 0,
                                    "december": 0,
                                    "previousYears": 0,
                                    "total": 300
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Current Assets",
                    "combinedCode": 31,
                    "january": 0,
                    "february": 0,
                    "march": 0,
                    "april": 0,
                    "may": 100,
                    "june": 0,
                    "july": 0,
                    "august": 200,
                    "september": 0,
                    "november": 0,
                    "december": 0,
                    "previousYears": 0,
                    "total": 300
                }
            ]
        },
        {
            "name": "Non-Current Assets",
            "combinedCode": 32,
            "january": 0,
            "february": 0,
            "march": 0,
            "april": 0,
            "may": 100,
            "june": 0,
            "july": 0,
            "august": 200,
            "september": 0,
            "november": 0,
            "december": 0,
            "previousYears": 0,
            "total": 300
        }
    ];

    constructor(private jvLedgerReportService: JournalVoucherLedgerReportService) {
    }

    ngOnInit(): void {
        this.getMonthlyActivityData({});
        //console.log("month",this.data)
    }

    getMonthlyActivityData(params) {
        this.jvLedgerReportService.getMonthlyActivityReport(params).subscribe(data => {
            // this.data = data.items
            //console.log("data",this.data);
        })
    }

    getChildData(id, index) {
        console.log('id', id);
        console.log('index', index);
        const params = {};
        params['parentId'] = id;
        this.jvLedgerReportService.getMonthlyActivityReport(params).subscribe(data => {
            this.childData = data.items
            // console.log("childData",this.childData);
            this.data[index]['child'] = this.childData;
            //console.log("after",this.data);
        })
    }
}
