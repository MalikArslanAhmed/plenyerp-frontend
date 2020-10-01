import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {CompaniesService} from '../../../../shared/services/companies.service';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {DeleteListModalComponent} from '../../delete-list-modal/delete-list-modal.component';

@Component({
    selector: 'app-budget-control-list',
    templateUrl: './budget-control-list.component.html',
    styleUrls: ['./budget-control-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BudgetControlListComponent implements OnInit {
    displayedColumns: string[] = ['sno', 'fullCode', 'lineCode', 'title', 'Pr_Yr_budget', 'Pr_Yr_actual', 'supplementary_budget', 'total_Budget', 'month_1', 'month_2', 'month_3', 'month_4', 'month_5', 'month_6', 'month_7', 'month_8', 'month_9', 'month_10', 'month_11', 'month_12'];
    budgetControlList = [
        {
            sno: '1',
            fullCode: '2',
            lineCode: '3',
            title: 'sfsfs',
            Pr_Yr_budget: 'fsfs',
            Pr_Yr_actual: 'sfdsd',
            supplementary_budget: 'dsg',
            total_Budget: 'sdfsdg',
            month_1: '12',
            month_2: '2',
            month_3: '2',
            month_4: '2',
            month_5: '2',
            month_6: '2',
            month_7: '3',
            month_8: '23',
            month_9: '23',
            month_10: '23',
            month_11: '34',
            month_12: '45'
        }
    ];
    dialogRef: any;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;

    constructor(private companiesService: CompaniesService,
                private _matDialog: MatDialog) {
    }


    ngOnInit(): void {
        // this.getCompaniesList();
    }

    // getCompaniesList(params = {}): void {
    //     this.budgetControlList = [];
    //     this.companiesService.getCompaniesList(params).subscribe(data => {
    //         this.budgetControlList = data.items;
    //         this.pagination.page = data.page;
    //         this.pagination.total = data.total;
    //         if (this.budgetControlList && this.budgetControlList.length > 0) {
    //             let i = 1;
    //             this.budgetControlList.forEach(company => {
    //                 company['sno'] = i;
    //                 i++;
    //             });
    //         }
    //     });
    // }
    //
    // deleteItemModal(items): void {
    //     this.dialogRef = this._matDialog.open(DeleteListModalComponent, {
    //         panelClass: 'delete-items-dialog',
    //         data: {data: items}
    //     });
    //     this.dialogRef.afterClosed().subscribe((response: boolean) => {
    //         if (response) {
    //             this.deleteCompany(items.id);
    //         }
    //     });
    // }
    //
    // deleteCompany(id): void {
    //     this.companiesService.deleteCompany(id).subscribe(data => {
    //         if (data) {
    //             this.getCompaniesList();
    //         }
    //     });
    // }
    //
    //

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        // this.getCompaniesList();
    }
}
