import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { LeaveRequestClosedCreateComponent } from '../leave-request-closed-create/leave-request-closed-create.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'leave-request-closed-list',
    templateUrl: './leave-request-closed-list.component.html',
    styleUrls: ['./leave-request-closed-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveRequestClosedListComponent implements OnInit {
    leaveRequestClosedList = [];
    displayedLeaveRequestColumns = [
        'id', 'leaveType', 'startDate', 'duration', 'preparedVDate', 'readyRequest', 'hodApprovedStaff', 'hodApproved', 'hrApproved', 'reqClosed', 'actions'
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

    constructor(private contactInfoService: ContactInfoService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeaveRequestClosedList(this.employeeDetail);
    }

    getLeaveRequestClosedList(employeeDetail?) {
        this.contactInfoService.getLeaveRequestClosedList({ ...this.pagination, staffId: employeeDetail.id }).subscribe(data => {
            this.leaveRequestClosedList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            this.pagination.pages = data.pages;
            if (this.leaveRequestClosedList && this.leaveRequestClosedList.length > 0) {
                let i = 1;
                this.leaveRequestClosedList.forEach(val => {
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
