import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '../../../../../@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { EmployeesService } from 'app/shared/services/employees.service';
import { GlobalService } from 'app/shared/services/global.service';
import { LeaveRequestApprovedListComponent } from './leave-request-approved-list/leave-request-approved-list.component';
import { LeaveRequestApprovedCreateComponent } from './leave-request-approved-create/leave-request-approved-create.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-leave-request-approved',
    templateUrl: './leave-request-approved.component.html',
    styleUrls: ['./leave-request-approved.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveRequestApprovedComponent implements OnInit {
    dialogRef: any;
    @ViewChild(LeaveRequestApprovedListComponent) getLeaveRequestList: LeaveRequestApprovedListComponent;
    employeeDetail: any = {}
    isFetching = true
    permissionAdd = [PermissionConstant.HOD_LEAVE_REQUEST_APPROVED_ADD]
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private employeesService: EmployeesService,
        private gService: GlobalService,
    ) {
    }

    ngOnInit(): void {
        this.getEmployeeDetails()
    }

    getEmployeeDetails() {
        this.employeesService.getEmployees({ page: -1, personnelFileNumber: this.gService.self.value.username }).subscribe(data => {
            this.employeeDetail = data.items[0]
            this.isFetching = false
        })
    }
    addLeaveRequest() {
        this.dialogRef = this._matDialog.open(LeaveRequestApprovedCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'CREATE', employeeDetail: this.employeeDetail }
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveRequestList.getLeaveRequestList(this.employeeDetail);
        });
    }
}
