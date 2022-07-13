import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { LeaveRequestApprovedCreateComponent } from '../leave-request-approved-create/leave-request-approved-create.component';
import { PageEvent } from '@angular/material/paginator';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'leave-request-approved-list',
    templateUrl: './leave-request-approved-list.component.html',
    styleUrls: ['./leave-request-approved-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveRequestApprovedListComponent implements OnInit {
    @Output() selectedIndexChange: EventEmitter<number>;
    @Input() employeeDetail
    leaveRequestList = [];
    displayedLeaveRequestColumns = [
        'id','leaveType', 'staffID', 'duration','releifOfficer', 'approvalHr', 'hodApproved', 'hrApproved', 'approvedHodVDate', 'pLoginId', 'reqClosed', 'actions'
    ];
    dialogRef: any;
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    permissionEdit = [PermissionConstant.HOD_LEAVE_REQUEST_APPROVED_EDIT];
    permissionDelete = [PermissionConstant.HOD_LEAVE_REQUEST_APPROVED_DELETE];
    constructor(private contactInfoService: ContactInfoService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeaveRequestList(this.employeeDetail);
    }

    getLeaveRequestList(employeeDetail?) {
        this.contactInfoService.getLeaveRequestList({ 'page': -1, hodStaffId: employeeDetail.id, requestReady: 1 }).subscribe(data => {
            this.leaveRequestList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            this.pagination.pages = data.pages;
            if (this.leaveRequestList && this.leaveRequestList.length > 0) {
                let i = 1;
                this.leaveRequestList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: { data: items }
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteLeaveRequest(items.id);
            }
        });

    }
    deleteLeaveRequest(id) {
        this.contactInfoService.deleteLeaveRequest(id).subscribe(data => {
            if (data) {
                this.getLeaveRequestList(this.employeeDetail);
            }
        });
    }

    editLeave(leaveRequest) {
        this.dialogRef = this._matDialog.open(LeaveRequestApprovedCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'EDIT', leaveRequest: leaveRequest, employeeDetail: this.employeeDetail },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveRequestList(this.employeeDetail);
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1
        this.getLeaveRequestList(this.employeeDetail)
    }

}
