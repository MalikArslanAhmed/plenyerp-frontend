import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '../../../../shared/services/alert.service';
import {TreasureReportService} from '../../../../shared/services/treasure-report.service';
import * as moment from 'moment';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {ReceiptVoucherService} from '../../../../shared/services/receipt-voucher.service';
import {ScheduleEconomicCodesComponent} from '../payment-voucher/schedule-economic-codes/schedule-economic-codes.component';
import {EconomicSegmentSelectComponent} from '../../journal-voucher/economic-segment-select/economic-segment-select.component';
import {AdminSegmentSelectComponent} from '../../journal-voucher/admin-segment-select/admin-segment-select.component';
import {FundSegmentSelectComponent} from '../../journal-voucher/fund-segment-select/fund-segment-select.component';

@Component({
    selector: 'app-sources-uses-fund',
    templateUrl: './sources-uses-fund.component.html',
    styleUrls: ['./sources-uses-fund.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SourcesUsesFundComponent implements OnInit {
    filterSourceUsesDataForm: FormGroup;
    receiptVoucherData = [
        {
            item: 'abcd',
            section: '12332',
            forecast_semester: 'sdfs',
            current_semester: 'fdgh',
            cum_semester: 'sfdg',
        },
        {
            item: 'abcd',
            section: '12332',
            forecast_semester: 'sdfs',
            current_semester: 'fdgh',
            cum_semester: 'sfdg',
        }
    ];
    panelOpenState: boolean = false;
    sourceUnit = [];
    statuses = [];
    dialogRef: any;
    status = 'ALL';
    selectedStatus = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    reportTypes = [
        {
        name: 'Semester Wise',
        value: 'SEMESTER_WISE'
        },
        {
            name: 'Quarter Wise',
            value: 'QUARTER_WISE'
        }
    ];

    reports = [];
    semesterList = [
        {
            name: '1st Semester',
            value: '1st_Semester'
        },
        {
            name: '2nd Semester',
            value: '2nd Semester'
        }
    ];
    quarterList = [
        {
            name: '1st Quarter',
            value: '1st_Quarter'
        },
        {
            name: '2nd Quarter',
            value: '2nd Quarter'
        },
        {
            name: '3rd Quarter',
            value: '3rd Quarter'
        },
        {
            name: '4th Quarter',
            value: '4th Quarter'
        }
    ];
    fundSegmentsData;
    adminUnitData;
    economicCodeData;
    constructor(private fb: FormBuilder,
                private _matDialog: MatDialog,
                private alertService: AlertService,
                private receiptVoucherService: ReceiptVoucherService,
                private treasureReportService: TreasureReportService) {
    }

    ngOnInit(): void {
        this.refresh();
        // this.getReceiptVoucher({});
        // this.getVoucherSourceUnitList();
        // this.receiptVoucherStatus({});
    }

    refresh() {
        this.filterSourceUsesDataForm = this.fb.group({
            'radioType': ['PROGRAMME'],
            'adminUnit': [{value: '', disabled: true}],
            'report': [''],
            'type': ['']
        });
        this.filterSourceUsesDataForm.get('type').valueChanges.subscribe(val => {
            this.reports = [];
            this.filterSourceUsesDataForm.get('report').patchValue('');
            if (val === 'SEMESTER_WISE') {
                this.reports = this.semesterList;
            } else {
                this.reports = this.quarterList;
            }
        });

    }

    // getReceiptVoucher(params?) {
    //     let param = {
    //         ...params,
    //         page: this.pagination.page
    //     };
    //     this.receiptVoucherService.get(param).subscribe(data => {
    //         this.receiptVoucherData = data.items;
    //         if (this.receiptVoucherData && this.receiptVoucherData.length > 0) {
    //             this.receiptVoucherData.forEach(d => {
    //                 d['checked'] = false;
    //                 d['lastActioned'] = moment(d['updatedAt']).format('YYYY-MM-DD');
    //                 // this.getChildReportData(d);
    //             });
    //             this.panelOpenState = !this.panelOpenState;
    //         }
    //     });
    // }

    // getChildReportData(item) {
    //     const params = {};
    //     if (item && item.id) {
    //         params['parentId'] = item.id;
    //         this.receiptVoucherService.getSchedulePayee(item.id, {page: -1}).subscribe(data => {
    //             item['payees'] = data.items;
    //         });
    //     }
    // }
    //
    // scheduleEmployee(data) {
    //     this.dialogRef = this._matDialog.open(SchedulePayersEmployeeComponent, {
    //         panelClass: 'contact-form-dialog',
    //         data: {rv: data}
    //     });
    //     this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
    //         if (!response) {
    //             return;
    //         }
    //         this.getChildReportData(data);
    //     });
    // }
    //
    // scheduleCustomers(data) {
    //     this.dialogRef = this._matDialog.open(SchedulePayersCustomerComponent, {
    //         panelClass: 'contact-form-dialog',
    //         data: {rv: data}
    //     });
    //     this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
    //         if (!response) {
    //             return;
    //         }
    //         this.getChildReportData(data);
    //     });
    // }
    //
    // scheduleEconomicCodes(report, data) {
    //     this.dialogRef = this._matDialog.open(ScheduleEconomicCodesReceiptComponent, {
    //         panelClass: 'contact-form-dialog',
    //         data: {rv: data, report: report}
    //     });
    //     this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
    //         if (!response) {
    //             return;
    //         }
    //     });
    // }



    // addReceiptVoucher() {
    //     if (this.createReceiptVoucherForm.value['sourceUnit'] === '' || !this.createReceiptVoucherForm.value['sourceUnit']) {
    //         this.alertService.showErrors('Please Choose Voucher Source Unit');
    //         return;
    //     } else if (this.createReceiptVoucherForm.value['type'] === '' || !this.createReceiptVoucherForm.value['type']) {
    //         this.alertService.showErrors('Please Choose Receipt Voucher Type');
    //         return;
    //     }
    //
    //     if (this.types && this.types.length > 0 && this.sourceUnit && this.sourceUnit.length > 0) {
    //         let selectedType = '';
    //         this.types.forEach(type => {
    //             if (type.value === this.createReceiptVoucherForm.value['type']) {
    //                 selectedType = type.name;
    //             }
    //         });
    //
    //         let selectedSource = [];
    //         this.sourceUnit.forEach(source => {
    //             if (source.id === this.createReceiptVoucherForm.value['sourceUnit']) {
    //                 selectedSource.push({
    //                     'name': source.id + ' - ' + source.longName,
    //                     'value': source.id
    //                 });
    //             }
    //         });
    //
    //         this.dialogRef = this._matDialog.open(ReceiptVoucherCreateComponent, {
    //             panelClass: 'contact-form-dialog',
    //             data: {header: selectedType, source: selectedSource, type: this.createReceiptVoucherForm.value['type']}
    //         });
    //         this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
    //             if (!response) {
    //                 return;
    //             }
    //             this.getReceiptVoucher({});
    //         });
    //     }
    // }

    // getVoucherSourceUnitList() {
    //     this.sourceUnit = [];
    //     this.treasureReportService.list({page: -1}).subscribe(data => {
    //         this.sourceUnit = data.items;
    //     });
    // }
    //
    // checkPV(index, event) {
    //     this.receiptVoucherData[index].checked = event.checked;
    // }
    //
    // receiptVoucherStatus(status) {
    //     this.selectedStatus = [];
    //     if (this.statuses && this.statuses.length > 0) {
    //         this.statuses.forEach(val => {
    //             if (val.value === status) {
    //                 const sIndex = this.statuses.indexOf(val);
    //                 if (sIndex < this.statuses.length - 1) {
    //                     this.selectedStatus.push(this.statuses[sIndex + 1]);
    //                 } else {
    //                     this.selectedStatus = [];
    //                 }
    //             }
    //         });
    //     }
    //
    //     const params = {};
    //     if (status !== 'ALL') {
    //         params['status'] = status;
    //     }
    //     this.receiptVoucherService.getReceiptVoucherStatus(params).subscribe(data => {
    //         this.statuses = data.status;
    //     });
    // }
    //
    // updateStatus(status: string) {
    //     const receiptVoucherId = [];
    //     if (this.receiptVoucherData && this.receiptVoucherData.length) {
    //         this.receiptVoucherData.forEach(item => {
    //             if (item.checked === true) {
    //                 receiptVoucherId.push(item.id);
    //             }
    //         });
    //         const params = {
    //             status: status,
    //             receiptVoucherIds: receiptVoucherId
    //         };
    //         this.receiptVoucherService.getUpdateStatus(params).subscribe(data => {
    //             // console.log(data);
    //         });
    //     }
    // }
    //
    // tabClick(report, event) {
    //     if (event.tab['textLabel'] === 'Economic Codes') {
    //         this.getEconomicCodes(report);
    //     }
    // }

    // getEconomicCodes(report) {
    //     this.receiptVoucherService.getScheduleEconomic(report.id).subscribe(data => {
    //         report['economic'] = data.items;
    //     });
    // }

    // getTypeData(sourceUnitId) {
    //     if (sourceUnitId) {
    //         this.receiptVoucherService.typeData(sourceUnitId).subscribe(data => {
    //             this.reports = data.type;
    //         });
    //     }
    // }

    adminSegmentSelect() {
        this.dialogRef = this._matDialog.open(AdminSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                // console.log('bye');
                return;
            }
            this.adminUnitData = [{
                'name': response.name,
                'id': response.id
            }];
            this.filterSourceUsesDataForm.get('adminUnit').patchValue(response.id);
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        // this.getReceiptVoucher();
    }

    filterTable() {
        console.log('----->>>', this.filterSourceUsesDataForm.getRawValue());
    }
}