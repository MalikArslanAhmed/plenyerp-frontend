import {Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {RegionCreateComponent} from '../region-create/region-create.component';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../../shared/services/contact-info.service';

@Component({
    selector: 'app-region-list',
    templateUrl: './region-list.component.html',
    styleUrls: ['./region-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegionListComponent implements OnInit {
    regionList = [];
    displayedRegionColumns = ['id', 'country', 'name', 'actions'];
    dialogRef: any;    
    selectIndex = 0;
    @Output() selectedIndexChange: EventEmitter<number>;

    constructor(private contactInfoService: ContactInfoService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getRegionList();
    }

    getRegionList() {
        this.contactInfoService.getRegionList({'page': -1}).subscribe(data => {
            this.regionList = data.items;

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

}
