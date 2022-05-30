import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { LeaveRequestApprovedCreateComponent } from '../leave-request-approved-create/leave-request-approved-create.component';

@Component({
    selector: 'leave-request-approved-list',
    templateUrl: './leave-request-approved-list.component.html',
    styleUrls: ['./leave-request-approved-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveRequestApprovedListComponent implements OnInit {
    leaveRequestList = [];
    displayedLeaveRequestColumns = [
        'id', 'staffID',  'duration','approvalHr','hodApproved','hrApproved', 'approvedHodVDate', 'pLoginId', 'actions'
    ];
    dialogRef: any;
    selectIndex = 0;
    @Output() selectedIndexChange: EventEmitter<number>;
    @Input() employeeDetail

    constructor(private contactInfoService: ContactInfoService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeaveRequestList(this.employeeDetail);
    }

    getLeaveRequestList(employeeDetail?) {
        this.contactInfoService.getLeaveRequestList({ 'page': -1, hodStaffId: employeeDetail.id, requestReady: 1 }).subscribe(data => {
            this.leaveRequestList = data.items;

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

}
