import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import { LeaveCreditListComponent } from './leave-credit-list/leave-credit-list.component';
import { LeaveCreditCreateComponent } from './leave-credit-create/leave-credit-create.component';

@Component({
    selector: 'app-leave-credit',
    templateUrl: './leave-credit.component.html',
    styleUrls: ['./leave-credit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LeaveCreditComponent implements OnInit {
    dialogRef: any;
    @ViewChild(LeaveCreditListComponent) getLeaveCreditList: LeaveCreditListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addLeaveCredit() {
        this.dialogRef = this._matDialog.open(LeaveCreditCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getLeaveCreditList.getLeaveCreditList();
        });
    }
}
