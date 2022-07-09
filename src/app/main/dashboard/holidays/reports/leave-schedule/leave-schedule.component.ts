import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { LeaveScheduleListComponent } from './leave-schedule-list/leave-schedule-list.component';

@Component({
    selector: 'app-leave-schedule',
    templateUrl: './leave-schedule.component.html',
    styleUrls: ['./leave-schedule.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveScheduleComponent implements OnInit {
    @ViewChild(LeaveScheduleListComponent) getLeaveRequestClosedList: LeaveScheduleListComponent;

    constructor(
    ) {
    }

    ngOnInit(): void {
    }

}
