import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {VoucherSourceUnitCreateComponent} from '../voucher-source-unit-create/voucher-source-unit-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {TreasureReportService} from '../../../../../shared/services/treasure-report.service';

@Component({
    selector: 'app-voucher-source-unit-list',
    templateUrl: './voucher-source-unit-list.component.html',
    styleUrls: ['./voucher-source-unit-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class VoucherSourceUnitListComponent implements OnInit {
    voucherSourceUnitList = [];
    displayedCountryColumns = ['sNo', 'refNo', 'long_name', 'short_name', 'next_pv_index_no', 'next_rv_index_no', 'actions'];
    dialogRef: any;
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private treasureReportService: TreasureReportService,
                private router: Router,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getVoucherSourceUnitList({});
    }

    getVoucherSourceUnitList(params) {
        params['page'] = this.pagination.page;
        this.voucherSourceUnitList = [];
        this.treasureReportService.list(params).subscribe(data => {
            this.voucherSourceUnitList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.voucherSourceUnitList && this.voucherSourceUnitList.length > 0) {
                let i = 1;
                this.voucherSourceUnitList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }

    editVoucherSourceUnit(voucher) {
        this.dialogRef = this._matDialog.open(VoucherSourceUnitCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', voucher: voucher},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getVoucherSourceUnitList({});
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getVoucherSourceUnitList({});
    }
}
