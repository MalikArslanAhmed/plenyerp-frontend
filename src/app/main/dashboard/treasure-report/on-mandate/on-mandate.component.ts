import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CashbookListComponent} from "../cashbook/cashbook-list/cashbook-list.component";
import {PermissionConstant} from "../../../../shared/constants/permission-constant";
import {FuseSidebarService} from "../../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {CashbookCreateComponent} from "../cashbook/cashbook-create/cashbook-create.component";

@Component({
    selector: 'app-on-mandate',
    templateUrl: './on-mandate.component.html',
    styleUrls: ['./on-mandate.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OnMandateComponent implements OnInit {
    dialogRef: any;
    searchForm: FormGroup;
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
        this.searchForm = this.fb.group({
            'search': [''],
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
