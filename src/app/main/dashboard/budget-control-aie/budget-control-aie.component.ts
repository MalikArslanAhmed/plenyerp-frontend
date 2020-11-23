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
import {AlertService} from '../../../shared/services/alert.service';

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
    budgetControlAieList = [{
        aie_no: '234',
        narration: 'asdfg',
    }];
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
        // this.router.events.subscribe((event: Event) => {
        //     if (event instanceof NavigationEnd) {
        //         this.activatedRoute.params.subscribe(param => {
        //             this.budgetType = param['type'];
        //             this.ngOnInit();
        //             this.adminSegmentSelected = false;
        //             this.fundSegmentSelected = false;
        //             this.adminSegments = [];
        //             this.fundSegments = [];
        //         });
        //     }
        // });
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(param => {
            this.budgetType = param['type'];
        });
        this.getCurrencyList();
        this.budgetControlForm = this.fb.group({
            adminSegmentId: [''],
            fundSegmentId: [''],
            ref_no: [''],
            aie_no: [''],
            date_issued: [''],
            narration: [''],
            search_eco_code: [''],
            search_aie_no: [''],
            total_amount: [''],

        });
    }

    focusOutFunction() {
        this.isDisabled = !this.budgetControlForm.valid;
    }

    getBudgetData() {
        // this.budgetControlAieList = [];
        const params = {
            adminSegmentId: this.adminSegments[0].id,
            fundSegmentId: this.fundSegments[0].id
        };
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
                console.log('bye');
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

    addRow() {
        console.log('--add row');
    }

    cancel() {

    }

    save() {

    }
}