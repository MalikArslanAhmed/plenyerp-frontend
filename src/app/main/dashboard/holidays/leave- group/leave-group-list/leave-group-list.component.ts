import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { LeaveGroupCreateComponent } from '../leave-group-create/leave-group-create.component';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'leave-group-list',
    templateUrl: './leave-group-list.component.html',
    styleUrls: ['./leave-group-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveGroupListComponent implements OnInit {
    @Output() selectedIndexChange: EventEmitter<number>;
    leaveGroupList = [];
    displayedLeaveGroupColumns = ['id', 'title', 'status', 'actions'];
    dialogRef: any;
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    permissionEdit = [PermissionConstant.LEAVE_GROUP_EDIT];
    permissionDelete = [PermissionConstant.LEAVE_GROUP_DELETE];
    permissionListGroupMember = [PermissionConstant.LEAVE_GROUP_MEMBER_LIST];
    permissionListGroupEntitlement = [PermissionConstant.LEAVE_GROUP_Entitlement_LIST];
    constructor(private contactInfoService: ContactInfoService,
        private _matDialog: MatDialog,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.getLeaveGroupList();
    }

    addGroupMember(leaveGroup) {
        this.router.navigateByUrl('dashboard/leave-group-member/' + leaveGroup.id);
    }

    addGroupEntitlement(leaveGroup) {
        this.router.navigateByUrl('dashboard/leave-group-entitlement/' + leaveGroup.id);
    }
    
    getLeaveGroupList() {
        this.contactInfoService.getLeavesGroupList(this.pagination).subscribe(data => {
            this.leaveGroupList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            this.pagination.pages = data.pages;
            if (this.leaveGroupList && this.leaveGroupList.length > 0) {
                let i = 1;
                this.leaveGroupList.forEach(val => {
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
                this.deleteLeaveGroup(items.id);
            }
        });

    }

    deleteLeaveGroup(id) {
        this.contactInfoService.deleteLeavesGroup(id).subscribe(data => {
            if (data) {
                this.getLeaveGroupList();
            }
        });
    }

    editLeaveGroup(leaveGroup) {
        this.dialogRef = this._matDialog.open(LeaveGroupCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'EDIT', leaveGroup: leaveGroup },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveGroupList();
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getLeaveGroupList();
    }
}
