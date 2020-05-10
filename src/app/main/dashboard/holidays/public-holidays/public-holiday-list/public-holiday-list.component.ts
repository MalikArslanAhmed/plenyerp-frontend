import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {PublicHolidayCreateComponent} from '../public-holiday-create/public-holiday-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

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
