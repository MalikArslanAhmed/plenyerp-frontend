import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-banks',
    templateUrl: './banks.component.html',
    styleUrls: ['./banks.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BanksComponent implements OnInit {
    banks = [
        {
            'sno': 1,
            'bankId': 1,
            'title': 'HDFC Bank',
            'isActive': 'Active',
            'branches': [
                {
                    'sno': 1,
                    'branchId': 1,
                    'title': 'HDFC Bank 1',
                    'address': 'Address 1',
                    'sortCode': 'HDMT',
                    'isActive': 'Active',
                },
                {
                    'sno': 2,
                    'branchId': 2,
                    'title': 'HDFC Bank 2',
                    'address': 'Address 2',
                    'sortCode': 'HDCC',
                    'isActive': 'Active',
                }
            ]
        }
    ];
    displayedColumns = ['id', 'bankId', 'title', 'isActive'];
    displayedBranchColumns = ['id', 'title', 'address', 'sortCode'];
    bankBranch: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    paginationBranches = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    selectBranch(bankBranch) {
        console.log(bankBranch);
        this.bankBranch = bankBranch;
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
    }
}
