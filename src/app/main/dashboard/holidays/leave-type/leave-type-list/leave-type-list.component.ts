import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {LeaveTypeCreateComponent} from '../leave-type-create/leave-type-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'leave-type-list',
    templateUrl: './leave-type-list.component.html',
    styleUrls: ['./leave-type-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveTypeListComponent implements OnInit {
    leavesList = [];
    displayedLeavesTypeColumns = ['id', 'name','eAnually','pLeave','cDays','rLeaves', 'status', 'actions'];
    dialogRef: any;
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeavesTypeList();
    }

    getLeavesTypeList() {
        this.contactInfoService.getLeavesTypeList(this.pagination).subscribe(data => {
            this.leavesList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            this.pagination.pages = data.pages;
            if (this.leavesList && this.leavesList.length > 0) {
                let i = 1;
                this.leavesList.forEach(val => {
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
                this.deleteLeave(items.id);
            }
        });

    } 
    deleteLeave(id) {
        this.contactInfoService.deleteLeaves(id).subscribe(data => {
            if (data) {
                this.getLeavesTypeList();
            }
        });
    }

    editLeave(leave) {
        this.dialogRef = this._matDialog.open(LeaveTypeCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', leave: leave},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeavesTypeList();
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getLeavesTypeList();
    }
}
