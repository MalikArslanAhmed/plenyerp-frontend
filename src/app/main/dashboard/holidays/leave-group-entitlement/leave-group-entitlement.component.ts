import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import { LeaveGroupEntitlementListComponent } from './leave-group-entitlement-list/leave-group-entitlement-list.component';
import { LeaveGroupEntitlementCreateComponent } from './leave-group-entitlement-create/leave-group-entitlement-create.component';

@Component({
    selector: 'app-leave-group-entitlement',
    templateUrl: './leave-group-entitlement.component.html',
    styleUrls: ['./leave-group-entitlement.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveGroupEntitlementComponent implements OnInit {
    dialogRef: any;
    @ViewChild(LeaveGroupEntitlementListComponent) getLeaveGroupEntitlementList: LeaveGroupEntitlementListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addLeaveGroupEntitlement() {
        this.dialogRef = this._matDialog.open(LeaveGroupEntitlementCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveGroupEntitlementList.getLeaveGroupEntitlementList();
        });
    }
}
