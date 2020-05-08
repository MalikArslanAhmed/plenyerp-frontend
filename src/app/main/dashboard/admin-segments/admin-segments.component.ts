import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '../../../../@fuse/animations';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {AdminSegmentServices} from '../../../shared/services/admin-segment.services';

@Component({
    selector: 'admin-segments',
    templateUrl: './admin-segments.component.html',
    styleUrls: ['./admin-segments.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class AdminSegmentsComponent implements OnInit{
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    constructor(
        private _fuseSidebarService: FuseSidebarService, private adminSegmentServices: AdminSegmentServices
    ) {}

    ngOnInit(): void {
        console.log('segments');
        this.adminSegmentServices.getAllSegments().subscribe(data => {
            console.log(data);
        })
    }
}
