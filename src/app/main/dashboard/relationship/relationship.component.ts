import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import { RelationshipListComponent } from './relationship-list/relationship-list.component';
import {RelationshipCreateComponent} from "./relationship-create/relationship-create.component";
import { PermissionConstant } from 'app/shared/constants/permission-constant';

@Component({
    selector: 'app-relationship',
    templateUrl: './relationship.component.html',
    styleUrls: ['./relationship.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RelationshipComponent implements OnInit {
    dialogRef: any;
    @ViewChild(RelationshipListComponent) getRelationship: RelationshipListComponent;

    permissionAddRelationship = [PermissionConstant.RELATIONS_ADD];
    
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addRelationship() {
        this.dialogRef = this._matDialog.open(RelationshipCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getRelationship.getRelationships();
        });
    }
}
