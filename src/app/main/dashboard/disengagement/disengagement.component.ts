import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {DisengagementCreateComponent} from './disengagement-create/disengagement-create.component';
import {DisengagementListComponent} from './disengagement-list/disengagement-list.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-disengagement',
    templateUrl: './disengagement.component.html',
    styleUrls: ['./disengagement.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DisengagementComponent implements OnInit {
    dialogRef: any;
    @ViewChild(DisengagementListComponent) getDisengagements: DisengagementListComponent;

    permissionAddDisengagement = [PermissionConstant.DISENGAGEMENT_ADD]
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addDisengagements() {
        this.dialogRef = this._matDialog.open(DisengagementCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getDisengagements.getDisengagements();
        });
    }
}
