import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {FormGroup} from "@angular/forms";
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {JournalVoucherCreateComponent} from "./journal-voucher-create/journal-voucher-create.component";
import {JournalVoucherListComponent} from "./journal-voucher-list/journal-voucher-list.component";

@Component({
    selector: 'app-journal-voucher',
    templateUrl: './journal-voucher.component.html',
    styleUrls: ['./journal-voucher.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class JournalVoucherComponent implements OnInit {
    dialogRef: any;
    @ViewChild(JournalVoucherListComponent) getJournalVoucherData: JournalVoucherListComponent;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    addJournalVoucher() {
        this.dialogRef = this._matDialog.open(JournalVoucherCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE'}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getJournalVoucherData.getJournalVoucherList();
        });
    }
}
