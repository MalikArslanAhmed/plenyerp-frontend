import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import { MembershipCreateComponent } from '../membership-create/membership-create.component';
import {MembershipService} from "../../../../shared/services/membership.service";

@Component({
    selector: 'app-membership-list',
    templateUrl: './membership-list.component.html',
    styleUrls: ['./membership-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MembershipListComponent implements OnInit {
    memberships = [];
    displayedColumns = ['id', 'name', 'actions'];
    dialogRef: any;

    constructor(private membershipService: MembershipService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getMemberships();
    }

    getMemberships() {
        this.membershipService.getMemberships({'page': -1}).subscribe(data => {
            this.memberships = data.items;

            if (this.memberships && this.memberships.length > 0) {
                let i = 1;
                this.memberships.forEach(membership => {
                    membership['sno'] = i;
                    i++;
                });
            }
        });
    }

    deleteMembership(id) {
        this.membershipService.deleteMembership(id).subscribe(data => {
            if (data) {
                this.getMemberships();
            }
        })
    }

    editMembership(membership) {
        this.dialogRef = this._matDialog.open(MembershipCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', membership: membership},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getMemberships();
        });
    }
}
