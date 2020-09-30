import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {MembershipCreateComponent} from '../membership-create/membership-create.component';
import {MembershipService} from '../../../../shared/services/membership.service';
import {PageEvent} from '@angular/material/paginator';
import {DeleteListModalComponent} from '../../delete-list-modal/delete-list-modal.component';

@Component({
    selector: 'app-membership-list',
    templateUrl: './membership-list.component.html',
    styleUrls: ['./membership-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MembershipListComponent implements OnInit {
    memberships = [];
    displayedColumns = ['id', 'name', 'status', 'actions'];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;

    constructor(private membershipService: MembershipService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getMemberships();
    }

    getMemberships() {
        this.memberships = [];
        this.membershipService.getMemberships({page: this.pagination.page}).subscribe(data => {
            this.memberships = data.items;

            if (this.memberships && this.memberships.length > 0) {
                let i = 1;
                this.memberships.forEach(membership => {
                    membership['sno'] = i;
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
                this.deleteMembership(items.id);
            }
        });

    }


    deleteMembership(id) {
        this.membershipService.deleteMembership(id).subscribe(data => {
            if (data) {
                this.getMemberships();
            }
        });
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

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getMemberships();
    }
}
