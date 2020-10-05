import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {ScheduleService} from '../../../../shared/services/schedule.service';
import {ScheduleCreateComponent} from '../schedule-create/schedule-create.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from '../../delete-list-modal/delete-list-modal.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ScheduleListComponent implements OnInit {
    schedules = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    
    permissionEditSchedule = [PermissionConstant.SCHEDULE_EDIT];
    permissionDeleteSchedule = [PermissionConstant.SCHEDULE_DELETE];

    constructor(private scheduleService: ScheduleService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getSchedule();
    }

    getSchedule() {
        this.schedules = [];
        this.scheduleService.getSchedule({page: this.pagination.page}).subscribe(data => {
            this.schedules = data.items;

            if (this.schedules && this.schedules.length > 0) {
                let i = 1;
                this.schedules.forEach(schedule => {
                    schedule['sno'] = i;
                    i++;
                });
            }
            this.pagination.page = data.page;
            this.pagination.total = data.total;
        });
    }

    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteSchedule(items.id);
            }
        });

    } 


    deleteSchedule(id) {
        this.scheduleService.deleteSchedule(id).subscribe(data => {
            if (data) {
                this.getSchedule();
            }
        })
    }

    editSchedule(schedule) {
        this.dialogRef = this._matDialog.open(ScheduleCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', schedule: schedule},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getSchedule();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getSchedule();
    }
}
