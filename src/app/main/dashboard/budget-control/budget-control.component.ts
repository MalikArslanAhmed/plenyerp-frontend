import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '../../../../@fuse/animations';
import {AdminSegmentSelectComponent} from '../journal-voucher/admin-segment-select/admin-segment-select.component';
import {ProgrammingSegmentSelectComponent} from '../journal-voucher/programming-segment-select/programming-segment-select.component';
import {FundSegmentSelectComponent} from '../journal-voucher/fund-segment-select/fund-segment-select.component';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import {BudgetControlService} from 'app/shared/services/budget-control.service';
import {DeleteListModalComponent} from '../delete-list-modal/delete-list-modal.component';
import {EconomicSegmentSelectComponent} from '../journal-voucher/economic-segment-select/economic-segment-select.component';
import {AlertService} from "../../../shared/services/alert.service";

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
    programSegments = [];
    economicSegments = [];
    fundSegments = [];
    budgetType: any;
    tempBudget = [];
    isDisabled = true;
    adminSegmentSelected = false;
    fundSegmentSelected = false;
    displayedColumns: string[] = ['sno', 'fullCode', 'lineCode', 'title', 'Pr_Yr_budget', 'Pr_Yr_actual', 'supplementary_budget', 'total_Budget', 'month_1', 'month_2', 'month_3', 'month_4', 'month_5', 'month_6', 'month_7', 'month_8', 'month_9', 'month_10', 'month_11', 'month_12'];
    budgetControlList = [];
    currencyList = [];
    budgetId;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private budgetService: BudgetControlService,
        private alertService: AlertService) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.activatedRoute.params.subscribe(param => {
                    this.budgetType = param['type'];
                    this.ngOnInit();
                    this.adminSegmentSelected = false;
                    this.fundSegmentSelected = false;
                    this.adminSegments = [];
                    this.fundSegments = [];
                    this.budgetControlList = [];
                });
            }
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(param => {
            this.budgetType = param['type'];
        });
        this.getCurrencyList();
        this.budgetControlForm = this.fb.group({
            adminSegmentId: [''],
            fundSegmentId: [''],
            programSegmentId: [''],
            economicSegmentId: [''],
            xRateLocal: [''],
            xRateToInternational: [''],
            currencyId: [''],
            budgetAmount: [''],
            previousYearAmount: [''],
            previousYearActualAmount: [''],
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
            cumulativePreviousYearAmount: [''],
            cumulativePreviousYearActualAmount: [''],
            supplementary_month_1: [''],
            supplementary_month_2: [''],
            supplementary_month_3: [''],
            supplementary_month_4: [''],
            supplementary_month_5: [''],
            supplementary_month_6: [''],
            supplementary_month_7: [''],
            supplementary_month_8: [''],
            supplementary_month_9: [''],
            supplementary_month_10: [''],
            supplementary_month_11: [''],
            supplementary_month_12: [''],
        });
    }

    focusOutFunction() {
        this.isDisabled = !this.budgetControlForm.valid;
    }

    getBudgetData() {
        this.budgetControlList = [];
        const params = {
            adminSegmentId: this.adminSegments[0].id,
            fundSegmentId: this.fundSegments[0].id
        };

        if (this.budgetType === 'economic') {
            this.budgetService.getBudgetControlForEconomic(params).subscribe(data => {
                this.budgetControlList = data.items;
            });
        }
        if (this.budgetType === 'programme') {
            this.budgetService.getBudgetControlForProgramm(params).subscribe(data => {
                this.budgetControlList = data.items;
            });
        }
    }

    getCurrencyList() {
        this.budgetService.getCurrencies().subscribe(d => {
            this.currencyList = d.items;
        });
    }

    checkBudgetUpdate(items) {
        this.adminSegmentSelected = true;
        this.fundSegmentSelected = true;
        this.budgetId = items.id;
        this.budgetControlForm.patchValue({
            adminSegmentId: items.adminSegmentId,
            fundSegmentId: items.fundSegmentId,
            programSegmentId: items.programSegmentId,
            economicSegmentId: items.economicSegmentId,
            xRateLocal: items.xRateLocal,
            xRateToInternational: items.xRateToInternational,
            currencyId: items.currencyId,
            budgetAmount: items.budgetAmount,
            previousYearAmount: items.previousYearAmount,
            previousYearActualAmount: items.previousYearActualAmount,
            cumulativePreviousYearAmount: items.cumulativePreviousYearAmount,
            cumulativePreviousYearActualAmount: items.cumulativePreviousYearActualAmount,
            month_1: items.budgetBreakups[0].mainBudget,
            month_2: items.budgetBreakups[1].mainBudget,
            month_3: items.budgetBreakups[2].mainBudget,
            month_4: items.budgetBreakups[3].mainBudget,
            month_5: items.budgetBreakups[4].mainBudget,
            month_6: items.budgetBreakups[5].mainBudget,
            month_7: items.budgetBreakups[6].mainBudget,
            month_8: items.budgetBreakups[7].mainBudget,
            month_9: items.budgetBreakups[8].mainBudget,
            month_10: items.budgetBreakups[9].mainBudget,
            month_11: items.budgetBreakups[10].mainBudget,
            month_12: items.budgetBreakups[11].mainBudget,
            supplementary_month_1: items.budgetBreakups[0].supplementaryBudget,
            supplementary_month_2: items.budgetBreakups[1].supplementaryBudget,
            supplementary_month_3: items.budgetBreakups[2].supplementaryBudget,
            supplementary_month_4: items.budgetBreakups[3].supplementaryBudget,
            supplementary_month_5: items.budgetBreakups[4].supplementaryBudget,
            supplementary_month_6: items.budgetBreakups[5].supplementaryBudget,
            supplementary_month_7: items.budgetBreakups[6].supplementaryBudget,
            supplementary_month_8: items.budgetBreakups[7].supplementaryBudget,
            supplementary_month_9: items.budgetBreakups[8].supplementaryBudget,
            supplementary_month_10: items.budgetBreakups[9].supplementaryBudget,
            supplementary_month_11: items.budgetBreakups[10].supplementaryBudget,
            supplementary_month_12: items.budgetBreakups[11].supplementaryBudget,
        });
        if (items['adminSegment']) {
            this.adminSegments = [{
                name: items['adminSegment'].name,
                id: items['adminSegment'].id
            }];
        }
        if (items['fundSegment']) {
            this.fundSegments = [{
                name: items['fundSegment'].name,
                id: items['fundSegment'].id
            }];
        }
        if (items['economicSegment']) {
            this.economicSegments = [{
                name: items['economicSegment'].name,
                id: items['economicSegment'].id
            }];
        }

        if (items['programSegment']) {
            this.programSegments = [{
                name: items['programSegment'].name,
                id: items['programSegment'].id
            }];
        }
    }

    copyToAll() {
        if (this.selectedRadioBudgetOption === 0) {
            if (this.budgetControlForm.value && this.budgetControlForm.value.month_1) {
                this.budgetControlForm.patchValue({
                    month_2: this.budgetControlForm.value.month_1,
                    month_3: this.budgetControlForm.value.month_1,
                    month_4: this.budgetControlForm.value.month_1,
                    month_5: this.budgetControlForm.value.month_1,
                    month_6: this.budgetControlForm.value.month_1,
                    month_7: this.budgetControlForm.value.month_1,
                    month_8: this.budgetControlForm.value.month_1,
                    month_9: this.budgetControlForm.value.month_1,
                    month_10: this.budgetControlForm.value.month_1,
                    month_11: this.budgetControlForm.value.month_1,
                    month_12: this.budgetControlForm.value.month_1,
                });
            } else {
                this.alertService.showErrors('Please fill Month - 1 data');
            }
        }

        if (this.selectedRadioBudgetOption === 1) {
            if (this.budgetControlForm.value && this.budgetControlForm.value.supplementary_month_1) {
                this.budgetControlForm.patchValue({
                    supplementary_month_2: this.budgetControlForm.value.supplementary_month_1,
                    supplementary_month_3: this.budgetControlForm.value.supplementary_month_1,
                    supplementary_month_4: this.budgetControlForm.value.supplementary_month_1,
                    supplementary_month_5: this.budgetControlForm.value.supplementary_month_1,
                    supplementary_month_6: this.budgetControlForm.value.supplementary_month_1,
                    supplementary_month_7: this.budgetControlForm.value.supplementary_month_1,
                    supplementary_month_8: this.budgetControlForm.value.supplementary_month_1,
                    supplementary_month_9: this.budgetControlForm.value.supplementary_month_1,
                    supplementary_month_10: this.budgetControlForm.value.supplementary_month_1,
                    supplementary_month_11: this.budgetControlForm.value.supplementary_month_1,
                    supplementary_month_12: this.budgetControlForm.value.supplementary_month_1,
                });
            } else {
                this.alertService.showErrors('Please fill Month - 1 data');
            }
        }
    }

    split() {
        let month_data = 0;
        let month_data_supplementary = 0;
        if (this.selectedRadioBudgetOption === 0) {
            if (this.budgetControlForm.value && this.budgetControlForm.value.month_1) {
                month_data = Number(this.budgetControlForm.value.month_1 / 12);
                month_data = Number(month_data.toFixed(2));
                this.budgetControlForm.patchValue({
                    month_1: month_data,
                    month_2: month_data,
                    month_3: month_data,
                    month_4: month_data,
                    month_5: month_data,
                    month_6: month_data,
                    month_7: month_data,
                    month_8: month_data,
                    month_9: month_data,
                    month_10: month_data,
                    month_11: month_data,
                    month_12: month_data,
                });
            } else {
                this.alertService.showErrors('Please fill Month - 1 data');
            }
        }

        if (this.selectedRadioBudgetOption === 1) {
            if (this.budgetControlForm.value && this.budgetControlForm.value.supplementary_month_1) {
                month_data_supplementary = Number(this.budgetControlForm.value.supplementary_month_1 / 12);
                month_data_supplementary = Number(month_data_supplementary.toFixed(2));
                this.budgetControlForm.patchValue({
                    supplementary_month_1: month_data_supplementary,
                    supplementary_month_2: month_data_supplementary,
                    supplementary_month_3: month_data_supplementary,
                    supplementary_month_4: month_data_supplementary,
                    supplementary_month_5: month_data_supplementary,
                    supplementary_month_6: month_data_supplementary,
                    supplementary_month_7: month_data_supplementary,
                    supplementary_month_8: month_data_supplementary,
                    supplementary_month_9: month_data_supplementary,
                    supplementary_month_10: month_data_supplementary,
                    supplementary_month_11: month_data_supplementary,
                    supplementary_month_12: month_data_supplementary
                });
            } else {
                this.alertService.showErrors('Please fill Month - 1 data');
            }
        }
    }

    getUpdateBudget() {
        if (this.budgetId) {
            this.budgetService.updateBudget(this.budgetId, this.getBudgetBreakupsDataFormat()).subscribe(val => {
                this.getBudgetData();
                this.budgetId = '';
                this.budgetControlForm.reset();
                this.adminSegments = [];
                this.fundSegments = [];
                this.programSegments = [];
                this.economicSegments = [];
            });
        }
    }

    getBudgetBreakupsDataFormat() {
        const f = this.budgetControlForm.value;
        const budgetData = {
            adminSegmentId: f.adminSegmentId,
            fundSegmentId: f.fundSegmentId,
            xRateLocal: f.xRateLocal,
            xRateToInternational: f.xRateToInternational,
            currencyId: f.currencyId,
            budgetAmount: f.budgetAmount,
            previousYearAmount: f.previousYearAmount,
            previousYearActualAmount: f.previousYearActualAmount,
            cumulativePreviousYearAmount: f.cumulativePreviousYearAmount,
            cumulativePreviousYearActualAmount: f.cumulativePreviousYearActualAmount,
            budgetBreakups: [
                {
                    month: 1,
                    mainBudget: f.month_1,
                    supplementaryBudget: f.supplementary_month_1
                },
                {
                    month: 2,
                    mainBudget: f.month_2,
                    supplementaryBudget: f.supplementary_month_2
                },
                {
                    month: 3,
                    mainBudget: f.month_3,
                    supplementaryBudget: f.supplementary_month_3
                },
                {
                    month: 4,
                    mainBudget: f.month_4,
                    supplementaryBudget: f.supplementary_month_4
                },
                {
                    month: 5,
                    mainBudget: f.month_5,
                    supplementaryBudget: f.supplementary_month_5
                },
                {
                    month: 6,
                    mainBudget: f.month_6,
                    supplementaryBudget: f.supplementary_month_6
                },
                {
                    month: 7,
                    mainBudget: f.month_7,
                    supplementaryBudget: f.supplementary_month_7
                },
                {
                    month: 8,
                    mainBudget: f.month_8,
                    supplementaryBudget: f.supplementary_month_8
                },
                {
                    month: 9,
                    mainBudget: f.month_9,
                    supplementaryBudget: f.supplementary_month_9
                },
                {
                    month: 10,
                    mainBudget: f.month_10,
                    supplementaryBudget: f.supplementary_month_10
                },
                {
                    month: 11,
                    mainBudget: f.month_11,
                    supplementaryBudget: f.supplementary_month_11
                },
                {
                    month: 12,
                    mainBudget: f.month_12,
                    supplementaryBudget: f.supplementary_month_12
                }
            ]
        };
        if (this.budgetType === 'programme') {
            budgetData['programSegmentId'] = f.programSegmentId;
            budgetData['economicSegmentId'] = null;

        }
        if (this.budgetType === 'economic') {
            budgetData['economicSegmentId'] = f.economicSegmentId;
            budgetData['programSegmentId'] = null;
        }
        return budgetData;
    }

    addRow() {
        if (this.budgetControlForm.valid) {
            this.budgetService.addBudget(this.getBudgetBreakupsDataFormat()).subscribe(val => {
                this.budgetControlForm.reset();
                this.getBudgetData();
                this.adminSegments = [];
                this.fundSegments = [];
                this.programSegments = [];
                this.economicSegments = [];
            });
        }

    }

    deleteItemModal(items) {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteBugdet(items.id);
            }
        });
    }

    deleteBugdet(id) {
        this.budgetService.deleteBudget(id).subscribe(data => {
            if (data) {
                this.getBudgetData();
            }
        });
    }

    adminSegmentSelect() {
        this.dialogRef = this._matDialog.open(AdminSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                console.log("bye");
                return;
            }
            this.adminSegmentSelected = true;
            this.adminSegments = [{
                'name': response.name,
                'id': response.id
            }];
            if (this.adminSegmentSelected && this.fundSegmentSelected) {
                this.getBudgetData();
            }
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
            this.programSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.budgetControlForm.patchValue({
                programSegmentId: response.id,
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

            this.fundSegmentSelected = true;

            this.fundSegments = [{
                'name': response.name,
                'id': response.id
            }];
            if (this.adminSegmentSelected && this.fundSegmentSelected) {
                this.getBudgetData();
            }
            this.budgetControlForm.patchValue({
                fundSegmentId: response.id,
                fundSegmentCode: response.id,
                disabled: true
            });
        });
    }

    economicSegmentSelect() {
        this.dialogRef = this._matDialog.open(EconomicSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.economicSegments = [{
                'name': response.name,
                'id': response.id
            }];
            this.budgetControlForm.patchValue({
                economicSegmentId: response.id,
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

    cancelUpdate() {
        this.budgetId = '';
        this.budgetControlForm.reset();
        this.adminSegments = [];
        this.fundSegments = [];
        this.programSegments = [];
        this.economicSegments = [];
    }
}