import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {ArmOfServiceCreateComponent} from '../arm-of-service-create/arm-of-service-create.component';
import {ArmOfServiceService} from '../../../../shared/services/arm-of-service.service';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from '../../delete-list-modal/delete-list-modal.component';

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
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    constructor(private armOfServiceService: ArmOfServiceService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getArmOfServices();
    }

    getArmOfServices() {
        this.armOfServices = [];
        this.armOfServiceService.getArmOfServices({page: this.pagination.page}).subscribe(data => {
            this.armOfServices = data.items;

            if (this.armOfServices && this.armOfServices.length > 0) {
                let i = 1;
                this.armOfServices.forEach(armOfService => {
                    armOfService['sno'] = i;
                    i++;
                });
            }
            this.pagination.page = data.page;
            this.pagination.total = data.total;
        });
    }

    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteArmOfService(items.id);
            }
        });

    } 

    deleteArmOfService(id) {
        this.armOfServiceService.deleteArmOfService(id).subscribe(data => {
            if (data) {
                this.getArmOfServices();
            }
        });
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
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getArmOfServices();
    }
}
