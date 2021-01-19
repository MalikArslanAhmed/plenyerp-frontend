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

@Component({
    selector: 'app-payment-approval-list',
    templateUrl: './payment-approval-list.component.html',
    styleUrls: ['./payment-approval-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PaymentApprovalListComponent implements OnInit {
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
            'name': 'Ready for PV',
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
            console.log('data', data);
            this.paymentApprovalList = data.items;
            // console.log('--->>payment Approval', data.items);
            this.pagination.page = data.page;
            this.pagination.total = data.total;
            if (this.paymentApprovalList && this.paymentApprovalList.length > 0) {
                let i = 1;
                this.paymentApprovalList.forEach(val => {
                    val['valueDate'] = moment(val['valueDate']).format('YYYY-MM-DD');
                    /*let totalAmount = [];
                    let totalTax = [];
                    if (val && val['paymentVouchers'] && val['paymentVouchers'].length > 0) {
                        val['paymentVouchers'].forEach(pv => {
                            if (pv && pv['payeeVouchers'] && pv['payeeVouchers'].length > 0) {
                                pv['payeeVouchers'].forEach(payee => {
                                    if (payee && payee['netAmount'] && payee['totalTax']) {
                                        totalAmount.push(parseFloat(payee['netAmount']));
                                        totalTax.push(parseFloat(payee['totalTax']));
                                    }
                                });
                            }
                        });
                    }
                    val['totalAmount'] = totalAmount.reduce((a, b) => a + b, 0);
                    val['totalTax'] = totalTax.reduce((a, b) => a + b, 0);
                    val['valueDate'] = moment(val['valueDate']).format('YYYY-MM-DD');
                    val['sno'] = i;*/
                    i++;
                });
            }
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
        const mandateIds = [];
        if (this.paymentApprovalList && this.paymentApprovalList.length > 0) {
            this.paymentApprovalList.forEach(item => {
                if (item.checked === true) {
                    mandateIds.push(item.id);
                }
            });
            const params = {
                status: status,
                mandateIds: mandateIds ? JSON.stringify(mandateIds) : ''
            };
            this.paymentApprovalService.updateMandateStatus(params).subscribe(data => {
                console.log(data);
            });
        }
    }

    // deleteMandate(mandateId) {
    //     this.paymentApprovalService.delete(mandateId).subscribe(data => {
    //         if (data) {
    //             this.getPaymentApprovalList();
    //         }
    //     });
    // }

    /*getEmployees(): void {
        this.employees = [];
        this.employeesService.getEmployees({page: this.pagination.page}).subscribe(data => {
            this.employees = data.items;

            if (this.employees && this.employees.length > 0) {
                let i = 1;
                this.employees.forEach(category => {
                    category['sno'] = i;
                    i++;
                });
            }
            this.pagination.page = data.page;
            this.pagination.total = data.total;
        });
    }*/

    scheduleEmployee(data) {
        console.log('data', data);
        this.dialogRef = this._matDialog.open(SchedulePaymentApprovalEmployeeComponent, {
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

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getPaymentApprovalList();
    }
}
