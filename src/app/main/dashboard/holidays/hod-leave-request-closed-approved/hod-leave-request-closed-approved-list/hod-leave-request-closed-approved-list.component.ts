import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { HodLeaveRequestClosedApprovedCreateComponent } from '../hod-leave-request-closed-approved-create/hod-leave-request-closed-approved-create.component';
import { PageEvent } from '@angular/material/paginator';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'hod-leave-request-closed-approved-list',
    templateUrl: './hod-leave-request-closed-approved-list.component.html',
    styleUrls: ['./hod-leave-request-closed-approved-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class HodLeaveRequestClosedApprovedListComponent implements OnInit {
    leaveRequestList = [];
    displayedLeaveRequestColumns = [
        'id', 'daysSpent', 'leaveType', 'staffID', 'daysSpent','releifOfficer', 'approvalHr', 'hodApproved', 'hrApproved', 'approvedHodVDate', 'pLoginId', 'reqClosed', 'actions'
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
    @Output() selectedIndexChange: EventEmitter<number>;
    @Input() employeeDetail
    permissionEdit = [PermissionConstant.HOD_LEAVE_REQUEST_CLOSED_APPROVED_EDIT];
    permissionDelete = [PermissionConstant.HOD_LEAVE_REQUEST_CLOSED_APPROVED_DELETE];
    constructor(private contactInfoService: ContactInfoService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeaveRequestClosedList(this.employeeDetail);
    }

    getLeaveRequestClosedList(employeeDetail?) {
        this.contactInfoService.getLeaveRequestClosedList({ ...this.pagination, hodStaffId: employeeDetail.id, requestReady: 1 }).subscribe(data => {
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
        this.contactInfoService.deleteLeaveRequestClosed(id).subscribe(data => {
            if (data) {
                this.getLeaveRequestClosedList(this.employeeDetail);
            }
        });
    }

    editLeave(leaveRequest) {
        this.dialogRef = this._matDialog.open(HodLeaveRequestClosedApprovedCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'EDIT', leaveRequest: leaveRequest, employeeDetail: this.employeeDetail },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveRequestClosedList(this.employeeDetail);
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getLeaveRequestClosedList(this.employeeDetail);
    }

}
