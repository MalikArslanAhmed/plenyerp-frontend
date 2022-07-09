import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { LeaveRequestReportListComponent } from './leave-request-report-list/leave-request-report-list.component';

@Component({
    selector: 'app-leave-request-report',
    templateUrl: './leave-request-report.component.html',
    styleUrls: ['./leave-request-report.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveRequestReportComponent implements OnInit {
    @ViewChild(LeaveRequestReportListComponent) getLeaveRequestClosedList: LeaveRequestReportListComponent;

    constructor(
    ) {
    }

    ngOnInit(): void {
    }

}
