import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {QualificationComponent} from "./qualification/qualification.component";
import {SkillsComponent} from "./skills/skills.component";

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {
            title: 'Dashboard Home'
        },
    },
    {
        path: 'qualification',
        component: QualificationComponent,
        data: {
            title: 'Qualification'
        },
    },
    {
        path: 'skills',
        component: SkillsComponent,
        data: {
            title: 'Skills'
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
