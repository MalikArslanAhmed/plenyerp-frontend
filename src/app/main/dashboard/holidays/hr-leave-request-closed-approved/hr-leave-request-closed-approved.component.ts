import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '../../../../../@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { EmployeesService } from 'app/shared/services/employees.service';
import { GlobalService } from 'app/shared/services/global.service';
import { LeaveRequestApprovedCreateComponent } from '../leave-request-approved/leave-request-approved-create/leave-request-approved-create.component';
import { HrLeaveRequestClosedApprovedListComponent } from './hr-leave-request-closed-approved-list/hr-leave-request-closed-approved-list.component';

@Component({
    selector: 'app-hr-leave-request-closed-approved',
    templateUrl: './hr-leave-request-closed-approved.component.html',
    styleUrls: ['./hr-leave-request-closed-approved.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class HrLeaveRequestClosedApprovedComponent implements OnInit {
    dialogRef: any;
    @ViewChild(HrLeaveRequestClosedApprovedListComponent) getLeaveRequestclosedApprovedList: HrLeaveRequestClosedApprovedListComponent;
    employeeDetail: any = {}
    isFetching = true
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
            this.getLeaveRequestclosedApprovedList.getLeaveRequestList(this.employeeDetail);
        });
    }
}
