import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fuseAnimations} from '../../../../@fuse/animations';
import {AdminSegmentSelectComponent} from "../journal-voucher/admin-segment-select/admin-segment-select.component";
import {ProgrammingSegmentSelectComponent} from "../journal-voucher/programming-segment-select/programming-segment-select.component";
import {FundSegmentSelectComponent} from "../journal-voucher/fund-segment-select/fund-segment-select.component";
import {ActivatedRoute, Event, NavigationEnd, Router} from "@angular/router";
import { PageEvent } from '@angular/material/paginator';
import { BudgetControlService } from 'app/shared/services/budget-control.service';
import { DeleteListModalComponent } from '../delete-list-modal/delete-list-modal.component';

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
    tempBudget =[];
    displayedColumns: string[] = ['sno', 'fullCode', 'lineCode', 'title', 'Pr_Yr_budget', 'Pr_Yr_actual', 'supplementary_budget', 'total_Budget', 'month_1', 'month_2', 'month_3', 'month_4', 'month_5', 'month_6', 'month_7', 'month_8', 'month_9', 'month_10', 'month_11', 'month_12'];
    budgetControlList = [
        // {
        //     sno: '1',
        //     fullCode: '2',
        //     lineCode: '3',
        //     title: 'sfsfs111',
        //     Pr_Yr_budget: 'fsfs',
        //     Pr_Yr_actual: 'sfdsd',
        //     supplementary_budget: 'dsg',
        //     total_Budget: 'sdfsdg',
        //     month_1: '12',
        //     month_2: '2',
        //     month_3: '2',
        //     month_4: '2',
        //     month_5: '2',
        //     month_6: '2',
        //     month_7: '3',
        //     month_8: '23',
        //     month_9: '23',
        //     month_10: '23',
        //     month_11: '34',
        //     month_12: '45'
        // },
        // {
        //     sno: '2',
        //     fullCode: '2',
        //     lineCode: '3',
        //     title: 'sfsfs',
        //     Pr_Yr_budget: 'fsfs',
        //     Pr_Yr_actual: 'sfdsd',
        //     supplementary_budget: 'dsg',
        //     total_Budget: 'sdfsdg',
        //     month_1: '12',
        //     month_2: '2',
        //     month_3: '2',
        //     month_4: '2',
        //     month_5: '2',
        //     month_6: '2',
        //     month_7: '3',
        //     month_8: '23',
        //     month_9: '23',
        //     month_10: '23',
        //     month_11: '34',
        //     month_12: '45'
        // }
    ];

    /*pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;*/

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private fb: FormBuilder,
        private _matDialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private budgetService: BudgetControlService) {
            this.router.events.subscribe((event: Event) => {
                if (event instanceof NavigationEnd)
                {
                    this.activatedRoute.params.subscribe(param => {
                        this.budgetType = param['type']
                        this.ngOnInit();
                    });
                    //console.log("abc",this.budgetType);
                }
                
            })
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(param => {
            this.budgetType = param['type']
        });

        this.getBudgetData();
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

    getBudgetData()
    {
        this.budgetControlList =[];
        if(this.budgetType==='economic')
        {
            this.budgetService.getBudgetControlForEconomic().subscribe(data => {
                this.budgetControlList = data.items;
                //console.log("hello",this.budgetControlList);
            });
            //console.log("he");
        }
        if(this.budgetType==='programme')
        {
            this.budgetService.getBudgetControlForProgramm().subscribe(data=> {
                this.budgetControlList = data.items;
               // console.log("bye",this.budgetControlList);
            });
        }
        //console.log("abc",this.budgetControlList)
    }

    addRow()
    {
        console.log("abc",this.budgetControlForm.value);
        
        // this.tempBudget.push({
        //     sno: '-',
        //     fullCode: '-',
        //     lineCode: '-',
        //     title: '-',
        //     Pr_Yr_budget: '-',
        //     Pr_Yr_actual: '-',
        //     supplementary_budget: '-',
        //     total_Budget: '-',
        //     month_1:this.budgetControlForm.controls['month_1'].value,
        //     month_2:this.budgetControlForm.controls['month_2'].value,
        //     month_3:this.budgetControlForm.controls['month_3'].value,
        //     month_4:this.budgetControlForm.controls['month_4'].value,
        //     month_5:this.budgetControlForm.controls['month_5'].value,
        //     month_6:this.budgetControlForm.controls['month_6'].value,
        //     month_7:this.budgetControlForm.controls['month_7'].value,
        //     month_8:this.budgetControlForm.controls['month_8'].value,
        //     month_9:this.budgetControlForm.controls['month_9'].value,
        //     month_10:this.budgetControlForm.controls['month_10'].value,
        //     month_11:this.budgetControlForm.controls['month_11'].value,
        //     month_12:this.budgetControlForm.controls['month_12'].value,
        // });
        // this.budgetControlList=this.tempBudget

        this.budgetControlForm.reset();

    }

    deleteItemModal(items)
    {
        this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
            panelClass: 'delete-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.deleteBugdet(items.id);
            }
        });
       // console.log("data",items);
    }

    deleteBugdet(id)
    {
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