import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '../../../../../@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { EmployeesService } from 'app/shared/services/employees.service';
import { GlobalService } from 'app/shared/services/global.service';
import { LeaveRequestClosedListComponent } from './leave-request-closed-list/leave-request-closed-list.component';
import { LeaveRequestClosedCreateComponent } from './leave-request-closed-create/leave-request-closed-create.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-leave-request-closed',
    templateUrl: './leave-request-closed.component.html',
    styleUrls: ['./leave-request-closed.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveRequestClosedComponent implements OnInit {
    dialogRef: any;
    @ViewChild(LeaveRequestClosedListComponent) getLeaveRequestClosedList: LeaveRequestClosedListComponent;
    employeeDetail: any = {}
    isFetching = true
    permissionAdd = [PermissionConstant.LEAVE_REQUESTS_CLOSED_ADD]

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
    addLeaveRequestClosed() {
        this.dialogRef = this._matDialog.open(LeaveRequestClosedCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'CREATE', employeeDetail: this.employeeDetail }
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveRequestClosedList.getLeaveRequestClosedList(this.employeeDetail);
        });
    }
}
