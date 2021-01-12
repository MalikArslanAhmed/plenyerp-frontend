import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PermissionConstant} from "../../../../shared/constants/permission-constant";
import {FuseSidebarService} from "../../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {OnMandateCreateComponent} from "./on-mandate-create/on-mandate-create.component";
import {OnMandateListComponent} from "./on-mandate-list/on-mandate-list.component";

@Component({
    selector: 'app-on-mandate',
    templateUrl: './on-mandate.component.html',
    styleUrls: ['./on-mandate.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OnMandateComponent implements OnInit {
    dialogRef: any;
    filterMandateForm: FormGroup;
    @ViewChild(OnMandateListComponent) getMandateList: OnMandateListComponent;
    permissionAddRoles = [PermissionConstant.ROLES_ADD];
    statuses = [
        {
            'name': 'New',
            'value': 'NEW',
        },
        {
            'name': 'Ist Authorised',
            'value': '1ST_AUTHORISED',
        },
        {
            'name': 'IInd Authorised',
            'value': '2ND_AUTHORISED',
        },
        {
            'name': 'Posted to GL',
            'value': 'POSTED_TO_GL',
        }
    ];

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.filterMandateForm = this.fb.group({
            'search': [''],
            'status': [''],
        });
    }

    addOnMandate() {
        this.dialogRef = this._matDialog.open(OnMandateCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getMandateList.getMadateList();
        });
    }

    filterMandate() {
        this.getMandateList.getMadateList(this.filterMandateForm.value);
        // console.log('filterMandateForm', this.filterMandateForm.value);
    }
}
