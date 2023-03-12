import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FxaCategoriesService } from '../../../shared/services/fxa-categories.service';
import { MatDialog } from '@angular/material/dialog';
import { FixedAssetReDeploymentComponent } from '../fixed-asset-re-deployment/fixed-asset-re-deployment.component';
import { AssetsDepreciationModalComponent } from './assets-depreciation-modal/assets-depreciation-modal.component';
import { SelectCategoriesModalComponent } from './select-categories-modal/select-categories-modal.component';
import { FxaAssetsService } from 'app/shared/services/fxa-assets.service';

@Component({
    selector: 'app-fixed-assets-depriciation',
    templateUrl: './fixed-assets-depriciation.component.html',
    styleUrls: ['./fixed-assets-depriciation.component.scss']
})
export class FixedAssetsDepreciationComponent implements OnInit {
    // faCategories = [];
    filterForm: FormGroup;
    selectedFixedAsset = {};
    dialogRef: any;
    fixedAssets = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    assetsForm: FormGroup;
    faCategories: any = [{ id: 0 }];
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

    ngOnInit(): void {
        this.refresh();
        this.getFixedAsset();
    }
    refresh(): void {
        this.assetsForm = this.fb.group({
            fxaCategoryId: [''],
        });

    }
    openFixedAssetCategory(): void {
        this.dialogRef = this._matDialog.open(SelectCategoriesModalComponent, {
            panelClass: 'contact-form-dialog',
            data: {}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            console.log('selected cat', response);

            this.faCategories = response
            this.assetsForm.patchValue({
                fxaCategoryId: response[0].id,
                disabled: true
            });
        });
    }

    getFixedAsset(): void {
        let params = {
            page: this.pagination.page,
            categoriesAllIds: this.faCategories[0].id,
            dep_month: 12
        };
        this.fetching = true
        this.fxaAssetsService.fixedAssetsReport(params).subscribe(
            data => {
                this.fixedAssets = data.data.map(item => {
                    return {
                        ...item,
                        acquisitionCost: +item['acquisitionCost'],
                        beginAccumDepr: +item['beginAccumDepr'],
                        currYrDepr: +item['currYrDepr'],
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
        this.getFixedAsset();
    }


    openDeprecateModal(): void {
        this.dialogRef = this._matDialog.open(AssetsDepreciationModalComponent, {
            panelClass: 'contact-form-dialog',
            data: {}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            console.log(response)
        });
    }
    getDepreciationDetails(fixedAsset): void {

    }
}
