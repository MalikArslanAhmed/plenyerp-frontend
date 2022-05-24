import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '../../../../../@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { ContactInfoService } from 'app/shared/services/contact-info.service';
import { LeaveEntitlementSalaryScaleCreateComponent } from './leave-entitlement-salary-scale-create/leave-entitlement-salary-scale-create.component';
import { LeaveEntitlementSalaryScaleListComponent } from './leave-entitlement-salary-scale-list/leave-entitlement-salary-scale-list.component';
import { SalaryScalesService } from 'app/shared/services/salary-scales.service';

@Component({
    selector: 'app-leave-entitlement-salary-scale',
    templateUrl: './leave-entitlement-salary-scale.component.html',
    styleUrls: ['./leave-entitlement-salary-scale.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveEntitlementSalaryScaleComponent implements OnInit {
    dialogRef: any;
    @ViewChild(LeaveEntitlementSalaryScaleListComponent) getLeaveGroupEntitlementList: LeaveEntitlementSalaryScaleListComponent;
    leaveEntitlementSalaryScaleId
    leaveSalaryScaleData: any = {}
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private route: ActivatedRoute,
        private _matDialog: MatDialog,
        private contactInfoService: ContactInfoService,
        private salaryScalesService: SalaryScalesService,
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(d => {
            this.leaveEntitlementSalaryScaleId = d.leaveEntitlementSalaryScaleId;
            this.salaryScalesService.getSalaryScales({'page': -1, id: this.leaveEntitlementSalaryScaleId,getById:'yes'}).subscribe(data => {
                this.leaveSalaryScaleData = data.items[0];
            });
        })
    }

    addLeaveEntitlementSalaryScale() {
        this.dialogRef = this._matDialog.open(LeaveEntitlementSalaryScaleCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'CREATE',leaveEntitlementSalaryScaleId: this.leaveEntitlementSalaryScaleId }
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveGroupEntitlementList.getLeaveEntitlementSalaryScaleList();
        });
    }
}
