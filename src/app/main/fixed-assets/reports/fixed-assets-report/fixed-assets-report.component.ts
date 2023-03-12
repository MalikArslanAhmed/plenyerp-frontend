import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FxaAssetsService } from 'app/shared/services/fxa-assets.service';
import { FxaCategoriesService } from 'app/shared/services/fxa-categories.service';
import { FixedAssetsReportModalComponent } from './fixed-assets-report-modal/fixed-assets-report-modal.component';

@Component({
    selector: 'app-fixed-assets-report',
    templateUrl: './fixed-assets-report.component.html',
    styleUrls: ['./fixed-assets-report.component.scss']
})
export class FixedAssetsReportComponent implements OnInit {
    displayedColumns = ['id', 'assetNo', 'title', 'pvYEar', 'pvDepartNo', 'currentLocation', 'acquisationDate', 'acquistionCost', 'depreciationDate', 'netBookValue', 'make', 'status'];

    dialogRef: any;
    fixedAssetsReport = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    assetsForm: FormGroup;
    faCategories = '';
    depMonth: number = null;
    fixedAssetId: any;
    fetching = false
    assetNo = ''
    location = ''
    status = ''
    constructor(
        private fxaCategoryService: FxaCategoriesService,
        private _matDialog: MatDialog,
        private fb: FormBuilder,
        private fxaAssetsService: FxaAssetsService,

    ) {
    }
    printPage() {
        window.print()
    }
    ngOnInit(): void {
        this.refresh();
    }
    refresh(): void {
        this.assetsForm = this.fb.group({
            fxaCategoryId: [''],
        });
    }

    getFixedAssetReport(): void {
        let params = {
            page: this.pagination.page,
            categoriesAllIds: this.faCategories,
            dep_month: this.depMonth,
            location: this.location,
            assetNo: this.assetNo,
            status: this.status,
        };

        this.fetching = true
        this.fxaAssetsService.fixedAssetsReport(params).subscribe(
            data => {
                this.fixedAssetsReport = data.data.map(item => {
                    return {
                        ...item,
                        acquisitionCost: +item['acquisitionCost'],
                        beginAccumDepr: +item['beginAccumDepr'],
                        icurrYrDepr: +item['currYrDepr'],
                    }
                });
                this.pagination.page = data.currentPage;
                this.pagination.total = data.total;
                this.fetching = false
            }
        );
    }

    onPageChange(page): void {
        this.pagination.page = page.pageIndex + 1;
        this.getFixedAssetReport();
    }


    openDeprecateModal(): void {
        this.dialogRef = this._matDialog.open(FixedAssetsReportModalComponent, {
            panelClass: 'contact-form-dialog',
            data: {}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.location = ''
            this.assetNo = ''
            this.status = ''
            this.faCategories = response.categoriesAllIds
            this.depMonth = response.dep_month
            this.fixedAssetsReport = response.data.data.map(item => {
                return {
                    ...item,
                    acquisitionCost: +item['acquisitionCost'],
                    beginAccumDepr: +item['beginAccumDepr'],
                    currYrDepr: +item['currYrDepr'],
                }
            })
            this.pagination.page = response.data.currentPage;
            this.pagination.total = response.data.total;
            this.fetching = false
        });
    }

}
