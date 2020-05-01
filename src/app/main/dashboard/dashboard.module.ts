import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {QualificationComponent} from './qualification/qualification.component';
import {SkillsComponent} from './skills/skills.component';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {QualificationListComponent} from './qualification/qualification-list/qualification-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {QualificationCreateComponent} from './qualification/qualification-create/qualification-create.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SkillCreateComponent} from './skills/skill-create/skill-create.component';
import {SkillListComponent} from './skills/skill-list/skill-list.component';
import {WorkLocationsComponent} from './work-locations/work-locations.component';
import {MatTreeModule} from '@angular/material/tree';
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
import {RelationshipComponent} from './relationship/relationship.component';
import {RelationshipCreateComponent} from './relationship/relationship-create/relationship-create.component';
import {RelationshipListComponent} from './relationship/relationship-list/relationship-list.component';
import {CategoriesComponent} from './categories/categories.component';
import {CategoriesListComponent} from './categories/categories-list/categories-list.component';
import {CategoriesCreateComponent} from './categories/categories-create/categories-create.component';
import {StatusComponent} from './status/status.component';
import {StatusListComponent} from './status/status-list/status-list.component';
import {StatusCreateComponent} from './status/status-create/status-create.component';
import {DisengagementComponent} from './disengagement/disengagement.component';
import {DisengagementListComponent} from './disengagement/disengagement-list/disengagement-list.component';
import {DisengagementCreateComponent} from './disengagement/disengagement-create/disengagement-create.component';
import {CensuresComponent} from './censures/censures.component';
import {CensuresListComponent} from './censures/censures-list/censures-list.component';
import {CensuresCreateComponent} from './censures/censures-create/censures-create.component';
import {ArmOfServiceComponent} from './arm-of-service/arm-of-service.component';
import {ArmOfServiceCreateComponent} from './arm-of-service/arm-of-service-create/arm-of-service-create.component';
import {ArmOfServiceListComponent} from './arm-of-service/arm-of-service-list/arm-of-service-list.component';
import {MembershipComponent} from './membership/membership.component';
import {MembershipListComponent} from './membership/membership-list/membership-list.component';
import {MembershipCreateComponent} from './membership/membership-create/membership-create.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {SalaryScalesComponent} from './salary-scales/salary-scales.component';
import {SalaryScalesListComponent} from './salary-scales/salary-scales-list/salary-scales-list.component';
import {SalaryScalesCreateComponent} from './salary-scales/salary-scales-create/salary-scales-create.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {GradeLevelCreateComponent} from './salary-scales/grade-level-create/grade-level-create.component';
import {StepLevelCreateComponent} from './salary-scales/step-level-create/step-level-create.component';

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
        RelationshipListComponent,
        CategoriesComponent,
        CategoriesListComponent,
        CategoriesCreateComponent,
        StatusComponent,
        StatusListComponent,
        StatusCreateComponent,
        DisengagementComponent,
        DisengagementListComponent,
        DisengagementCreateComponent,
        CensuresComponent,
        CensuresListComponent,
        CensuresCreateComponent,
        ArmOfServiceComponent,
        ArmOfServiceCreateComponent,
        ArmOfServiceListComponent,
        MembershipComponent,
        MembershipListComponent,
        MembershipCreateComponent,
        SalaryScalesComponent,
        SalaryScalesListComponent,
        SalaryScalesCreateComponent,
        GradeLevelCreateComponent,
        StepLevelCreateComponent

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
        MatTreeModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatTabsModule
    ]
})
export class DashboardModule {
}
