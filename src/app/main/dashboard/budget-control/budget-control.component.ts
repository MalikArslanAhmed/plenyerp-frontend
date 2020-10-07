import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../@fuse/animations';
import {AdminSegmentSelectComponent} from "../journal-voucher/admin-segment-select/admin-segment-select.component";
import {ProgrammingSegmentSelectComponent} from "../journal-voucher/programming-segment-select/programming-segment-select.component";
import {FundSegmentSelectComponent} from "../journal-voucher/fund-segment-select/fund-segment-select.component";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-budget-control',
    templateUrl: './budget-control.component.html',
    styleUrls: ['./budget-control.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BudgetControlComponent implements OnInit {
    dialogRef: any;
    departments = [];
    departmentAllIds = [];
    budgetControlForm: FormGroup;
    selectedRadioBudgetOption = 0;
    adminSegments = [];
    programmeSegments = [];
    fundSegments = [];
    budgetType: any;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(param => {
            this.budgetType = param['type']
        });
        this.budgetControlForm = this.fb.group({
            adminSegmentId: [''],
            fundSegmentId: [''],
            programmeSegmentId: [''],
            exchangeRateLocal: [''],
            exchangeRateInternational: [''],
            budgetCurrency: [''],
            budgetAmount: [''],
            pr_yr_budget_amount: [''],
            pr_yr_actual_amount: [''],
            month_1: [''],
            month_2: [''],
            month_3: [''],
            month_4: [''],
            month_5: [''],
            month_6: [''],
            month_7: [''],
            month_8: [''],
            month_9: [''],
            month_10: [''],
            month_11: [''],
            month_12: [''],
            totalSupplementaryBudget: [''],
            budgetAmountPrYr: [''],
        });
    }

    adminSegmentSelect() {
        this.dialogRef = this._matDialog.open(AdminSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.adminSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.budgetControlForm.patchValue({
                adminSegmentId: response.id,
                adminSegmentCode: response.id,
                disabled: true
            });
        });
    }

    programmeSegmentSelect() {
        this.dialogRef = this._matDialog.open(ProgrammingSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.programmeSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.budgetControlForm.patchValue({
                programmeSegmentId: response.id,
                programmeSegmentCode: response.id,
                disabled: true
            });
        });
    }

    fundSegmentSelect() {
        this.dialogRef = this._matDialog.open(FundSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.fundSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.budgetControlForm.patchValue({
                fundSegmentId: response.id,
                fundSegmentCode: response.id,
                disabled: true
            });
        });
    }

    findAllIds(data) {
        data.children.forEach(item => {
            if (item.children && item.children.length) {
                this.departmentAllIds.push(item.id);
                this.findAllIds(item);
            } else {
                this.departmentAllIds.push(item.id);
                return;
            }
        });
    }

    selectRadio(e) {
        this.selectedRadioBudgetOption = e.value;
    }

    budgetCurrencySelect() {
        console.log('abc');
    }
}