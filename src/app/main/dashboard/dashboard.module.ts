import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {QualificationComponent} from './qualification/qualification.component';
import {SkillsComponent} from './skills/skills.component';
import {FuseSharedModule} from "../../../@fuse/shared.module";
import {QualificationListComponent} from './qualification/qualification-list/qualification-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {_MatMenuDirectivesModule, MatMenuModule} from "@angular/material/menu";
import {QualificationCreateComponent} from './qualification/qualification-create/qualification-create.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SkillCreateComponent} from './skills/skill-create/skill-create.component';
import {SkillListComponent} from './skills/skill-list/skill-list.component';
import {WorkLocationsComponent} from './work-locations/work-locations.component';
import {MatTreeModule} from "@angular/material/tree";
import {UpdateWorkLocationsComponent} from './work-locations/update-work-locations/update-work-locations.component';
import {LanguagesComponent} from './languages/languages.component';
import {LanguageCreateComponent} from './languages/language-create/language-create.component';
import {LanguageListComponent} from './languages/language-list/language-list.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {ScheduleCreateComponent} from './schedule/schedule-create/schedule-create.component';
import {ScheduleListComponent} from './schedule/schedule-list/schedule-list.component';
import {AcademicMajorComponent} from './academic-major/academic-major.component';
import {AcdemicMajorCreateComponent} from './academic-major/acdemic-major-create/acdemic-major-create.component';
import {AcdemicMajorListComponent} from './academic-major/acdemic-major-list/acdemic-major-list.component';
import { RelationshipComponent } from './relationship/relationship.component';
import { RelationshipCreateComponent } from './relationship/relationship-create/relationship-create.component';
import { RelationshipListComponent } from './relationship/relationship-list/relationship-list.component';

@NgModule({
    declarations: [
        DashboardComponent,
        QualificationComponent,
        SkillsComponent,
        QualificationListComponent,
        QualificationCreateComponent,
        SkillCreateComponent,
        SkillListComponent,
        WorkLocationsComponent,
        UpdateWorkLocationsComponent,
        LanguagesComponent,
        LanguageCreateComponent,
        LanguageListComponent,
        ScheduleComponent,
        ScheduleCreateComponent,
        ScheduleListComponent,
        AcademicMajorComponent,
        AcdemicMajorCreateComponent,
        AcdemicMajorListComponent,
        RelationshipComponent,
        RelationshipCreateComponent,
        RelationshipListComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FuseSharedModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        _MatMenuDirectivesModule,
        MatMenuModule,
        MatToolbarModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatTreeModule
    ]
})
export class DashboardModule {
}
