import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VoucherSourceUnitCreateComponent} from './voucher-source-unit-create/voucher-source-unit-create.component';
import {VoucherSourceUnitListComponent} from './voucher-source-unit-list/voucher-source-unit-list.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {PermissionConstant} from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-voucher-source-unit',
    templateUrl: './voucher-source-unit.component.html',
    styleUrls: ['./voucher-source-unit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class VoucherSourceUnitComponent implements OnInit {
    dialogRef: any;
    searchVoucherSourceForm: FormGroup;
    @ViewChild(VoucherSourceUnitListComponent) getUserRoleList: VoucherSourceUnitListComponent;

    permissionAddRoles = [PermissionConstant.ROLES_ADD];

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.searchVoucherSourceForm = this.fb.group({
            'searchVoucherSource': [''],
        });
    }

    addUserRole() {
        this.dialogRef = this._matDialog.open(VoucherSourceUnitCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getUserRoleList.getVoucherSourceUnitList();
        });
    }

    search() {

    }
}
