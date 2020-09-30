import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {JournalVoucherCreateComponent} from "./journal-voucher-create/journal-voucher-create.component";
import {JournalVoucherListComponent} from "./journal-voucher-list/journal-voucher-list.component";
import * as moment from 'moment';

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
    searchJournalVoucherForm: FormGroup;
    sourceApp = [
        {
            'value': 'GENERAL_LEDGER',
            'name': 'General Ledger'
        }
    ];
    types = [
        {
            'value': 'ALL',
            'name': 'All'
        },
        {
            'value': 'NEW',
            'name': 'New'
        },
        {
            'value': 'CHECKED',
            'name': 'Checked'
        },
        {
            'value': 'POSTED',
            'name': 'Posted'
        },
    ];

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.searchJournalVoucherForm = this.fb.group({
            'sourceApp': [''],
            'from': [''],
            'to': [''],
            'status': ['']
        })
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

    search() {
        const params = {
            'sourceApp': this.searchJournalVoucherForm.value.sourceApp ? this.searchJournalVoucherForm.value.sourceApp : '',
            'from': this.searchJournalVoucherForm.value.from ? moment(this.searchJournalVoucherForm.value.from).format('YYYY-MM-DD') : '',
            'to': this.searchJournalVoucherForm.value.to ? moment(this.searchJournalVoucherForm.value.to).format('YYYY-MM-DD') : '',
            'status': this.searchJournalVoucherForm.value.status ? this.searchJournalVoucherForm.value.status : '',
        };
        this.getJournalVoucherData.getJournalVoucherList(params);
        console.log('searchJournalVoucherForm', params);
    }
}
