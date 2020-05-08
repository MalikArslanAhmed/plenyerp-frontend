import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '../../../../../@fuse/animations';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {AdminSegmentServices} from '../../../../shared/services/admin-segment.services';

@Component({
    selector: 'segments-list',
    templateUrl: './segments-list.component.html',
    styleUrls: ['./segments-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class SegmentsListComponent implements OnInit{
    displayedColumns: string[] = ['id', 'name', 'characterCount', 'maxLevels', 'actions'];
    segments = [];

    constructor(
        private _fuseSidebarService: FuseSidebarService, private adminSegmentServices: AdminSegmentServices
    ) {}

    ngOnInit(): void {
        this.adminSegmentServices.getAllSegments().subscribe(data => {
            console.log(data, 'in segment list');
            this.segments = data.items;
        });
    }
}
