import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixedAssetsRoutingModule } from './fixed-assets-routing.module';
import { FixedAssetsComponent } from './fixed-assets.component';
import { FixedAssetsListComponent } from './fixed-assets-list/fixed-assets-list.component';
import { FixedAssetCategorySelectComponent } from './fixed-asset-category-select/fixed-asset-category-select.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FixedAssetDeploymentComponent } from './fixed-asset-deployment/fixed-asset-deployment.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { FixedAssetReDeploymentComponent } from './fixed-asset-re-deployment/fixed-asset-re-deployment.component';
import { FixedAssetCategoryListComponent } from './fixed-asset-category-list/fixed-asset-category-list.component';
import { FixedAssetCategoryCreateComponent } from './fixed-asset-category-create/fixed-asset-category-create.component';
import { FixedAssetCreateComponent } from './fixed-asset-create/fixed-asset-create.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FixedAssetsDepreciationComponent } from './fixed-assets-depriciation/fixed-assets-depreciation.component';
import { AssetsDepreciationModalComponent } from './fixed-assets-depriciation/assets-depreciation-modal/assets-depreciation-modal.component';
import { SelectCategoriesModalComponent } from './fixed-assets-depriciation/select-categories-modal/select-categories-modal.component';
import { FixedAssetsReportComponent } from './reports/fixed-assets-report/fixed-assets-report.component';
import { FixedAssetsReportModalComponent } from './reports/fixed-assets-report/fixed-assets-report-modal/fixed-assets-report-modal.component';
import { FixedAssetsDepreciaitonReportComponent } from './reports/fixed-assets-depreciation-report/fixed-assets-depreciation-report.component';
import { FixedAssetsDepreciationReportModalComponent } from './reports/fixed-assets-depreciation-report/fixed-assets-depreciation-report-modal/fixed-assets-depreciation-report-modal.component';
import { FixedAssetsLocationSelectModalComponent } from './reports/fixed-assets-location-select-modal/fixed-assets-location-select-modal.component';


@NgModule({
    declarations: [
        FixedAssetsComponent,
        FixedAssetCreateComponent,
        FixedAssetCategoryListComponent,
        FixedAssetCategoryCreateComponent,
        FixedAssetsListComponent,
        FixedAssetCategorySelectComponent,
        FixedAssetDeploymentComponent,
        FixedAssetReDeploymentComponent,
        FixedAssetsDepreciationComponent,
        AssetsDepreciationModalComponent,
        SelectCategoriesModalComponent,
        FixedAssetsReportComponent,
        FixedAssetsReportModalComponent,
        FixedAssetsDepreciaitonReportComponent,
        FixedAssetsDepreciationReportModalComponent,
        FixedAssetsLocationSelectModalComponent
    ],
    imports: [
        CommonModule,
        FixedAssetsRoutingModule,
        FuseSharedModule,
        SharedModule,
        ReactiveFormsModule,
        MatTableModule,
        MatTreeModule,
        MatGridListModule,
        MatFormFieldModule,
        MatOptionModule,
        MatDatepickerModule,
        MatSelectModule,
        MatIconModule,
        MatPaginatorModule,
        MatButtonModule,
        MatToolbarModule,
        MatDialogModule,
        MatStepperModule,
        MatInputModule,
        MatCardModule,
        MatExpansionModule,
        MatSortModule,
        MatSlideToggleModule,
        MatCheckboxModule
    ]
})
export class FixedAssetsModule {
}
