import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { LeaveYearCreateComponent } from '../leave-year-create/leave-year-create.component';

@Component({
    selector: 'leave-year-list',
    templateUrl: './leave-year-list.component.html',
    styleUrls: ['./leave-year-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveYearListComponent implements OnInit {
    leaveYearList = [];
    displayedLeaveYearColumns = ['id','leaveYear', 'actions'];
    dialogRef: any;
    selectIndex = 0;
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeaveYearList();
    }

    getLeaveYearList() {
        this.contactInfoService.getLeaveYearList({'page': -1}).subscribe(data => {
            this.leaveYearList = data.items;

            if (this.leaveYearList && this.leaveYearList.length > 0) {
                let i = 1;
                this.leaveYearList.forEach(val => {
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
                this.deleteLeaveYear(items.id);
            }
        });

    } 
    deleteLeaveYear(id) {
        this.contactInfoService.deleteLeaveYear(id).subscribe(data => {
            if (data) {
                this.getLeaveYearList();
            }
        });
    }

    editLeave(leaveYear) {
        this.dialogRef = this._matDialog.open(LeaveYearCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', leaveYear: leaveYear},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveYearList();
        });
    }

}
