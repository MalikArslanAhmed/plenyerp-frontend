import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { LeaveOnListComponent } from './leave-on-list/leave-on-list.component';

@Component({
    selector: 'app-leave-on',
    templateUrl: './leave-on.component.html',
    styleUrls: ['./leave-on.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveOnComponent implements OnInit {
    @ViewChild(LeaveOnListComponent) getLeaveRequestClosedList: LeaveOnListComponent;

    constructor(
    ) {
    }

    ngOnInit(): void {
    }

}
