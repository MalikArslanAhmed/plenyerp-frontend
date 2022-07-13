import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {LeaveTypeCreateComponent} from './leave-type-create/leave-type-create.component';
import {LeaveTypeListComponent} from './leave-type-list/leave-type-list.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-leave-type',
    templateUrl: './leave-type.component.html',
    styleUrls: ['./leave-type.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveTypeComponent implements OnInit {
    dialogRef: any;
    @ViewChild(LeaveTypeListComponent) getLeavesTypeList: LeaveTypeListComponent;
    permissionAddTypeOfLeave = [PermissionConstant.TYPES_OF_LEAVES_ADD]

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addLeaveType() {
        this.dialogRef = this._matDialog.open(LeaveTypeCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeavesTypeList.getLeavesTypeList();
        });
    }
}
