import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { LeaveYearCreateComponent } from '../leave-year-create/leave-year-create.component';
import { PageEvent } from '@angular/material/paginator';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'leave-year-list',
    templateUrl: './leave-year-list.component.html',
    styleUrls: ['./leave-year-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveYearListComponent implements OnInit {
    @Output() selectedIndexChange: EventEmitter<number>;
    leaveYearList = [];
    displayedLeaveYearColumns = ['id','leaveYear','status', 'actions'];
    dialogRef: any;
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    permissionEdit = [PermissionConstant.LEAVE_YEAR_EDIT];
    permissionDelete = [PermissionConstant.LEAVE_YEAR_DELETE];
    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeaveYearList();
    }

    getLeaveYearList() {
        this.contactInfoService.getLeaveYearList(this.pagination).subscribe(data => {
            this.leaveYearList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            this.pagination.pages = data.pages;
            if (this.leaveYearList && this.leaveYearList.length > 0) {
                let i = 1;
                this.leaveYearList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteLeaveYear(items.id);
            }
        });

    } 
    deleteLeaveYear(id) {
        this.contactInfoService.deleteLeaveYear(id).subscribe(data => {
            if (data) {
                this.getLeaveYearList();
            }
        });
    }

    editLeave(leaveYear) {
        this.dialogRef = this._matDialog.open(LeaveYearCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', leaveYear: leaveYear},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveYearList();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getLeaveYearList();
    }
}
