import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { LeaveGroupMemberCreateComponent } from '../leave-group-member-create/leave-group-member-create.component';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'leave-group-member-list',
    templateUrl: './leave-group-member-list.component.html',
    styleUrls: ['./leave-group-member-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveGroupMemberListComponent implements OnInit {
    leaveGroupMemberList = [];
    displayedLeavesTypeColumns = ['id','fileNo', 'staffFN', 'staffLN', 'groupName', 'actions'];
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
        this.getLeaveGroupMemberList();
    }

    getLeaveGroupMemberList() {
        this.contactInfoService.getLeaveGroupMemberList({...this.pagination,leaveGroupId:this.leaveGroupId}).subscribe(data => {
            this.leaveGroupMemberList =data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            this.pagination.pages = data.pages;
            if (this.leaveGroupMemberList && this.leaveGroupMemberList.length > 0) {
                let i = 1;
                this.leaveGroupMemberList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: { data: items }
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteLeaveGroupMember(items.id);
            }
        });

    }
    deleteLeaveGroupMember(id) {
        this.contactInfoService.deleteLeaveGroupMember(id).subscribe(data => {
            if (data) {
                this.getLeaveGroupMemberList();
            }
        });
    }

    editLeave(leaveGroupMember) {
        this.dialogRef = this._matDialog.open(LeaveGroupMemberCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: { action: 'EDIT', leaveGroupMember: leaveGroupMember },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveGroupMemberList();
        });
    }

    
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getLeaveGroupMemberList();
    }

}
