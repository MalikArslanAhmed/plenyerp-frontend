import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { LeaveEntitlementSalaryScaleCreateComponent } from '../leave-entitlement-salary-scale-create/leave-entitlement-salary-scale-create.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'leave-entitlement-salary-scale-list',
    templateUrl: './leave-entitlement-salary-scale-list.component.html',
    styleUrls: ['./leave-entitlement-salary-scale-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveEntitlementSalaryScaleListComponent implements OnInit {
    @Output() selectedIndexChange: EventEmitter<number>;
    @Input() leaveEntitlementSalaryScaleId
    leaveEntitlementSalaryScaleList = [];
    displayedLeaveEntitlementSalaryScaleColumns = ['id', 'leaveType', 'dueDays', 'actions'];
    dialogRef: any;
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    permissionEdit = [PermissionConstant.LEAVE_ENTITLEMENT_SALARY_SCALE_EDIT];
    permissionDelete = [PermissionConstant.LEAVE_ENTITLEMENT_SALARY_SCALE_DELETE];
    constructor(private contactInfoService: ContactInfoService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeaveEntitlementSalaryScaleList();
    }

    getLeaveEntitlementSalaryScaleList() {
        this.contactInfoService.getLeaveEntitlementSalaryScaleList({ ...this.pagination, salaryId: this.leaveEntitlementSalaryScaleId }).subscribe(data => {
            this.leaveEntitlementSalaryScaleList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            this.pagination.pages = data.pages;
            if (this.leaveEntitlementSalaryScaleList && this.leaveEntitlementSalaryScaleList.length > 0) {
                let i = 1;
                this.leaveEntitlementSalaryScaleList.forEach(val => {
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
                this.deleteLeaveEntitlementSalaryScale(items.id);
            }
        });

    }
    deleteLeaveEntitlementSalaryScale(id) {
        this.contactInfoService.deleteLeaveEntitlementSalaryScale(id).subscribe(data => {
            if (data) {
                this.getLeaveEntitlementSalaryScaleList();
            }
        });
    }

    editLeave(leaveEntitlementSalaryScale) {
        this.dialogRef = this._matDialog.open(LeaveEntitlementSalaryScaleCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'EDIT', leaveEntitlementSalaryScale: leaveEntitlementSalaryScale },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getLeaveEntitlementSalaryScaleList();
    }
}
