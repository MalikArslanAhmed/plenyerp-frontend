import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../../@fuse/animations";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PermissionConstant} from "../../../../shared/constants/permission-constant";
import {FuseSidebarService} from "../../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {OnMandateCreateComponent} from "./on-mandate-create/on-mandate-create.component";
import {OnMandateListComponent} from "./on-mandate-list/on-mandate-list.component";
import {ActivatedRoute} from "@angular/router";

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
    permissionAddMandate = [PermissionConstant.MANDATE_ADD];
    statuses = [
        {
            'name': 'New',
            'value': 'NEW',
        },
        {
            'name': '1st Authorised',
            'value': '1ST_AUTHORISED',
        },
        {
            'name': '2nd Authorised',
            'value': '2ND_AUTHORISED',
        },
        {
            'name': 'Posted to GL',
            'value': 'POSTED_TO_GL',
        }
    ];
    queryParams: any = {};

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.refresh();
        this.queryParams = this.activatedRoute.snapshot.queryParams;
        if (this.queryParams['paymentVoucherIds']) {
            this.addOnMandate(this.queryParams['paymentVoucherIds'])
        }
    }

    refresh() {
        this.filterMandateForm = this.fb.group({
            'search': [''],
            'status': [''],
        });
    }

    addOnMandate(paymentVoucherIds?) {
        this.dialogRef = this._matDialog.open(OnMandateCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', paymentVoucherIds: paymentVoucherIds}
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
