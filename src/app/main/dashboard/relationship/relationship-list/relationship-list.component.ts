import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {RelationshipService} from '../../../../shared/services/relationship.service';
import {RelationshipCreateComponent} from '../relationship-create/relationship-create.component';
import {PageEvent} from '@angular/material/paginator';
import { DeleteListModalComponent } from '../../delete-list-modal/delete-list-modal.component';
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-relationship-list',
    templateUrl: './relationship-list.component.html',
    styleUrls: ['./relationship-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RelationshipListComponent implements OnInit {
    relationships = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;

    permissionEditRelationship = [PermissionConstant.RELATIONS_EDIT];
    permissionDeleteRelationship = [PermissionConstant.RELATIONS_DELETE];


    constructor(private relationshipService: RelationshipService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getRelationships();
    }

    getRelationships() {
        this.relationships = [];
        this.relationshipService.getRelationship({page: this.pagination.page}).subscribe(data => {
            this.relationships = data.items;

            if (this.relationships && this.relationships.length > 0) {
                let i = 1;
                this.relationships.forEach(realtionship => {
                    realtionship['sno'] = i;
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
                this.deleteRelationship(items.id);
            }
        });

    } 

    deleteRelationship(id) {
        this.relationshipService.deleteRelationship(id).subscribe(data => {
            if (data) {
                this.getRelationships();
            }
        });
    }

    editRelationship(relationship) {
        this.dialogRef = this._matDialog.open(RelationshipCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', relationship: relationship},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getRelationships();
        });
    }
    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getRelationships();
    }
}
