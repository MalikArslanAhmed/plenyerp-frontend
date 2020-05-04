import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {ScheduleService} from "../../../../shared/services/schedule.service";
import {ScheduleCreateComponent} from '../schedule-create/schedule-create.component';
import {fuseAnimations} from "../../../../../@fuse/animations";

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

    constructor(private scheduleService: ScheduleService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getSchedule();
    }

    getSchedule() {
        this.scheduleService.getSchedule({'page': -1}).subscribe(data => {
            this.schedules = data.items;

            if (this.schedules && this.schedules.length > 0) {
                let i = 1;
                this.schedules.forEach(schedule => {
                    schedule['sno'] = i;
                    i++;
                });
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
}
