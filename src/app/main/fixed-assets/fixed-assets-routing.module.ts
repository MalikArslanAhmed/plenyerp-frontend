import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FixedAssetsComponent} from './fixed-assets.component';
import {FixedAssetDeploymentComponent} from './fixed-asset-deployment/fixed-asset-deployment.component';
import {FixedAssetCategoryListComponent} from './fixed-asset-category-list/fixed-asset-category-list.component';
import {FixedAssetCategoryCreateComponent} from './fixed-asset-category-create/fixed-asset-category-create.component';
import {FixedAssetCreateComponent} from './fixed-asset-create/fixed-asset-create.component';
import {FixedAssetsDepreciationComponent} from './fixed-assets-depriciation/fixed-assets-depreciation.component';
import { FixedAssetsReportComponent } from './reports/fixed-assets-report/fixed-assets-report.component';

const routes: Routes = [
    {path: 'list', component: FixedAssetsComponent, data: {title: 'Fixed Assets '}},
    {path: 'deployments', component: FixedAssetDeploymentComponent, data: {title: 'Fixed Assets '}},
    {path: 'deprecation', component: FixedAssetsDepreciationComponent, data: {title: 'Fixed Assets '}},
    {path: 'report', component: FixedAssetsReportComponent, data: {title: 'Fixed Assets Report'}},
    {
        path: 'fixed-assets-categories',
        component: FixedAssetCategoryListComponent,
        data: {
            title: 'Fixed Asset Categories'
        }
    },
    {
        path: 'fxa-categories-create',
        component: FixedAssetCategoryCreateComponent,
        data: {title: 'Fixed Asset Categories Create'}
    },
    {
        path: 'fxa-categories/edit/:id',
        component: FixedAssetCategoryCreateComponent,
        data: {
            title: 'Fixed Asset Categories Update'
        }
    },
    {
        path: 'create',
        component: FixedAssetCreateComponent,
        data: {
            title: 'Fixed Assets '
        }
    },
    {
        path: ':id',
        component: FixedAssetCreateComponent,
        data: {
            title: 'Fixed Assets '
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FixedAssetsRoutingModule {
}
