import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { LeaveGroupEntitlementCreateComponent } from '../leave-group-entitlement-create/leave-group-entitlement-create.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'leave-group-entitlement-list',
    templateUrl: './leave-group-entitlement-list.component.html',
    styleUrls: ['./leave-group-entitlement-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveGroupEntitlementListComponent implements OnInit {
    leaveGroupEntitlementList = [];
    displayedLeaveGroupEntitlementColumns = ['id','leaveType','dueDays', 'actions'];
    dialogRef: any;
    selectIndex = 0;
    @Output() selectedIndexChange: EventEmitter<number>;
    @Input() leaveGroupId
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeaveGroupEntitlementList();
    }

    getLeaveGroupEntitlementList() {
        this.contactInfoService.getLeaveGroupEntitlementList({...this.pagination,leaveGroupId:this.leaveGroupId}).subscribe(data => {
            this.leaveGroupEntitlementList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            this.pagination.pages = data.pages;
            if (this.leaveGroupEntitlementList && this.leaveGroupEntitlementList.length > 0) {
                let i = 1;
                this.leaveGroupEntitlementList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteLeaveGroupEntitlement(items.id);
            }
        });

    } 
    deleteLeaveGroupEntitlement(id) {
        this.contactInfoService.deleteLeaveGroupEntitlement(id).subscribe(data => {
            if (data) {
                this.getLeaveGroupEntitlementList();
            }
        });
    }

    editLeave(leaveGroupEntitlement) {
        this.dialogRef = this._matDialog.open(LeaveGroupEntitlementCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', leaveGroupEntitlement: leaveGroupEntitlement},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveGroupEntitlementList();
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getLeaveGroupEntitlementList();
    }
}
