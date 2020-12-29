import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {JournalVoucherLedgerReportService} from 'app/shared/services/journal-voucher-ledger-report.service';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {AlertService} from '../../../../shared/services/alert.service';
import {AdminSegmentEmployeeSelectComponent} from '../default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component';
import {TreasureReportService} from "../../../../shared/services/treasure-report.service";

@Component({
    selector: 'app-advances-ledger-employee-report',
    templateUrl: './advances-ledger-employee-report.component.html',
    styleUrls: ['./advances-ledger-employee-report.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AdvancesLedgerEmployeeReportComponent implements OnInit {
    advanceLedgerEmployeeReport = [];
    dialogRef: any;
    advanceLedgerReportForm: FormGroup;
    selectedEmployee: any;
    payingOfficers = [];
    banks = [];

    constructor(private jvLedgerReportService: JournalVoucherLedgerReportService,
                private fb: FormBuilder,
                private alertService: AlertService,
                private _matDialog: MatDialog,
                private treasureReportService: TreasureReportService) {
    }

    ngOnInit(): void {
        this.advanceLedgerReportForm = this.fb.group({
            'employeeId': [{value: '', disabled: true}],
            'name': [{value: '', disabled: true}],
            'staffId': [{value: '', disabled: true}],
            'department': [{value: '', disabled: true}],
        });
    }

    selectAdminEmployee(type) {
        let allowType: any = 'BOTH';
        let node: any = undefined;
        if (type === 'Select Paying Employee') {
            allowType = 'BOTH';
        }

        this.dialogRef = this._matDialog.open(AdminSegmentEmployeeSelectComponent, {
            panelClass: 'transaction-items-form-dialog',
            data: {head: type, allow: allowType, node: node}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            if (type === 'Select Payee Employee') {
                this.selectedEmployee = [{
                    'name': response['empData'].firstName + ' ' + response['empData'].lastName,
                    'id': response['empData'].id
                }];
                this.advanceLedgerReportForm.patchValue({
                    employeeId: response['empData'].id,
                    staffId: response['empData'].id,
                    name: response['empData'].firstName + ' ' + response['empData'].lastName,
                    department: response['empData'].employeeJobProfiles.department.name,
                });
            }
        });
    }

    submitReport() {
        this.treasureReportService.advancesLedgerEmployee({employeeId: this.advanceLedgerReportForm.value.employeeId}).subscribe(data => {
            this.advanceLedgerEmployeeReport = data;
        });
    }
}
