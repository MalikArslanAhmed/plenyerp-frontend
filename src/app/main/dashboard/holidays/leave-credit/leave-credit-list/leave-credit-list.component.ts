import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { LeaveCreditCreateComponent } from '../leave-credit-create/leave-credit-create.component';
import { PageEvent } from '@angular/material/paginator';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'leave-credit-list',
    templateUrl: './leave-credit-list.component.html',
    styleUrls: ['./leave-credit-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveCreditListComponent implements OnInit {
    leaveCreditList = [];
    displayedLeaveCreditColumns = ['id', 'pStaff', 'staff', 'leaveType', 'dueDays', 'leaveYear', 'pVDate', 'pTDate', 'actions'];
    dialogRef: any;
    dataFetching = false
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    permissionEdit = [PermissionConstant.LEAVE_CREDIT_EDIT];
    permissionDelete = [PermissionConstant.LEAVE_CREDIT_DELETE];
    constructor(private contactInfoService: ContactInfoService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeaveCreditList();
    }

    getLeaveCreditList() {
        this.dataFetching = true
        this.contactInfoService.getLeaveCreditList(this.pagination).subscribe(data => {
            this.leaveCreditList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            this.pagination.pages = data.pages;
            if (this.leaveCreditList && this.leaveCreditList.length > 0) {
                let i = 1;
                this.leaveCreditList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
            this.dataFetching = false
        });
    }

    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: { data: items }
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteLeaveCredit(items.id);
            }
        });

    }
    deleteLeaveCredit(id) {
        this.contactInfoService.deleteLeaveCredit(id).subscribe(data => {
            if (data) {
                this.getLeaveCreditList();
            }
        });
    }

    editLeaveCredit(leaveCredit) {
        this.dialogRef = this._matDialog.open(LeaveCreditCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'EDIT', leaveCredit: leaveCredit },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveCreditList();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getLeaveCreditList();
    }
}
