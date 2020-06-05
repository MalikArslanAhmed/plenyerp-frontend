import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {RegionCreateComponent} from '../region-create/region-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
    selector: 'app-region-list',
    templateUrl: './region-list.component.html',
    styleUrls: ['./region-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegionListComponent implements OnInit {
    regionList = [];
    displayedRegionColumns = ['id', 'country', 'name', 'status', 'actions'];
    dialogRef: any;    
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getRegionList();
    }

    getRegionList() {
        this.regionList = [];
        this.contactInfoService.getRegionList({page: this.pagination.page}).subscribe(data => {
            this.regionList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.regionList && this.regionList.length > 0) {
                let i = 1;
                this.regionList.forEach(val => {
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }


    deleteRegion(id) {
        this.contactInfoService.deleteRegion(id).subscribe(data => {
            if (data) {
                this.getRegionList();
            }
        });
    }

    editRegion(region) {
        this.dialogRef = this._matDialog.open(RegionCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', region: region},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getRegionList();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getRegionList();
    }
}
