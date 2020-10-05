import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {RegionCreateComponent} from './region-create/region-create.component';
import {RegionListComponent} from './region-list/region-list.component';
import {fuseAnimations} from '../../../../../@fuse/animations';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-region',
    templateUrl: './region.component.html',
    styleUrls: ['./region.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegionComponent implements OnInit {
    dialogRef: any;
    @ViewChild(RegionListComponent) getRegionList: RegionListComponent;

    permissionAddRegion = [PermissionConstant.REGION_ADD]
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addRegion() {
        this.dialogRef = this._matDialog.open(RegionCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getRegionList.getRegionList();
        });
    }
}
