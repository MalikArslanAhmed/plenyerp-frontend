import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {StatusListComponent} from './status-list/status-list.component';
import {StatusCreateComponent} from "./status-create/status-create.component";
import {fuseAnimations} from "../../../../@fuse/animations";
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StatusComponent implements OnInit {
    dialogRef: any;
    @ViewChild(StatusListComponent) getStatus: StatusListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    permissionAddStaffStatus = [PermissionConstant.STAFF_STATUS_ADD];
    ngOnInit(): void {
    }

    addStatus() {
        this.dialogRef = this._matDialog.open(StatusCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getStatus.getStatus();
        });
    }
}
