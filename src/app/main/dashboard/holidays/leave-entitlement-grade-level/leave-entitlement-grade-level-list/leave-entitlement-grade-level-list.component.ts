import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { LeaveEntitlementGradeLevelCreateComponent } from '../leave-entitlement-grade-level-create/leave-entitlement-grade-level-create.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'leave-entitlement-grade-level-list',
    templateUrl: './leave-entitlement-grade-level-list.component.html',
    styleUrls: ['./leave-entitlement-grade-level-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveEntitlementGradeLevelListComponent implements OnInit {
    leaveEntitlementGradeLevelList = [];
    displayedLeaveEntitlementGradeLevelColumns = ['id', 'leaveType', 'dueDays', 'actions'];
    dialogRef: any;
    selectIndex = 0;
    @Input() leaveEntitlementGradeLevelId
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    permissionEdit = [PermissionConstant.LEAVE_ENTITLEMENT_GRADE_LEVEL_EDIT];
    permissionDelete = [PermissionConstant.LEAVE_ENTITLEMENT_GRADE_LEVEL_DELETE];
    constructor(private contactInfoService: ContactInfoService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeaveEntitlementGradeLevelList();
    }

    getLeaveEntitlementGradeLevelList() {
        this.contactInfoService.getLeaveEntitlementGradeLevelList({ ...this.pagination, gradeId: this.leaveEntitlementGradeLevelId }).subscribe(data => {
            this.leaveEntitlementGradeLevelList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            this.pagination.pages = data.pages;
            if (this.leaveEntitlementGradeLevelList && this.leaveEntitlementGradeLevelList.length > 0) {
                let i = 1;
                this.leaveEntitlementGradeLevelList.forEach(val => {
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
                this.deleteLeaveEntitlementGradeLevel(items.id);
            }
        });

    }
    deleteLeaveEntitlementGradeLevel(id) {
        this.contactInfoService.deleteLeaveEntitlementGradeLevel(id).subscribe(data => {
            if (data) {
                this.getLeaveEntitlementGradeLevelList();
            }
        });
    }

    editLeave(leaveEntitlementGradeLevel) {
        this.dialogRef = this._matDialog.open(LeaveEntitlementGradeLevelCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'EDIT', leaveEntitlementGradeLevel: leaveEntitlementGradeLevel },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getLeaveEntitlementGradeLevelList();
    }
}
