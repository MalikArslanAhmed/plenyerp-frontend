import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { LeaveRequestCreateComponent } from '../leave-request-create/leave-request-create.component';

@Component({
    selector: 'leave-request-list',
    templateUrl: './leave-request-list.component.html',
    styleUrls: ['./leave-request-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveRequestListComponent implements OnInit {
    leaveRequestList = [];
    displayedLeaveRequestColumns = [
        'id','leaveType', 'startDate', 'duration', 'preparedVDate', 'readyRequest','hodApprovedStaff','hodApproved', 'hrApproved', 'reqClosed', 'actions'
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
        this.contactInfoService.getLeaveRequestList({ 'page': -1, staffId: employeeDetail.id }).subscribe(data => {
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
        this.dialogRef = this._matDialog.open(LeaveRequestCreateComponent, {
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
