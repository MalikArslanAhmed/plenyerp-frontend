import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { LeaveBalanceListComponent } from './leave-balance-list/leave-balance-list.component';

@Component({
    selector: 'app-leave-balance',
    templateUrl: './leave-balance.component.html',
    styleUrls: ['./leave-balance.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveBalanceComponent implements OnInit {
    @ViewChild(LeaveBalanceListComponent) getLeaveRequestClosedList: LeaveBalanceListComponent;

    constructor(
    ) {
    }

    ngOnInit(): void {
    }

}
