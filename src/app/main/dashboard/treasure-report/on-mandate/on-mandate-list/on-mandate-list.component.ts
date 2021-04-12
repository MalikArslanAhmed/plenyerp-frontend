import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {CashbookService} from '../../../../../shared/services/cashbook.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {MandateService} from '../../../../../shared/services/mandate.service';
import {OnMandateCreateComponent} from '../on-mandate-create/on-mandate-create.component';
import * as moment from 'moment';
import {PermissionConstant} from '../../../../../shared/constants/permission-constant';
import {DeleteListModalComponent} from '../../../delete-list-modal/delete-list-modal.component';

@Component({
    selector: 'app-on-mandate-list',
    templateUrl: './on-mandate-list.component.html',
    styleUrls: ['./on-mandate-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OnMandateListComponent implements OnInit {
    onMandateList = [];
    dialogRef: any;
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };

    permissionUpdateMandate = [PermissionConstant.MANDATE_EDIT];
    permissionChangeStatusMandate = [PermissionConstant.MANDATE_CHANGE_STATUS];
    permissionDeleteMandate = [PermissionConstant.MANDATE_DELETE];
    pageEvent: PageEvent;
    @Output() selectedIndexChange: EventEmitter<number>;
    statuses = [
        {
            name: 'New',
            value: 'NEW',
        },
        {
            name: 'Ist Authorised',
            value: '1ST_AUTHORISED',
        },
        {
            name: 'IInd Authorised',
            value: '2ND_AUTHORISED',
        },
        {
            name: 'Posted to GL',
            value: 'POSTED_TO_GL',
        }
    ];
    status = 'ALL';
    selectedStatus = [];

    constructor(private cashbookService: CashbookService,
                private router: Router,
                private _matDialog: MatDialog,
                private mandateService: MandateService) {
    }

    ngOnInit(): void {
        this.getMadateList();
    }

    getMadateList(data?) {
        const params = {
            page: this.pagination.page
        };

        if (data) {
            params['status'] = data['status'];
            params['search'] = data['search'];
            this.status = data['status'] === '' ? 'ALL' : data['status'];
            if (this.statuses && this.statuses.length > 0) {
                let i = 0;
                this.statuses.forEach(stat => {
                    if (stat.value === params['status']) {
                        if (this.statuses[i + 1]) {
                            this.selectedStatus = [this.statuses[i + 1]];
                        }
                    }
                    i++;
                });
            }
        }

        this.onMandateList = [];
        this.mandateService.list(params).subscribe(data => {
            this.onMandateList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.onMandateList && this.onMandateList.length > 0) {
                let i = 1;
                this.onMandateList.forEach(val => {
                    const totalAmount = [];
                    const totalTax = [];
                    if (val && val['paymentVouchers'] && val['paymentVouchers'].length > 0) {
                        val['paymentVouchers'].forEach(pv => {
                            if (pv && pv['payeeVouchers'] && pv['payeeVouchers'].length > 0) {
                                pv['payeeVouchers'].forEach(payee => {
                                    if (payee && payee['netAmount']) {
                                        totalAmount.push(parseFloat(payee['netAmount']));
                                    } else {
                                        totalAmount.push(0);
                                    }

                                    if (payee && payee['totalTax']) {
                                        totalTax.push(parseFloat(payee['totalTax']));
                                    } else {
                                        totalTax.push(0);
                                    }
                                });
                            }
                        });
                    }
                    val['totalAmount'] = totalAmount.reduce((a, b) => a + b, 0);
                    val['totalTax'] = totalTax.reduce((a, b) => a + b, 0);
                    val['valueDate'] = moment(val['valueDate']).format('YYYY-MM-DD');
                    val['sno'] = i;
                    i++;
                });
            }
        });
    }

    checkPV(index, event) {
        this.onMandateList[index].checked = event.checked;
    }

    editModal(report) {
        this.dialogRef = this._matDialog.open(OnMandateCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', report: report},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getMadateList();
        });
    }

    updateStatus(status: string) {
        const mandateIds = [];
        if (this.onMandateList && this.onMandateList.length > 0) {
            this.onMandateList.forEach(item => {
                if (item.checked === true) {
                    mandateIds.push(item.id);
                }
            });
            const params = {
                status: status,
                mandateIds: mandateIds ? JSON.stringify(mandateIds) : ''
            };
            this.mandateService.updateMandateStatus(params).subscribe(data => {
                console.log(data);
            });
        }
    }

    askForDelete(data): void {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: data}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteMandate(data);
            }
        });
    }

    deleteMandate(mandateId) {
        this.mandateService.delete(mandateId).subscribe(data => {
            if (data) {
                this.getMadateList();
            }
        });
    }

    downloadPDF(data, type) {
        if (type === 'MANDATE') {
            this.mandateService.downloadPDF(data.id).subscribe(data => {
                window.open(data.url, '_blank');
            });
        } else if (type === 'MANDATE_CBN') {
            this.mandateService.downloadPDFCBN(data.id).subscribe(data => {
                window.open(data.url, '_blank');
            });
        }
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getMadateList();
    }
}
