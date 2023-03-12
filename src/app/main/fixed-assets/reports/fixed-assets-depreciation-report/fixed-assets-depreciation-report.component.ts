import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FxaAssetsService } from 'app/shared/services/fxa-assets.service';
import { FxaCategoriesService } from 'app/shared/services/fxa-categories.service';
import { FixedAssetsDepreciationReportModalComponent } from './fixed-assets-depreciation-report-modal/fixed-assets-depreciation-report-modal.component';

@Component({
  selector: 'app-fixed-assets-depreciation-report',
  templateUrl: './fixed-assets-depreciation-report.component.html',
  styleUrls: ['./fixed-assets-depreciation-report.component.scss']
})
export class FixedAssetsDepreciaitonReportComponent implements OnInit {
    displayedColumns = ['id', 'assetNo', 'title', 'acquistionCost','depreciation', 'accDepreciaition', 'netBookValue','remark'];

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
    depMonth:number = null;
    fixedAssetId: any;
    fetching = false
    assetNo = ''
    location = ''
    constructor(
        private fxaCategoryService: FxaCategoriesService,
        private _matDialog: MatDialog,
        private fb: FormBuilder,
        private fxaAssetsService: FxaAssetsService,

    ) {
    }
printPage(){
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
            location:this.location,
            assetNo:this.assetNo,
        };

        this.fetching = true
        this.fxaAssetsService.fixedAssetsReport(params).subscribe(
            data => {
                this.fixedAssetsReport = data.data.map(item=>{
                    return {...item,
                        acquisitionCost:+item['acquisitionCost'],
                        beginAccumDepr:+item['beginAccumDepr'],
                        currYrDepr:+item['currYrDepr'],
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
        this.dialogRef = this._matDialog.open(FixedAssetsDepreciationReportModalComponent, {
            panelClass: 'contact-form-dialog',
            data: {}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            console.log('data',response);
            this.faCategories = response.categoriesAllIds
            this.depMonth = response.dep_month
            this.fixedAssetsReport = response.data.data.map(item=>{
                return {...item,
                    acquisitionCost:+item['acquisitionCost'],
                    beginAccumDepr:+item['beginAccumDepr'],
                    currYrDepr:+item['currYrDepr'],
                }
            });
            this.pagination.page = response.data.currentPage;
            this.pagination.total = response.data.total;
            this.fetching = false
        });
    }

}
