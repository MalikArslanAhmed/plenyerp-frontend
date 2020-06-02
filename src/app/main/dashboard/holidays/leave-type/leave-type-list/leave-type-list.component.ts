import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {LeaveTypeCreateComponent} from '../leave-type-create/leave-type-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'leave-type-list',
    templateUrl: './leave-type-list.component.html',
    styleUrls: ['./leave-type-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveTypeListComponent implements OnInit {
    leavesList = [];
    displayedLeavesTypeColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;
    selectIndex = 0;
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getLeavesTypeList();
    }

    getLeavesTypeList() {
        this.contactInfoService.getLeavesTypeList({'page': -1}).subscribe(data => {
            this.leavesList = data.items;

            if (this.leavesList && this.leavesList.length > 0) {
                let i = 1;
                this.leavesList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
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

}
