import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '../../../../../@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { LeaveCreditListComponent } from './leave-credit-list/leave-credit-list.component';
import { LeaveCreditCreateComponent } from './leave-credit-create/leave-credit-create.component';
import { ContactInfoService } from 'app/shared/services/contact-info.service';
import { EmployeesService } from 'app/shared/services/employees.service';
import { SalaryScalesService } from 'app/shared/services/salary-scales.service';
import { GlobalService } from 'app/shared/services/global.service';
import * as moment from 'moment'
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-leave-credit',
    templateUrl: './leave-credit.component.html',
    styleUrls: ['./leave-credit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveCreditComponent implements OnInit {
    moment = moment
    dialogRef: any;
    @ViewChild(LeaveCreditListComponent) getLeaveCreditList: LeaveCreditListComponent;
    leaveGroupMembersList = []
    leaveGroupEntitlementList = []
    leavetypeList = []
    employeeJobProfilesList = []
    leaveEntitlementSalaryScaleList = []
    leaveEntitlementgradeLevelList = []
    gradeLevelList = []
    salaryScalesList = []
    currentYear: any = {}
    employeesList = []
    activeYearsList = []
    leaveCreditViewList = []
    dataLoaded = []
    permissionAdd = [PermissionConstant.LEAVE_CREDIT_ADD]

    constructor(
        private _matDialog: MatDialog,
        private contactInfoService: ContactInfoService,
        public gs: GlobalService
    ) {
    }

    ngOnInit(): void {
        this.getCurrentYear()
        this.getLeaveCreditViewList()
    }

    getCurrentYear() {
        this.contactInfoService.getInformationList({ 'page': -1 }).subscribe(data => {
            this.currentYear = data.items[0];
            this.dataLoaded.push(true)
        });
    }

    getActiveYearsList() {
        this.contactInfoService.getLeaveYearList({ 'page': -1, isActie: 1 }).subscribe(data => {
            this.activeYearsList = data.items;
            this.dataLoaded.push(true)
        });
    }

    getLeaveCreditViewList() {
        this.contactInfoService.getLeaveCreditViewList({}).subscribe(data => {
            this.leaveCreditViewList = data;
            this.dataLoaded.push(true)
        });
    }

    getData() {
        const data = {
            currentYear: this.currentYear,
            leaveCreditViewList: this.leaveCreditViewList,
        }
        this.addLeaveCredit(data)
    }
    addLeaveCredit(data?) {
        this.dialogRef = this._matDialog.open(LeaveCreditCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: data ? { action: 'CREATE BULK UPLOAD', bulkUploadData: data, } : { action: 'CREATE' }
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveCreditList.getLeaveCreditList();
        });
    }
}
