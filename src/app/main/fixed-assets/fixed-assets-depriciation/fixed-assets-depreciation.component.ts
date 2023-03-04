import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FxaCategoriesService } from '../../../shared/services/fxa-categories.service';
import { MatDialog } from '@angular/material/dialog';
import { FixedAssetReDeploymentComponent } from '../fixed-asset-re-deployment/fixed-asset-re-deployment.component';
import { AssetsDepreciationModalComponent } from './assets-depreciation-modal/assets-depreciation-modal.component';
import { SelectCategoriesModalComponent } from './select-categories-modal/select-categories-modal.component';

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
    faCategories = [];
    fixedAssetId: any;
    fetching = false
    constructor(
        private fxaCategoryService: FxaCategoriesService,
        private _matDialog: MatDialog,
        private fb: FormBuilder,

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
        };
        if (this.faCategories.length) {
            let catIds = this.faCategories.map(item => { return item.id })
            params['fxaCategoryId'] = JSON.stringify(catIds)
        }
        this.fetching = true
        this.fxaCategoryService.get(params).subscribe(
            data => {
                this.fixedAssets = data.items;
                this.pagination.page = data.page;
                this.pagination.total = data.total;
                this.fetching = false
            }
        );
    }

    onPageChange(page): void {
        this.pagination.page = page.pageIndex + 1;
        this.getFixedAsset();
    }

    deprecate(): void {
        // this.fxaCategoryService.deprications({}).subscribe(
        //     data => {
        //         this.getFixedAsset();
        //     }
        // );

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
            // this.faCategories = [{
            //     title: response.title,
            //     id: response.id
            // }];
            // this.assetsForm.patchValue({
            //     fxaCategoryId: response.id,
            //     disabled: true
            // });
            // if (!this.fixedAssetId) {
            //     this.assetsForm.patchValue({
            //         assetNo: response.combinedCode + '\\' + response.nextAssetNo
            //     });
            // }
        });
    }
    getDepreciationDetails(fixedAsset): void {

    }
}
