import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {RelationshipService} from "../../../../shared/services/relationship.service";
import {RelationshipCreateComponent} from '../relationship-create/relationship-create.component';

@Component({
    selector: 'app-relationship-list',
    templateUrl: './relationship-list.component.html',
    styleUrls: ['./relationship-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RelationshipListComponent implements OnInit {
    relationships = [];
    displayedColumns = ['id', 'name', 'actions'];
    dialogRef: any;

    constructor(private relationshipService: RelationshipService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getRelationships();
    }

    getRelationships() {
        this.relationshipService.getRelationship({'page': -1}).subscribe(data => {
            this.relationships = data.items;

            if (this.relationships && this.relationships.length > 0) {
                let i = 1;
                this.relationships.forEach(realtionship => {
                    realtionship['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteRelationship(id) {
        this.relationshipService.deleteRelationship(id).subscribe(data => {
            if (data) {
                this.getRelationships();
            }
        })
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
}
