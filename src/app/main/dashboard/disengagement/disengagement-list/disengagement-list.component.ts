import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {DisengagementsService} from "../../../../shared/services/disengagements.service";
import {DisengagementCreateComponent} from '../disengagement-create/disengagement-create.component';
import {fuseAnimations} from "../../../../../@fuse/animations";

@Component({
    selector: 'app-disengagement-list',
    templateUrl: './disengagement-list.component.html',
    styleUrls: ['./disengagement-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DisengagementListComponent implements OnInit {
    disengagements = [];
    displayedColumns = ['id', 'name', 'actions'];
    dialogRef: any;

    constructor(private disengagementService: DisengagementsService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getDisengagements();
    }

    getDisengagements() {
        this.disengagementService.getDisengagements({'page': -1}).subscribe(data => {
            this.disengagements = data.items;

            if (this.disengagements && this.disengagements.length > 0) {
                let i = 1;
                this.disengagements.forEach(disengagement => {
                    disengagement['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteDisengagement(id) {
        this.disengagementService.deleteDisengagement(id).subscribe(data => {
            if (data) {
                this.getDisengagements();
            }
        })
    }

    editDisengagement(disengagement) {
        this.dialogRef = this._matDialog.open(DisengagementCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', disengagement: disengagement},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getDisengagements();
        });
    }
}
