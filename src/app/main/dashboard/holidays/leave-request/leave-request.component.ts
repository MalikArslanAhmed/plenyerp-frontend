import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import { LeaveRequestCreateComponent } from './leave-request-create/leave-request-create.component';
import { LeaveRequestListComponent } from './leave-request-list/leave-request-list.component';

@Component({
    selector: 'app-leave-request',
    templateUrl: './leave-request.component.html',
    styleUrls: ['./leave-request.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveRequestComponent implements OnInit {
    dialogRef: any;
    @ViewChild(LeaveRequestListComponent) getLeaveRequestList: LeaveRequestListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addLeaveRequest() {
        this.dialogRef = this._matDialog.open(LeaveRequestCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveRequestList.getLeaveRequestList();
        });
    }
}
