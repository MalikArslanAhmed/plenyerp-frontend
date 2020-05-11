import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {fuseAnimations} from '../../../../../@fuse/animations';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {AdminSegmentServices} from '../../../../shared/services/admin-segment.services';
import {EditSegmentListComponent} from '../edit-segment-list/edit-segment-list';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'segments-list',
    templateUrl: './segments-list.component.html',
    styleUrls: ['./segments-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class SegmentsListComponent implements OnInit{
    dialogRef: any;
    displayedColumns: string[] = ['id', 'name', 'characterCount', 'maxLevels', 'actions'];
    segments = [];

    constructor(
        private _fuseSidebarService: FuseSidebarService, private _matDialog: MatDialog, private adminSegmentServices: AdminSegmentServices
    ) {}

    ngOnInit(): void {
        this.adminSegmentServices.getAllSegments().subscribe(data => {
            this.segments = data.items;
        });
    }

    editSegmentList(segment){
        this.dialogRef = this._matDialog.open(EditSegmentListComponent, {
            panelClass: 'contact-form-dialog',
            data: {node: segment}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            const formData = response.getRawValue();
            const index = this.segments.findIndex(item => item.id === segment.id);
            if (index > -1) {
                this.segments[index].name = formData.name;
            }
        });
    }
}
