import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '../../../../@fuse/animations';
import {AdminSegmentSelectComponent} from '../journal-voucher/admin-segment-select/admin-segment-select.component';
import {FundSegmentSelectComponent} from '../journal-voucher/fund-segment-select/fund-segment-select.component';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import {BudgetControlService} from 'app/shared/services/budget-control.service';
import {DeleteListModalComponent} from '../delete-list-modal/delete-list-modal.component';
import {AlertService} from '../../../shared/services/alert.service';
import * as moment from 'moment';
import {CensuresCreateComponent} from '../censures/censures-create/censures-create.component';
import {BudgetControlAieModalComponent} from './budget-control-aie-modal/budget-control-aie-modal.component';

@Component({
    selector: 'app-budget-control-aie',
    templateUrl: './budget-control-aie.component.html',
    styleUrls: ['./budget-control-aie.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BudgetControlAieComponent implements OnInit {
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
    budgetControlAieList = [
        // {
        // aie_no: '234',
        // narration: 'asdfg',
        // }
    ];
    currencyList = [];
    budgetId;
    budgetAieId;
    economicCodeData = [];
    isUpdateAieTable = false;

    totalAmount = 0;
    isAddRowValid = false;
    filterEcoCode = null;
    ecoCodeOriginalData = [];
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private budgetService: BudgetControlService,
        private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(param => {
            this.budgetType = param['type'];
        });
        this.getCurrencyList();
        this.budgetControlForm = this.fb.group({
            adminSegmentId: [''],
            fundSegmentId: [''],
            aieNumber: [''],
            dateIssued: [''],
            narration: [''],

        });
    }

    getTotalAmount() {
        this.totalAmount = 0;
        if (this.economicCodeData && this.economicCodeData.length) {
            this.economicCodeData.forEach(v => {
                this.totalAmount = this.totalAmount + parseInt(v.amount);
            });
        }
    }

    getBudgetAieData() {
        this.budgetControlAieList = [];
        const params = {
            adminSegmentId: this.adminSegments[0].id,
            fundSegmentId: this.fundSegments[0].id
        };
        this.budgetService.budgetControlAieList(params).subscribe(
            data => {
                this.budgetControlAieList = data.items;
                // console.log('----->>>>', data.items);
            }
        );
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
        this.budgetService.deleteBudgetAie(id).subscribe(data => {
            if (data) {
                this.getBudgetAieData();
            }
        });
    }

    adminSegmentSelect() {
        this.dialogRef = this._matDialog.open(AdminSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                // console.log('bye');
                return;
            }
            this.adminSegmentSelected = true;
            this.adminSegments = [{
                'name': response.name,
                'id': response.id
            }];
            if (this.adminSegmentSelected && this.fundSegmentSelected) {
                this.getBudgetAieData();
            }
            this.budgetControlForm.patchValue({
                adminSegmentId: response.id,
                adminSegmentCode: response.id,
                disabled: true
            });
            this.economicCodeData = [];
            this.ecoCodeOriginalData = [];
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
                this.getBudgetAieData();
            }
            this.budgetControlForm.patchValue({
                fundSegmentId: response.id,
                fundSegmentCode: response.id,
                disabled: true
            });
            this.economicCodeData = [];
            this.ecoCodeOriginalData = [];
        });
    }


    addRow() {
        const budgetForm = this.budgetControlForm.value;
        if (budgetForm.fundSegmentId && budgetForm.adminSegmentId) {
            this.isAddRowValid = true;

            this.dialogRef = this._matDialog.open(BudgetControlAieModalComponent, {
                panelClass: 'contact-form-dialog',
                data: {action: 'CREATE'}
            });
            this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                if (this.economicCodeData && this.economicCodeData.length) {
                    const selectedIndex = this.economicCodeData.map(val => {
                        return val.ecoCode;
                    }).indexOf(response.value.ecoCode);
                    // console.log('--->>>', selectedIndex);
                    if (selectedIndex === -1) {
                        this.economicCodeData.push(response.value);
                        this.ecoCodeOriginalData.push(response.value);
                    } else {
                        this.alertService.showErrors('Already added please select an other Economic code');
                    }
                } else {
                    this.economicCodeData.push(response.value);
                    this.ecoCodeOriginalData.push(response.value);
                }
                this.getTotalAmount();

            });
        } else if (budgetForm.adminSegmentId) {
            this.alertService.showErrors('Fund segment is not selected');
        } else if (budgetForm.fundSegmentId) {
            this.alertService.showErrors('Admin segment is not selected');
        } else {
            this.alertService.showErrors('Admin segment && Fund segment is not selected');
        }
    }

    editEcoFormField(item, itemIndex) {
        item['isUpdate'] = this.isUpdateAieTable;
        this.dialogRef = this._matDialog.open(BudgetControlAieModalComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', economic: item}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            if (response.value && this.economicCodeData && this.economicCodeData.length) {
                this.economicCodeData.forEach(val => {
                    // if (val.ecoCode === response.value.ecoCode) {
                    //     val.amount = response.value.amount;
                    // }
                    this.economicCodeData[itemIndex] = response.value;
                });
            }
            this.getTotalAmount();
        });
    }

    delete(itemIndex) {
        this.economicCodeData.splice(itemIndex, 1);
        this.getTotalAmount();
    }

    reset() {
        this.budgetControlForm.reset();
        this.economicCodeData = [];
        this.ecoCodeOriginalData = [];
        this.adminSegments = [];
        this.fundSegments = [];
        this.isUpdateAieTable = false;
        this.budgetControlAieList = [];
        this.filterEcoCode = null;
    }

    save() {
        if (this.budgetControlForm.invalid) {
            return;
        }
        const aieEconomicBalances = [];
        if (this.economicCodeData && this.economicCodeData.length) {
            this.economicCodeData.forEach(val => {
                aieEconomicBalances.push({
                    economicSegmentId: val.ecoCode,
                    amount: val.amount,
                });
            });
        }

        const finalData = this.budgetControlForm.value;
        const params = {
            ...finalData,
            dateIssued: finalData.dateIssued ? moment(finalData.dateIssued).format('YYYY-MM-DD') : '',
            aieEconomicBalances: aieEconomicBalances
        };

        // console.log('---submit', params);
        if (this.isUpdateAieTable) {
            this.budgetService.updateBudgetControlAie(this.budgetAieId, params).subscribe(data => {
                // this.getBudgetAieData();
                this.budgetControlAieList = [];
                this.reset();
                this.isUpdateAieTable = false;
            });
        } else {
            this.budgetService.addBudgetControlAie(params).subscribe(data => {
                // this.getBudgetAieData();
                this.budgetControlAieList = [];
                this.reset();
                this.isUpdateAieTable = false;
            });
        }

    }

    editAieTableItem(items) {
        this.economicCodeData = [];
        this.ecoCodeOriginalData = [];
        this.isUpdateAieTable = true;
        this.budgetAieId = items.id;
        // console.log('--->>>edit', items);
        const aieEconomicBalances = [];
        if (items['aieEconomicBalances'] && items['aieEconomicBalances'].length) {
            items['aieEconomicBalances'].forEach(val => {
                aieEconomicBalances.push({
                    ecoCode: val.economicSegmentId,
                    amount: val.amount,
                    title: val.economicSegment.name
                });
            });
        }
        this.economicCodeData = aieEconomicBalances;
        this.ecoCodeOriginalData = aieEconomicBalances;
        this.budgetControlForm.patchValue({
            adminSegmentId: items.adminSegmentId,
            fundSegmentId: items.fundSegmentId,
            aieNumber: items.aieNumber,
            dateIssued: moment(items.dateIssued).format('YYYY-MM-DD'),
            narration: items.narration,

        });
        this.getTotalAmount();

    }

    search() {
        // console.log('---search', this.filterEcoCode);
        const filterData = [];
        if (this.economicCodeData && this.economicCodeData.length) {
            this.economicCodeData.forEach(v => {
                if (v.ecoCode === Number(this.filterEcoCode)) {
                    filterData.push(v);
                }
            });
            if (this.filterEcoCode){
                this.economicCodeData = filterData;
            }else {
                this.economicCodeData = this.ecoCodeOriginalData;
            }
            this.getTotalAmount();
        }

    }
}