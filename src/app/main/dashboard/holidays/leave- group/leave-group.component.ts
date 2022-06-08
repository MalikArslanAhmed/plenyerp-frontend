import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {LeaveGroupCreateComponent} from './leave-group-create/leave-group-create.component';
import {LeaveGroupListComponent} from './leave-group-list/leave-group-list.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-leave-group',
    templateUrl: './leave-group.component.html',
    styleUrls: ['./leave-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveGroupComponent implements OnInit {
    @ViewChild(LeaveGroupListComponent) getLeaveGroupList: LeaveGroupListComponent;
    dialogRef: any;
    permissionAdd = [PermissionConstant.LEAVE_GROUP_ADD]

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addLeaveGroup() {
        this.dialogRef = this._matDialog.open(LeaveGroupCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveGroupList.getLeaveGroupList();
        });
    }
}
