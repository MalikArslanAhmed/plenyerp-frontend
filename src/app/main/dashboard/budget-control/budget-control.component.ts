import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../@fuse/animations';
import {DepartmentListSelectComponent} from '../structure/department-list/department-list-select.component';
import {SegmentCodeListComponent} from './segment-code-list/segment-code-list.component';

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
    filters = {};
    selectedRadioBudgetOption = 0;
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private fb: FormBuilder,
        private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.budgetControlForm = this.fb.group({
            // departmentId: [''],
            adminSegmentId: [''],
            fundSegmentId: [''],
            programmeCodeId: [''],
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
            budgetAmountPrYr1: [''],
            budgetAmountPrYr2: [''],

        });

    }

    adminUnitListSelect() {
        this.dialogRef = this._matDialog.open(SegmentCodeListComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.departmentAllIds = [];
            this.departmentAllIds.push(response.id);
            this.findAllIds(response);

            this.departments = [{
                name: response.name,
                id: response.id
            }];


            this.budgetControlForm.patchValue({
                departmentId: response.id,
                disabled: true
            });

            this.filters['departmentIds'] = JSON.stringify(this.departmentAllIds);

            // this.getEmployees(this.filters);
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

    budgetCurrencySelect() {

    }

    selectRadio(e) {
        // console.log('---->>', e);
        this.selectedRadioBudgetOption = e.value;
    }
}
