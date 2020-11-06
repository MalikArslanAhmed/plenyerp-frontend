import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {VoucherSourceUnitCreateComponent} from '../voucher-source-unit-create/voucher-source-unit-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {PageEvent} from '@angular/material/paginator';
import {DeleteListModalComponent} from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import {Router} from '@angular/router';
import {PermissionConstant} from 'app/shared/constants/permission-constant';
import {TreasureReportService} from '../../../../../shared/services/treasure-report.service';

@Component({
    selector: 'app-voucher-source-unit-list',
    templateUrl: './voucher-source-unit-list.component.html',
    styleUrls: ['./voucher-source-unit-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class VoucherSourceUnitListComponent implements OnInit {
    voucherSourceUnitList = [
        {
            refNo: '1223',
            long_name: 'Rahul Jain',
            short_name: 'RJ',
            next_pv_index_no: 'asd12323',
            next_rv_index_no: '2345',
        },
        {
            refNo: '1223',
            long_name: 'Mukesh Singh',
            short_name: 'MS',
            next_pv_index_no: 'mdg12323',
            next_rv_index_no: '223345',
        }
    ];
    displayedCountryColumns = ['s_no', 'refNo', 'long_name', 'short_name', 'next_pv_index_no', 'next_rv_index_no', 'actions'];
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

    // tslint:disable-next-line:no-shadowed-variable
    constructor(private treasureReportService: TreasureReportService,
                private router: Router,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getVoucherSourceUnitList();
    }

    getVoucherSourceUnitList() {
        // this.voucherSourceUnitList = [];
        // this.treasureReportService.voucherSourceUnitList({page: this.pagination.page}).subscribe(data => {
        //     this.voucherSourceUnitList = data.items;
        //     // console.log('---->>>roles', this.voucherSourceUnitList);
        //     this.pagination.page = data.page;
        //     this.pagination.total = data.total;
        //     if (this.voucherSourceUnitList && this.voucherSourceUnitList.length > 0) {
        //         let i = 1;
        //         this.voucherSourceUnitList.forEach(val => {
        //             val['sno'] = i;
        //             i++;
        //         });
        //     }
        // });
    }


    deleteItemModel(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteVoucherSourceUnit(items.id);
            }
        });

    }

    deleteVoucherSourceUnit(id) {
        this.treasureReportService.deleteRoles(id).subscribe(data => {
            if (data) {
                this.getVoucherSourceUnitList();
            }
        });
    }

    editVoucherSourceUnit(roles) {
        this.dialogRef = this._matDialog.open(VoucherSourceUnitCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', roles: roles},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getVoucherSourceUnitList();
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getVoucherSourceUnitList();
    }

}
