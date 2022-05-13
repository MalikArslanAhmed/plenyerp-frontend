import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {LeaveGroupCreateComponent} from '../leave-group-create/leave-group-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';

@Component({
    selector: 'leave-group-list',
    templateUrl: './leave-group-list.component.html',
    styleUrls: ['./leave-group-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveGroupListComponent implements OnInit {
    leaveGroupList = [];
    displayedLeaveGroupColumns = ['id', 'title', 'status', 'actions'];
    dialogRef: any;
    selectIndex = 0;
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeaveGroupList();
    }

    getLeaveGroupList() {
        this.contactInfoService.getLeavesGroupList({'page': -1}).subscribe(data => {
            this.leaveGroupList = data.items;

            if (this.leaveGroupList && this.leaveGroupList.length > 0) {
                let i = 1;
                this.leaveGroupList.forEach(val => {
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
                this.deleteLeaveGroup(items.id);
            }
        });

    } 

    deleteLeaveGroup(id) {
        this.contactInfoService.deleteLeavesGroup(id).subscribe(data => {
            if (data) {
                this.getLeaveGroupList();
            }
        });
    }

    editLeaveGroup(leaveGroup) {
        this.dialogRef = this._matDialog.open(LeaveGroupCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', leaveGroup: leaveGroup},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveGroupList();
        });
    }

}
