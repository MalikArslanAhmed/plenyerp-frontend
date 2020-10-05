import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {DesignationCreateComponent} from './designation-create/designation-create.component';
import {DesignationListComponent} from './designation-list/designation-list.component';
import {fuseAnimations} from '../../../../@fuse/animations';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-designation',
    templateUrl: './designation.component.html',
    styleUrls: ['./designation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DesignationComponent implements OnInit {
    dialogRef: any;
    @ViewChild(DesignationListComponent) getDesignationList: DesignationListComponent;

    permissionAddDesignation = [PermissionConstant.DESIGNATION_ADD];
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addDesignation() {
        this.dialogRef = this._matDialog.open(DesignationCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getDesignationList.getDesignationList();
        });
    }
}
