import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FxaCategoriesService} from '../../../shared/services/fxa-categories.service';
import {fuseAnimations} from '../../../../@fuse/animations';
import {MatDialog} from '@angular/material/dialog';
import {FixedAssetReDeploymentComponent} from '../fixed-asset-re-deployment/fixed-asset-re-deployment.component';

@Component({
    selector: 'app-fixed-asset-deployment',
    templateUrl: './fixed-asset-deployment.component.html',
    styleUrls: ['./fixed-asset-deployment.component.scss'],
    animations: fuseAnimations
})
export class FixedAssetDeploymentComponent implements OnInit {
    filterTrialBalanceReportForm: FormGroup;
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

    getDeployments(fixedAsset): void {
        this.fxaCategoryService.getFixedAssetDeployments(fixedAsset.id, {}).subscribe(
            data => {
                fixedAsset['children'] = data.items;
            }
        );
    }

    deploy(fixedAsset): void {
        this.dialogRef = this._matDialog.open(FixedAssetReDeploymentComponent, {
            minWidth: 1200,
            panelClass: 'contact-form-dialog',
            data: {fixedAsset: fixedAsset.latestDeployment}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
        });
    }

}
