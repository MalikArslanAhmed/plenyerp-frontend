import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FxaCategoriesService} from '../../../shared/services/fxa-categories.service';
import {MatDialog} from '@angular/material/dialog';
import {FixedAssetReDeploymentComponent} from '../fixed-asset-re-deployment/fixed-asset-re-deployment.component';

@Component({
    selector: 'app-fixed-assets-depriciation',
    templateUrl: './fixed-assets-depriciation.component.html',
    styleUrls: ['./fixed-assets-depriciation.component.scss']
})
export class FixedAssetsDepreciationComponent implements OnInit {

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

    constructor(private fxaCategoryService: FxaCategoriesService,
                private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getFixedAsset();
    }



    getFixedAsset(): void {
        const param = {
            page: this.pagination.page
        };
        this.fxaCategoryService.get(param).subscribe(
            data => {
                this.fixedAssets = data.items;
                this.pagination.page = data.page;
                this.pagination.total = data.total;
            }
        );
    }

    onPageChange(page): void {
        this.pagination.page = page.pageIndex + 1;
        this.getFixedAsset();
    }

    deprecate(): void {
        this.fxaCategoryService.deprications({}).subscribe(
            data => {
                this.getFixedAsset();
            }
        );
    }

    getDepreciationDetails(fixedAsset) : void{

    }
}
