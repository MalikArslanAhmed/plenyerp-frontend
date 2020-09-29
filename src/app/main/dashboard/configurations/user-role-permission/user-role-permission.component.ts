import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'app-user-role-permission',
    templateUrl: './user-role-permission.component.html',
    styleUrls: ['./user-role-permission.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UserRolePermissionComponent implements OnInit {
    dialogRef: any;
    panelOpenState = false;
    checked = false;
    indeterminate = false;
    labelPosition: 'before' | 'after' = 'after';
    disabled = false;
    permissionModule = [
        {
            id: 1,
            moduleName: ' Self aware panel 1',
            rolePermission: [],
        },
        {
            id: 2,
            moduleName: ' Self aware panel 2',
            rolePermission: [],
        },
        {
            id: 3,
            moduleName: ' Self aware panel 3',
            rolePermission: [],
        }
    ];
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

}
