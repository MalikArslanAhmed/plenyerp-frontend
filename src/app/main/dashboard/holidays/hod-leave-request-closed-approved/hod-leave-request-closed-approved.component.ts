import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '../../../../../@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { EmployeesService } from 'app/shared/services/employees.service';
import { GlobalService } from 'app/shared/services/global.service';
import { HodLeaveRequestClosedApprovedCreateComponent } from './hod-leave-request-closed-approved-create/hod-leave-request-closed-approved-create.component';
import { HodLeaveRequestClosedApprovedListComponent } from './hod-leave-request-closed-approved-list/hod-leave-request-closed-approved-list.component';

@Component({
    selector: 'app-hod-leave-request-closed-approved',
    templateUrl: './hod-leave-request-closed-approved.component.html',
    styleUrls: ['./hod-leave-request-closed-approved.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class HodLeaveRequestClosedApprovedComponent implements OnInit {
    dialogRef: any;
    @ViewChild(HodLeaveRequestClosedApprovedListComponent) getHodLeaveRequestClosedList: HodLeaveRequestClosedApprovedListComponent;
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
        this.dialogRef = this._matDialog.open(HodLeaveRequestClosedApprovedCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'CREATE', employeeDetail: this.employeeDetail }
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getHodLeaveRequestClosedList.getLeaveRequestClosedList(this.employeeDetail);
        });
    }
}
