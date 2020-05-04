import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {ArmOfServiceCreateComponent} from '../arm-of-service-create/arm-of-service-create.component';
import {ArmOfServiceService} from "../../../../shared/services/arm-of-service.service";
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-arm-of-service-list',
    templateUrl: './arm-of-service-list.component.html',
    styleUrls: ['./arm-of-service-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ArmOfServiceListComponent implements OnInit {
    armOfServices = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;

    constructor(private armOfServiceService: ArmOfServiceService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getArmOfServices();
    }

    getArmOfServices() {
        this.armOfServiceService.getArmOfServices({'page': -1}).subscribe(data => {
            this.armOfServices = data.items;

            if (this.armOfServices && this.armOfServices.length > 0) {
                let i = 1;
                this.armOfServices.forEach(armOfService => {
                    armOfService['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteArmOfService(id) {
        this.armOfServiceService.deleteArmOfService(id).subscribe(data => {
            if (data) {
                this.getArmOfServices();
            }
        })
    }

    editArmOfService(armOfService) {
        this.dialogRef = this._matDialog.open(ArmOfServiceCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', armOfService: armOfService},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getArmOfServices();
        });
    }
}
