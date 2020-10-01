import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {PublicHolidayCreateComponent} from './public-holiday-create/public-holiday-create.component';
import {PublicHolidayListComponent} from './public-holiday-list/public-holiday-list.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-public-holidays',
    templateUrl: './public-holidays.component.html',
    styleUrls: ['./public-holidays.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PublicHolidaysComponent implements OnInit {
    dialogRef: any;
    @ViewChild(PublicHolidayListComponent) getPublicHolidayList: PublicHolidayListComponent;

    permissionAddPublicHoliday = [PermissionConstant.PUBLIC_HOLIDAYS_ADD]
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addPublicHoliday() {
        this.dialogRef = this._matDialog.open(PublicHolidayCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getPublicHolidayList.getPublicHolidayList();
        });
    }
}
