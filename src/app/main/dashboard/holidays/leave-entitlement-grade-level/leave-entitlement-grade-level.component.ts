import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '../../../../../@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { ContactInfoService } from 'app/shared/services/contact-info.service';
import { SalaryScalesService } from 'app/shared/services/salary-scales.service';
import { LeaveEntitlementGradeLevelListComponent } from './leave-entitlement-grade-level-list/leave-entitlement-grade-level-list.component';
import { LeaveEntitlementGradeLevelCreateComponent } from './leave-entitlement-grade-level-create/leave-entitlement-grade-level-create.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-leave-entitlement-grade-level',
    templateUrl: './leave-entitlement-grade-level.component.html',
    styleUrls: ['./leave-entitlement-grade-level.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveEntitlementGradeLevelComponent implements OnInit {
    dialogRef: any;
    @ViewChild(LeaveEntitlementGradeLevelListComponent) getLeaveEntitlementGradeLevelList: LeaveEntitlementGradeLevelListComponent;
    leaveEntitlementGradeLevelId
    leaveGradeLevelData: any = {}
    permissionAdd = [PermissionConstant.LEAVE_ENTITLEMENT_GRADE_LEVEL_ADD]
    constructor(
        private route: ActivatedRoute,
        private _matDialog: MatDialog,
        private salaryScalesService: SalaryScalesService,
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(d => {
            this.leaveEntitlementGradeLevelId = d.leaveEntitlementGradeLevelId;
            this.salaryScalesService.getGradeLevels({'page': -1, id: this.leaveEntitlementGradeLevelId,getById:'yes'}).subscribe(data => {
                this.leaveGradeLevelData = data;
            });
        })
    }

    addLeaveEntitlementGradeLevel() {
        this.dialogRef = this._matDialog.open(LeaveEntitlementGradeLevelCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'CREATE',leaveEntitlementGradeLevelId: this.leaveEntitlementGradeLevelId }
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveEntitlementGradeLevelList.getLeaveEntitlementGradeLevelList();
        });
    }
}
