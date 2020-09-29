import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {JournalVoucherService} from "../../../../shared/services/journal-voucher.service";

@Component({
    selector: 'app-journal-voucher-list',
    templateUrl: './journal-voucher-list.component.html',
    styleUrls: ['./journal-voucher-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class JournalVoucherListComponent implements OnInit {
    journalVouchers = [
        {
            'sno': 1,
            'id': 1,
            'jvReference': 'JV57943',
            'jvValueDate': '31-Jul-2020',
            'narration': 'General',
            'preparedValueDate': '31-Jul-2020',
            'preparedTransactionDate': '31-Jul-2020',
            'preparedUserId': 'Abhishek185',
            'checkedStatus': 'Yes',
            'checkedValueDate': '31-Jul-2020',
            'checkedTransactionDate': '31-Jul-2020',
            'checkedUserId': 'vimaljeev',
            'postedStatus': 'No',
            'postedValueDate': '31-Jul-2020',
            'postedTransactionDate': '31-Jul-2020',
            'postedUserId': 'sanjeev599',
            "jvDetail": [
                {
                    "currency": "INR",
                    "xRateLocal": 10,
                    "bankXRateToUsd": 1.25,
                    "accountName": "saad",
                    "lineReference": "133dfwf",
                    "lineValue": 122,
                    "adminSegmentId": 1,
                    "fundSegmentId": 1,
                    "economicSegmentId": 1,
                    "programmeSegmentId": 1,
                    "functionalSegmentId": 1,
                    "geoCodeSegmentId": 1,
                    "lineValueType": "CREDIT",
                    "lvLineValue": 122
                },
                {
                    "currency": "INR",
                    "xRateLocal": 10,
                    "bankXRateToUsd": 1.25,
                    "accountName": "saad",
                    "lineReference": "133dfwf",
                    "lineValue": 122,
                    "adminSegmentId": 1,
                    "fundSegmentId": 1,
                    "economicSegmentId": 1,
                    "programmeSegmentId": 1,
                    "functionalSegmentId": 1,
                    "geoCodeSegmentId": 1,
                    "lineValueType": "CREDIT",
                    "lvLineValue": 122
                }
            ]
        },
        {
            'sno': 2,
            'id': 2,
            'jvRef': 'JV57943',
            'jvValueDate': '31-Jul-2020',
            'narration': 'General',
            'prepared': {
                'valueDate': '31-Jul-2020',
                'trxnDate': '31-Jul-2020',
                'username': 'Abhishek185',
            },
            'checkedStatus': 'Yes',
            'checkedData': {
                'valueDate': '31-Jul-2020',
                'trxnDate': '31-Jul-2020',
                'username': 'vimaljeev',
            },
            'postedStatus': 'No',
            'postedData': {
                'valueDate': '31-Jul-2020',
                'trxnDate': '31-Jul-2020',
                'username': 'sanjeev599',
            }
        }
    ];
    displayedJournalColumns = ['id', 'jvRef', 'jvValueDate', 'narration', 'prepared', 'checkedStatus', 'checkedData', 'postedStatus', 'postedData', 'action'];
    dialogRef: any;
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    showTable = false;
    selectedVoucher: any;

    constructor(private journalVoucherService: JournalVoucherService) {
    }

    ngOnInit(): void {
        this.getJournalVoucherList();
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        // this.getDesignationList();
    }

    showTableData(voucher) {
        this.selectedVoucher = voucher['journalVoucherDetails'];
        this.showTable = !this.showTable;
    }

    getJournalVoucherList() {
        this.journalVouchers = [];
        this.journalVoucherService.get({page: this.pagination.page}).subscribe(data => {
            // console.log('data', data);
            this.journalVouchers = data.items;
            if (this.journalVouchers && this.journalVouchers.length > 0) {
                let i = 1;
                this.journalVouchers.forEach(journalVoucher => {
                    journalVoucher['sno'] = i;
                    i++;
                });
            }
            this.pagination.page = data.page;
            this.pagination.total = data.total;
        });
    }
}
