import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '../../../../../@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { LeaveGroupMemberCreateComponent } from './leave-group-member-create/leave-group-member-create.component';
import { LeaveGroupMemberListComponent } from './leave-group-member-list/leave-group-member-list.component';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { ContactInfoService } from 'app/shared/services/contact-info.service';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-leave-group-member',
    templateUrl: './leave-group-member.component.html',
    styleUrls: ['./leave-group-member.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveGroupMemberComponent implements OnInit {
    dialogRef: any;
    @ViewChild(LeaveGroupMemberListComponent) getLeaveGroupMemberList: LeaveGroupMemberListComponent;
    leaveGroupId
    leaveGroupData:any = {}
    permissionAdd = [PermissionConstant.LEAVE_GROUP_MEMBER_ADD]
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private route: ActivatedRoute,
        private _matDialog: MatDialog,
        private contactInfoService: ContactInfoService,) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(d => {
            this.leaveGroupId = d.leaveGroupId;
            this.contactInfoService.getLeavesGroupList({ 'page': -1, id: this.leaveGroupId }).subscribe(data => {
                this.leaveGroupData = data.items[0];
            });
        })
    }

    addLeaveGroupMember() {
        this.dialogRef = this._matDialog.open(LeaveGroupMemberCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'CREATE', leaveGroupId: this.leaveGroupId }
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveGroupMemberList.getLeaveGroupMemberList();
        });
    }
}
