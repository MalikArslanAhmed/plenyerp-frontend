import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FxaCategoriesComponent} from './fxa-categories/fxa-categories.component';
import {CreateCategoryComponent} from './fxa-categories/create-category/create-category.component';
import {FixedAssetsComponent} from './fixed-assets.component';
import {CreateFixedAssetsComponent} from './create-fixed-assets/create-fixed-assets.component';
import {FixedAssetDeploymentComponent} from './fixed-asset-deployment/fixed-asset-deployment.component';

const routes: Routes = [
    {path: '', component: FixedAssetsComponent, data: {title: 'Fixed Assets '}},
    {path: 'deployments', component: FixedAssetDeploymentComponent, data: {title: 'Fixed Assets '}},
    {
        path: 'fixed-assets-categories',
        component: FxaCategoriesComponent,
        data: {
            title: 'Fixed Asset Categories'
        }
    },
    {
        path: 'fxa-categories-create',
        component: CreateCategoryComponent,
        data: {title: 'Fixed Asset Categories Create'}
    },
    {
        path: 'fxa-categories/edit/:id',
        component: CreateCategoryComponent,
        data: {
            title: 'Fixed Asset Categories Update'
        }
    },
    {
        path: 'create',
        component: CreateFixedAssetsComponent,
        data: {
            title: 'Fixed Assets '
        }
    },
    {
        path: ':id',
        component: CreateFixedAssetsComponent,
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
