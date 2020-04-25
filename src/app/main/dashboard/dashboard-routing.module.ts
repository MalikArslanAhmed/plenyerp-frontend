import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {QualificationComponent} from "./qualification/qualification.component";
import {SkillsComponent} from "./skills/skills.component";
import {WorkLocationsComponent} from "./work-locations/work-locations.component";
import {LanguagesComponent} from "./languages/languages.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {AcademicMajorComponent} from "./academic-major/academic-major.component";
import {RelationshipComponent} from "./relationship/relationship.component";
import {CategoriesComponent} from "./categories/categories.component";
import {StatusComponent} from "./status/status.component";
import {DisengagementComponent} from "./disengagement/disengagement.component";
import {CensuresComponent} from "./censures/censures.component";

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
    },
    {
        path: 'work-locations',
        component: WorkLocationsComponent,
        data: {
            title: 'Work Locations'
        },
    },
    {
        path: 'languages',
        component: LanguagesComponent,
        data: {
            title: 'Languages'
        },
    },
    {
        path: 'schedule',
        component: ScheduleComponent,
        data: {
            title: 'Schedule'
        },
    },
    {
        path: 'academic-major',
        component: AcademicMajorComponent,
        data: {
            title: 'Academic Major'
        },
    },
    {
        path: 'relationship',
        component: RelationshipComponent,
        data: {
            title: 'Relationship'
        },
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        data: {
            title: 'Categories'
        },
    },
    {
        path: 'status',
        component: StatusComponent,
        data: {
            title: 'Status'
        },
    },
    {
        path: 'disengagement',
        component: DisengagementComponent,
        data: {
            title: 'Disengagement'
        },
    },
    {
        path: 'censures',
        component: CensuresComponent,
        data: {
            title: 'Censures'
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
