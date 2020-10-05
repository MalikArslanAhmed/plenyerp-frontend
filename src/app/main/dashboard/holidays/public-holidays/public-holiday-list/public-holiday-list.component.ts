import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {PublicHolidayCreateComponent} from '../public-holiday-create/public-holiday-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import { DeleteListModalComponent } from 'app/main/dashboard/delete-list-modal/delete-list-modal.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-public-holiday-list',
    templateUrl: './public-holiday-list.component.html',
    styleUrls: ['./public-holiday-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PublicHolidayListComponent implements OnInit {
    publicHolidayList = [];
    displayedPublicHolidayListColumns = ['id', 'name', 'actions'];
    dialogRef: any;    
    selectIndex = 0;
    @Output() selectedIndexChange: EventEmitter<number>;

    permissionEditPublicHoliday = [PermissionConstant.PUBLIC_HOLIDAYS_EDIT];
    permissionDeletePublicHoliday = [PermissionConstant.PUBLIC_HOLIDAYS_DELETE];

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getPublicHolidayList();
    }

    getPublicHolidayList() {
        this.contactInfoService.getPublicHolidayList({'page': -1}).subscribe(data => {
            this.publicHolidayList = data.items;

            if (this.publicHolidayList && this.publicHolidayList.length > 0) {
                let i = 1;
                this.publicHolidayList.forEach(val => {
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
                this.deletePublicHoliday(items.id);
            }
        });

    } 


    deletePublicHoliday(id) {
        this.contactInfoService.deletePublicHoliday(id).subscribe(data => {
            if (data) {
                this.getPublicHolidayList();
            }
        });
    }

    editPublicHoliday(publicHoliday) {
        this.dialogRef = this._matDialog.open(PublicHolidayCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', publicHoliday: publicHoliday},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getPublicHolidayList();
        });
    }

}
