import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';

import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {fuseAnimations} from '../../../../@fuse/animations';
import {ArmOfServiceListComponent} from './arm-of-service-list/arm-of-service-list.component';
import {ArmOfServiceCreateComponent} from './arm-of-service-create/arm-of-service-create.component';

@Component({
    selector: 'app-arm-of-service',
    templateUrl: './arm-of-service.component.html',
    styleUrls: ['./arm-of-service.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ArmOfServiceComponent implements OnInit {
    dialogRef: any;
    @ViewChild(ArmOfServiceListComponent) getarmOfService: ArmOfServiceListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addArmOfService() {
        this.dialogRef = this._matDialog.open(ArmOfServiceCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getarmOfService.getArmOfServices();
        });
    }
}
