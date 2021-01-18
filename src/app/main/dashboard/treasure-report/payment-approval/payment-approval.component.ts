import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PermissionConstant} from '../../../../shared/constants/permission-constant';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {PaymentApprovalCreateComponent} from './payment-approval-create/payment-approval-create.component';
import {PaymentApprovalListComponent} from './payment-approval-list/payment-approval-list.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-payment-approval',
    templateUrl: './payment-approval.component.html',
    styleUrls: ['./payment-approval.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PaymentApprovalComponent implements OnInit {
    dialogRef: any;
    filterPaymentApprovalForm: FormGroup;
    @ViewChild(PaymentApprovalListComponent) getMandateList: PaymentApprovalListComponent;
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
            this.addPaymentApproval(this.queryParams['paymentVoucherIds']);
        }
    }

    refresh() {
        this.filterPaymentApprovalForm = this.fb.group({
            'search': [''],
            'status': [''],
        });
    }

    addPaymentApproval(paymentVoucherIds?) {
        this.dialogRef = this._matDialog.open(PaymentApprovalCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', paymentVoucherIds: paymentVoucherIds}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getMandateList.getPaymentApprovalList();
        });
    }

    filterPaymentApproval() {
        this.getMandateList.getPaymentApprovalList(this.filterPaymentApprovalForm.value);
        // console.log('filterPaymentApprovalForm', this.filterPaymentApprovalForm.value);
    }
}
