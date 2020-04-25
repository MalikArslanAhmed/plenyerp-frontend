import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {MembershipListComponent} from './membership-list/membership-list.component';
import {MembershipCreateComponent} from "./membership-create/membership-create.component";

@Component({
    selector: 'app-membership',
    templateUrl: './membership.component.html',
    styleUrls: ['./membership.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MembershipComponent implements OnInit {
    dialogRef: any;
    @ViewChild(MembershipListComponent) getMemberData: MembershipListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addMemberships() {
        this.dialogRef = this._matDialog.open(MembershipCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getMemberData.getMemberships();
        });
    }
}
