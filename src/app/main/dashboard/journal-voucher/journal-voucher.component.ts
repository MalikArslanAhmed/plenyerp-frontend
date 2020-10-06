import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../../@fuse/animations";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FuseSidebarService} from "../../../../@fuse/components/sidebar/sidebar.service";
import {MatDialog} from "@angular/material/dialog";
import {JournalVoucherCreateComponent} from "./journal-voucher-create/journal-voucher-create.component";
import {JournalVoucherListComponent} from "./journal-voucher-list/journal-voucher-list.component";
import * as moment from 'moment';
import {PermissionConstant} from 'app/shared/constants/permission-constant';

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
    filterJournalVoucherForm: FormGroup;
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

    permissionAddJV = [PermissionConstant.ADD_GL_JV];

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.filterJournalVoucherForm = this.fb.group({
            'sourceApp': [''],
            'from': [''],
            'to': [''],
            'status': ['']
        });

        this.searchJournalVoucherForm = this.fb.group({
            'jvReference': [''],
        });
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

    filter() {
        const params = {
            'sourceApp': this.filterJournalVoucherForm.value.sourceApp ? this.filterJournalVoucherForm.value.sourceApp : '',
            'from': this.filterJournalVoucherForm.value.from ? moment(this.filterJournalVoucherForm.value.from).format('YYYY-MM-DD') : '',
            'to': this.filterJournalVoucherForm.value.to ? moment(this.filterJournalVoucherForm.value.to).format('YYYY-MM-DD') : '',
            'status': this.filterJournalVoucherForm.value.status ? this.filterJournalVoucherForm.value.status : '',
        };

        if (params && params['status'] === 'ALL') {
            params['status'] = ''
        }

        this.getJournalVoucherData.getJournalVoucherList(params);
        // console.log('searchJournalVoucherForm', params);
    }

    search() {
        this.getJournalVoucherData.getJournalVoucherList(this.searchJournalVoucherForm.value);
        // console.log('searchJournalVoucherForm', this.searchJournalVoucherForm.value);
    }
}
