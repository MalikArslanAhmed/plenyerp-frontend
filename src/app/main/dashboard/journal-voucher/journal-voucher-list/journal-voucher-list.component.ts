import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {fuseAnimations} from "../../../../../@fuse/animations";

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
            'jvRef': 'JV57943',
            'jvValueDate': '31-Jul-2020',
            'narration': 'General',
            'prepared': '31-Jul-2020',
            'checkedStatus': 'Yes',
            'checkedData': '31-Jul-2020',
            'postedStatus': 'No',
            'postedData': '31-Jul-2020'
        },
        {
            'sno': 2,
            'id': 2,
            'jvRef': 'JV57948',
            'jvValueDate': '31-Jul-2020',
            'narration': 'General',
            'prepared': '31-Jul-2020',
            'checkedStatus': 'Yes',
            'checkedData': '31-Jul-2020',
            'postedStatus': 'No',
            'postedData': '31-Jul-2020'
        }
    ];
    displayedJournalColumns = ['id', 'jvRef', 'jvValueDate', 'narration', 'prepared', 'checkedStatus', 'checkedData', 'postedStatus', 'postedData'];
    dialogRef: any;
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;

    constructor() {
    }

    ngOnInit(): void {
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        // this.getDesignationList();
    }
}
