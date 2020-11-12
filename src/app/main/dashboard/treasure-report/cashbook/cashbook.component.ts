import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CashbookCreateComponent} from './cashbook-create/cashbook-create.component';
import {CashbookListComponent} from './cashbook-list/cashbook-list.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {PermissionConstant} from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-cashbook',
    templateUrl: './cashbook.component.html',
    styleUrls: ['./cashbook.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CashbookComponent implements OnInit {
    dialogRef: any;
    searchVoucherSourceForm: FormGroup;
    @ViewChild(CashbookListComponent) getUserRoleList: CashbookListComponent;

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

    addCashbook() {
        this.dialogRef = this._matDialog.open(CashbookCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getUserRoleList.getcashbookList();
        });
    }

    search() {
    }
}
