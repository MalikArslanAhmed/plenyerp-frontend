import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {fuseAnimations} from '../../../../../@fuse/animations';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {AdminSegmentServices} from '../../../../shared/services/admin-segment.services';
import {EditSegmentListComponent} from '../edit-segment-list/edit-segment-list';
import {FormGroup} from '@angular/forms';
import {AddLevelCharCount} from '../add-level-char-count/add-level-char-count';

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
        this. getAllSegmentsList();
    }

    getAllSegmentsList() {
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
                this.segments[index].maxLevel = formData.maxLevel;
            }
        });
    }
    addLevel(segmentData) {
        if (segmentData.levelConfig.length > 0) {
            this.dialogRef = this._matDialog.open(AddLevelCharCount, {
                panelClass: 'contact-form-dialog',
                data: {action: 'EDIT', levelConfig: segmentData.levelConfig, adminSegmentId: segmentData.id},
            });
            this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                this.getAllSegmentsList();
            });
        }
    }
}


