import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { LeaveRequestClosedCreateComponent } from '../leave-request-closed-create/leave-request-closed-create.component';
import { PageEvent } from '@angular/material/paginator';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'leave-request-closed-list',
    templateUrl: './leave-request-closed-list.component.html',
    styleUrls: ['./leave-request-closed-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveRequestClosedListComponent implements OnInit {
    @Output() selectedIndexChange: EventEmitter<number>;
    @Output() showAdd = new EventEmitter;
    @Input() employeeDetail
    @Input() leaveRequestData
    leaveRequestClosedList = [];
    displayedLeaveRequestColumns = [
        'id', 'leaveType', 'startDate', 'duration', 'daysSpent', 'releifOfficer', 'preparedVDate', 'readyRequest', 'hodApprovedStaff', 'hodApproved', 'hrApproved', 'reqClosed', 'actions'
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
    permissionEdit = [PermissionConstant.LEAVE_REQUESTS_CLOSED_EDIT];
    permissionDelete = [PermissionConstant.LEAVE_REQUESTS_CLOSED_DELETE];
    constructor(private contactInfoService: ContactInfoService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeaveRequestClosedList(this.employeeDetail);
    }

    getLeaveRequestClosedList(employeeDetail?) {
        this.contactInfoService.getLeaveRequestClosedList({ ...this.pagination, preparedLoginId: employeeDetail.personnelFileNumber,leaveRequestId:this.leaveRequestData.id }).subscribe(data => {
            this.leaveRequestClosedList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            this.pagination.pages = data.pages;
            this.showHideAddButton()

            if (this.leaveRequestClosedList && this.leaveRequestClosedList.length > 0) {
                let i = 1;
                this.leaveRequestClosedList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }
    showHideAddButton() {
        if (this.leaveRequestClosedList.length == 0) {
            this.showAdd.emit(true)
        } else if (this.leaveRequestClosedList.length > 0) {
            let checkToshow = false
            let count = []
            this.leaveRequestClosedList.forEach((resp: any) => {
                if (resp.approvedHod == 'rejected' || resp.approvedHr == 'rejected') {
                    count.push(count.length + 1)
                }
            })
            if (count.length === this.leaveRequestClosedList.length) {
                checkToshow = true
            }
            this.showAdd.emit(checkToshow)
        }
    }
    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: { data: items }
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteLeaveRequestClosed(items.id);
            }
        });

    }
    deleteLeaveRequestClosed(id) {
        this.contactInfoService.deleteLeaveRequestClosed(id).subscribe(data => {
            if (data) {
                this.getLeaveRequestClosedList(this.employeeDetail);
            }
        });
    }

    editLeave(leaveRequest) {
        this.dialogRef = this._matDialog.open(LeaveRequestClosedCreateComponent, {
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
