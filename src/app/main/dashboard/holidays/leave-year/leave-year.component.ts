import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import { LeaveYearListComponent } from './leave-year-list/leave-year-list.component';
import { LeaveYearCreateComponent } from './leave-year-create/leave-year-create.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-leave-year',
    templateUrl: './leave-year.component.html',
    styleUrls: ['./leave-year.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveYearComponent implements OnInit {
    dialogRef: any;
    @ViewChild(LeaveYearListComponent) getLeaveYearList: LeaveYearListComponent;
    permissionAdd = [PermissionConstant.LEAVE_YEAR_ADD]

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addLeaveYear() {
        this.dialogRef = this._matDialog.open(LeaveYearCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveYearList.getLeaveYearList();
        });
    }
}
