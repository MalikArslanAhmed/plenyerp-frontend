import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {CashbookService} from '../../../../../shared/services/cashbook.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {PaymentApprovalCreateComponent} from '../payment-approval-create/payment-approval-create.component';
import * as moment from 'moment';
import {PaymentApprovalService} from '../../../../../shared/services/payment-approval.service';
import {EmployeeService} from "../../../../../shared/services/employee.service";
import {SchedulePaymentApprovalEmployeeComponent} from "../schedule-payment-approval-employee/schedule-payment-approval-employee.component";
import {SchedulePaymentApprovalCustomerComponent} from "../schedule-payment-approval-customer/schedule-payment-approval-customer.component";
import {PermissionConstant} from '../../../../../shared/constants/permission-constant';

@Component({
    selector: 'app-payment-approval-list',
    templateUrl: './payment-approval-list.component.html',
    styleUrls: ['./payment-approval-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PaymentApprovalListComponent implements OnInit {

    permissionEditApproval = [PermissionConstant.SETTINGS_COMPANY_INFO_CHANGE_STATUS_AUTO_POSTED_JV];
    permissionCheckApproval = [PermissionConstant.SETTINGS_COMPANY_INFO_CHANGE_STATUS_AUTO_POSTED_JV];
    permissionApproval = [PermissionConstant.SETTINGS_COMPANY_INFO_CHANGE_STATUS_AUTO_POSTED_JV];
    permissionEditPayee = [PermissionConstant.SETTINGS_COMPANY_INFO_CHANGE_STATUS_AUTO_POSTED_JV];
    permissionDeletePayee = [PermissionConstant.SETTINGS_COMPANY_INFO_CHANGE_STATUS_AUTO_POSTED_JV];

    paymentApprovalList = [];
    dialogRef: any;
    selectIndex = 0;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    @Output() selectedIndexChange: EventEmitter<number>;
    statuses = [
        {
            'name': 'New',
            'value': 'NEW',
        },
        {
            'name': 'Checked',
            'value': 'CHECKED',
        },
        {
            'name': 'Approved and Ready',
            'value': 'APPROVED_AND_READY',
        },
        {
            'name': 'Ready for PV (Part Used)',
            'value': 'READY_FOR_PV',
        },
        {
            'name': 'Full Used',
            'value': 'FULLY_USED',
        }
    ];
    status = 'ALL';
    selectedStatus = [];

    constructor(private cashbookService: CashbookService,
                private router: Router,
                private _matDialog: MatDialog,
                private paymentApprovalService: PaymentApprovalService,
                private employeesService: EmployeeService) {
    }

    ngOnInit(): void {
        this.getPaymentApprovalList();
    }

    getPaymentApprovalList(data?) {
        let params = {
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

        this.paymentApprovalList = [];
        this.paymentApprovalService.list(params).subscribe(data => {
            this.paymentApprovalList = data.items;
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            /*if (this.paymentApprovalList && this.paymentApprovalList.length > 0) {
                let i = 1;
                this.paymentApprovalList.forEach(val => {
                    let totalAmount = [];
                    let totalTax = [];
                    if (val && val['paymentApprovalPayees'] && val['paymentApprovalPayees'].length > 0) {
                        val['paymentApprovalPayees'].forEach(pv => {
                            if (pv && pv['netAmount'] && pv['totalTax']) {
                                totalAmount.push(parseFloat(pv['netAmount']));
                                totalTax.push(parseFloat(pv['totalTax']));
                            }
                        });
                    }
                    val['totalAmount'] = totalAmount.reduce((a, b) => a + b, 0);
                    val['totalTax'] = totalTax.reduce((a, b) => a + b, 0);
                    val['valueDate'] = moment(val['valueDate']).format('YYYY-MM-DD');
                    val['sno'] = i;
                    i++;
                });
            }*/
        });
    }

    checkPV(index, event) {
        this.paymentApprovalList[index].checked = event.checked;
    }

    editModal(report) {
        this.dialogRef = this._matDialog.open(PaymentApprovalCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', report: report},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getPaymentApprovalList();
        });
    }

    updateStatus(status: string) {
        const paymentApprovalIds = [];
        if (this.paymentApprovalList && this.paymentApprovalList.length > 0) {
            this.paymentApprovalList.forEach(item => {
                if (item.checked === true) {
                    paymentApprovalIds.push(item.id);
                }
            });
            const params = {
                status: status,
                paymentApprovalIds: paymentApprovalIds ? JSON.stringify(paymentApprovalIds) : ''
            };
            this.paymentApprovalService.updatePaymentApprovalStatus(params).subscribe(data => {
                this.getPaymentApprovalList({});
            });
        }
    }

    scheduleEmployee(data) {
        this.dialogRef = this._matDialog.open(SchedulePaymentApprovalEmployeeComponent, {
            panelClass: 'contact-form-dialog',
            data: {pv: data}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getChildReportData(data);
        });
    }

    scheduleCustomers(data) {
        this.dialogRef = this._matDialog.open(SchedulePaymentApprovalCustomerComponent, {
            panelClass: 'contact-form-dialog',
            data: {pv: data}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            // console.log('response', response);
            this.getChildReportData(data);
        });
    }

    getChildReportData(item) {
        const params = {};
        if (item && item.id) {
            params['parentId'] = item.id;
            this.paymentApprovalService.getSchedulePayee(item.id, {page: -1}).subscribe(data => {
                item['payees'] = data.items;
            });
        }
    }

    editPaymentApproval(report) {
        this.dialogRef = this._matDialog.open(PaymentApprovalCreateComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', report: report},
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getPaymentApprovalList({});
        });
    }

    deletePaymentApproval(data) {
        this.paymentApprovalService.delete(data.id).subscribe(data => {
            this.getPaymentApprovalList({});
        });
    }

    editSchedulePayeeEmployee(data, report) {
        this.dialogRef = this._matDialog.open(SchedulePaymentApprovalEmployeeComponent, {
            panelClass: 'contact-form-dialog',
            data: {'action': 'EDIT', 'pv': data, 'report': report}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getPaymentApprovalList({});
        });
    }

    deleteSchedulePayeeEmployee(report, data) {
        this.paymentApprovalService.deleteSchedulePayee(report.id, data.id).subscribe(data => {
            this.getPaymentApprovalList({});
        });
    }

    editSchedulePayeeCustomer(data, report) {
        this.dialogRef = this._matDialog.open(SchedulePaymentApprovalCustomerComponent, {
            panelClass: 'contact-form-dialog',
            data: {'action': 'EDIT', 'pv': data, 'report': report}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this.getPaymentApprovalList({});
        });
    }

    deleteSchedulePayeeCustomer(report, data) {
        this.paymentApprovalService.deleteScheduleCustomer(report.id, data.id).subscribe(data => {
            this.getPaymentApprovalList({});
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getPaymentApprovalList();
    }
}
