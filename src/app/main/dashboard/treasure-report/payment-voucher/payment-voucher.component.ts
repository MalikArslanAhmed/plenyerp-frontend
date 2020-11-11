import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fuseAnimations} from "../../../../../@fuse/animations";
import {JournalVoucherLedgerReportService} from "../../../../shared/services/journal-voucher-ledger-report.service";
import {AlertService} from "../../../../shared/services/alert.service";
import * as moment from "moment";

@Component({
    selector: 'app-payment-voucher',
    templateUrl: './payment-voucher.component.html',
    styleUrls: ['./payment-voucher.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PaymentVoucherComponent implements OnInit {
    filterStatementOfPositionReportForm: FormGroup;
    paymentVoucherData = [
        {
            'year': '2018',
            'deptalNo': '1200003',
            'payeeName': 'Abhishek Mishra',
            'amount': '20,000',
            'taxes': '0',
            'paymentRef': '1241',
            'lastActioned': '31-Dec-2018',
            'status': 'Checked'
        },
        {
            'year': '2019',
            'deptalNo': '1200002',
            'payeeName': 'Ankit Mishra',
            'amount': '35,000',
            'taxes': '0',
            'paymentRef': '1214',
            'lastActioned': '31-Dec-2018',
            'status': 'Approved'
        }
    ];
    panelOpenState: boolean = false;

    constructor(private jvLedgerReportService: JournalVoucherLedgerReportService,
                private fb: FormBuilder,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.filterStatementOfPositionReportForm = this.fb.group({
            'from': ['', Validators.required],
            'to': ['', Validators.required]
        });
        // this.getStatementPositionData({});
    }

    /*getStatementPositionData(params) {
        this.jvLedgerReportService.getStatementPositionReport(params).subscribe(data => {
            this.paymentVoucherData = data.items;
            if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
                this.paymentVoucherData.forEach(d => {
                    d['isOpen'] = !this.panelOpenState;
                    this.getChildReportData(d);
                });
                this.panelOpenState = !this.panelOpenState;
            }
        });
    }*/

    getChildReportData(item) {
        const params = {};
        if (item && item.id) {
            params['parentId'] = item.id;
            this.jvLedgerReportService.getStatementPositionReport(params).subscribe(data => {
                item['childs'] = data.items;
            });
        }
    }

    filterStatementOfPosition() {
        if (this.filterStatementOfPositionReportForm.value.from === '' || this.filterStatementOfPositionReportForm.value.to === '') {
            if (this.filterStatementOfPositionReportForm.value.from === '') {
                this.alertService.showErrors("From date is required");
            } else if (this.filterStatementOfPositionReportForm.value.to === '') {
                this.alertService.showErrors("To date is required");
            }
        } else {
            const f = this.filterStatementOfPositionReportForm.value;
            const fromDate = moment(f.from).format('YYYY-MM-DD');
            const toDate = moment(f.to).format('YYYY-MM-DD');
            const params = {
                fromDate: fromDate,
                toDate: toDate
            };
            // this.getStatementPositionData(params);
        }
    }

    openAll() {
        /*if (this.paymentVoucherData && this.paymentVoucherData.length > 0) {
            this.paymentVoucherData.forEach(d => {
                d['isOpen'] = !this.panelOpenState;
                this.getChildReportData(d);
            });
            this.panelOpenState = !this.panelOpenState;
        }*/
    }
}
