import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {JournalVoucherService} from '../../../../shared/services/journal-voucher.service';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {JournalVoucherDetailCreateComponent} from '../journal-voucher-detail-create/journal-voucher-detail-create.component';
import {JournalVoucherUpdateComponent} from '../journal-voucher-update/journal-voucher-update.component';
import {PermissionConstant} from 'app/shared/constants/permission-constant';
import {AlertService} from '../../../../shared/services/alert.service';
import {DeleteListModalComponent} from '../../delete-list-modal/delete-list-modal.component';

@Component({
    selector: 'app-journal-voucher-list',
    templateUrl: './journal-voucher-list.component.html',
    styleUrls: ['./journal-voucher-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class JournalVoucherListComponent implements OnInit {
    journalVouchers = [];
    dialogRef: any;
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    status: any;
    permissionEditJV = [PermissionConstant.EDIT_GL_JV];
    permissionDeleteJV = [PermissionConstant.DELETE_GL_JV];
    permissionAddJVDetails = [PermissionConstant.JV_DETAILS_ADD];
    permissionEditJVDetails = [PermissionConstant.JV_DETAILS_EDIT];
    permissionDeleteJVDetails = [PermissionConstant.JV_DETAILS_DELETE];

    constructor(private journalVoucherService: JournalVoucherService,
                private _matDialog: MatDialog,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.getJournalVoucherList();
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getJournalVoucherList();
    }

    getJournalVoucherList(params?): void {
        if (params) {
            this.status = params['status'];
        }
        let param = {
            page: this.pagination.page
        };
        if (params) {
            param = {
                ...params
            };
        }
        this.journalVouchers = [];
        this.journalVoucherService.get(param).subscribe(data => {
            this.journalVouchers = data.items;
            if (this.journalVouchers && this.journalVouchers.length > 0) {
                let i = 1;
                this.journalVouchers.forEach(journalVoucher => {
                    journalVoucher['sno'] = i;
                    i++;
                });
            }
            this.pagination.page = data.page;
            this.pagination.total = data.total;
        });
    }

    editJournalVoucher(journalVoucher) {
        this.dialogRef = this._matDialog.open(JournalVoucherUpdateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', journalVoucher: journalVoucher},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getJournalVoucherList();
        });
    }

    editJvDetail(journalVoucher, voucher) {
        this.dialogRef = this._matDialog.open(JournalVoucherDetailCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', jvDetail: voucher, journalVoucherId: journalVoucher.id},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getJournalVoucherList();
        });
    }

    createJvDetail(journalVoucher) {
        this.dialogRef = this._matDialog.open(JournalVoucherDetailCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'CREATE', journalVoucherId: journalVoucher.id},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getJournalVoucherList();
        });
    }

    checkJV(index, event) {
        if (this.status === 'NEW') {
            this.journalVouchers[index].checked = event.checked;
        } else if (this.status === 'CHECKED') {
            this.journalVouchers[index].posted = event.checked;
        }
    }

    askForConfirmation(data, type): void {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: data}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                if (type === 'checked') {
                    this.markAsChecked();
                } else if (type === 'posted') {
                    this.markAsPosted();
                } else if (type === 'new') {
                    this.markAsNew();
                }
            }
        });
    }

    markAsChecked(): void {
        const jvReferenceNumbers = [];
        let i = 0;
        let postAllow = true;
        if (this.journalVouchers && this.journalVouchers.length > 0) {
            this.journalVouchers.forEach(journalVoucher => {
                if (journalVoucher.checked) {
                    let creditValTotal = 0;
                    let debitValTotal = 0;
                    if (journalVoucher && journalVoucher['journalVoucherDetails'] && journalVoucher['journalVoucherDetails'].length > 0) {
                        journalVoucher['journalVoucherDetails'].forEach(journalVoucher => {
                            if (journalVoucher && journalVoucher['lineValueType'] === 'CREDIT') {
                                creditValTotal += journalVoucher.lvLineValue;
                            }
                        });
                        journalVoucher['journalVoucherDetails'].forEach(journalVoucher => {
                            if (journalVoucher && journalVoucher['lineValueType'] === 'DEBIT') {
                                debitValTotal += journalVoucher.lvLineValue;
                            }
                        });
                    }
                    if (creditValTotal !== debitValTotal) {
                        this.alertService.showErrors('Debit and Credit items are not balanced in ' + journalVoucher.jvReference);
                        postAllow = false;
                        return;
                    } else {
                        i++;
                        jvReferenceNumbers.push(journalVoucher.id);
                    }
                }
            });
        }

        if (postAllow) {
            if (i > 0) {
                this.journalVoucherService.journalVouchersUpdate({
                    jvReferenceNumbers: jvReferenceNumbers,
                    status: 'CHECKED'
                }).subscribe(data => {
                    console.log('data', data);
                });
            } else {
                this.alertService.showErrors('Please choose voucher to Mark as checked');
            }
        }
    }

    markAsPosted(): void {
        const jvReferenceNumbers = [];
        let i = 0;
        if (this.journalVouchers && this.journalVouchers.length > 0) {
            this.journalVouchers.forEach(journalVoucher => {
                if (journalVoucher.posted) {
                    i++;
                    jvReferenceNumbers.push(journalVoucher.id);
                }
            });
        }

        if (i > 0) {
            this.journalVoucherService.journalVouchersUpdate({
                jvReferenceNumbers: jvReferenceNumbers,
                status: 'POSTED'
            }).subscribe(data => {
                console.log('data', data);
            });
        } else {
            this.alertService.showErrors('Please choose voucher to Post JV');
        }
    }

    markAsNew(): void {
        const jvReferenceNumbers = [];
        let i = 0;
        if (this.journalVouchers && this.journalVouchers.length > 0) {
            this.journalVouchers.forEach(journalVoucher => {
                if (journalVoucher.posted) {
                    i++;
                    jvReferenceNumbers.push(journalVoucher.id);
                }
            });
        }

        if (i > 0) {
            this.journalVoucherService.journalVouchersUpdate({
                jvReferenceNumbers: jvReferenceNumbers,
                status: 'RENEW'
            }).subscribe(data => {
                console.log('data', data);
            });
        } else {
            this.alertService.showErrors('Please choose voucher to Mark as New');
        }
    }

    askForDelete(data, type): void {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: data}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                if (type === 'journalVoucher') {
                    this.deleteJournalVoucher(data);
                } else if (type === 'journalVoucherDetail') {
                    this.deleteJournalVoucherDetail(data);
                }
            }
        });
    }

    deleteJournalVoucher(journalVoucher): void {
        this.journalVoucherService.deleteJv(journalVoucher.id).subscribe(
            data => {
                this.getJournalVoucherList({});
            }
        );
    }

    deleteJournalVoucherDetail(journalVoucher): void {
        this.journalVoucherService.deleteDetails(journalVoucher.journalVoucherId, journalVoucher.id).subscribe(
            data => {
                this.getJournalVoucherList({});
            }
        );
    }
}
