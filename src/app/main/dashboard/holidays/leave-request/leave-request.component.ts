import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '../../../../../@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { LeaveRequestCreateComponent } from './leave-request-create/leave-request-create.component';
import { LeaveRequestListComponent } from './leave-request-list/leave-request-list.component';
import { EmployeesService } from 'app/shared/services/employees.service';
import { GlobalService } from 'app/shared/services/global.service';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-leave-request',
    templateUrl: './leave-request.component.html',
    styleUrls: ['./leave-request.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveRequestComponent implements OnInit {
    dialogRef: any;
    @ViewChild(LeaveRequestListComponent) getLeaveRequestList: LeaveRequestListComponent;
    employeeDetail: any = {}
    isFetching = true
    permissionAdd = [PermissionConstant.LEAVE_REQUESTS_ADD]

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
        this.dialogRef = this._matDialog.open(LeaveRequestCreateComponent, {
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
