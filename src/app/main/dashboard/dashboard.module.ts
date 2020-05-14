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
import {EmployeesComponent} from './employees/employees.component';
import {EmployeeAddComponent} from './employees/employee-add/employee-add.component';
import {EmployeeListComponent} from './employees/employee-list/employee-list.component';
import {AdminSegmentsComponent} from './admin-segments/admin-segments.component';
import {SegmentsListComponent} from './admin-segments/segments-list/segments-list.component';
import {SegmentDetailsComponent} from './admin-segments/segment-details/segment-details.component';
import {AddCreateAdminSegmentsComponent} from './admin-segments/add-create-admin-segments/add-create-admin-segments.component';
import {EditSegmentListComponent} from './admin-segments/edit-segment-list/edit-segment-list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatOptionModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {StructureComponent} from './structure/structure.component';
import {DepartmentsComponent} from './departments/departments.component';
import {CountryCreateComponent} from './contact-info/country/country-create/country-create.component';
import {CountryListComponent} from './contact-info/country/country-list/country-list.component';
import {CountryComponent} from './contact-info/country/country.component';
import {RegionComponent} from './contact-info/region/region.component';
import {RegionCreateComponent} from './contact-info/region/region-create/region-create.component';
import {RegionListComponent} from './contact-info/region/region-list/region-list.component';
import {StatesComponent} from './contact-info/states/states.component';
import {StatesCreateComponent} from './contact-info/states/states-create/states-create.component';
import {StatesListComponent} from './contact-info/states/states-list/states-list.component';
import {LgaComponent} from './contact-info/lga/lga.component';
import {LgaCreateComponent} from './contact-info/lga/lga-create/lga-create.component';
import {LgaListComponent} from './contact-info/lga/lga-list/lga-list.component';
import {MatSelectModule} from '@angular/material/select';
import {LeaveTypeComponent} from './holidays/leave-type/leave-type.component';
import {LeaveTypeCreateComponent} from './holidays/leave-type/leave-type-create/leave-type-create.component';
import {LeaveTypeListComponent} from './holidays/leave-type/leave-type-list/leave-type-list.component';
import {LeaveGroupComponent} from './holidays/leave- group/leave-group.component';
import {LeaveGroupCreateComponent} from './holidays/leave- group/leave-group-create/leave-group-create.component';
import {LeaveGroupListComponent} from './holidays/leave- group/leave-group-list/leave-group-list.component';
import {PublicHolidayCreateComponent} from './holidays/public-holidays/public-holiday-create/public-holiday-create.component';
import {PublicHolidaysComponent} from './holidays/public-holidays/public-holidays.component';
import {PublicHolidayListComponent} from './holidays/public-holidays/public-holiday-list/public-holiday-list.component';
import {DesignationComponent} from './designation/designation.component';
import {DesignationCreateComponent} from './designation/designation-create/designation-create.component';
import {DesignationListComponent} from './designation/designation-list/designation-list.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {PasswordUpdateComponent} from './user-profile/password-update/password-update.component.';
import { ManagersComponent } from './managers/managers.component';
import { ManagersListComponent } from './managers/managers-list/managers-list.component';
import { ManagersCreateComponent } from './managers/managers-create/managers-create.component';
import { RolesComponent } from './managers/roles/roles.component';
import { RolesListComponent } from './managers/roles/roles-list/roles-list.component';
import { RolesCreateComponent } from './managers/roles/roles-create/roles-create.component';

import { MaterialFileInputModule } from 'ngx-material-file-input';
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
        StepLevelCreateComponent,
        EmployeesComponent,
        EmployeeAddComponent,
        EmployeeListComponent,
        StepLevelCreateComponent,
        AdminSegmentsComponent,
        SegmentsListComponent,
        SegmentDetailsComponent,
        AddCreateAdminSegmentsComponent,
        EditSegmentListComponent,
        StructureComponent,
        DepartmentsComponent,
        EmployeeListComponent,
        CountryComponent,
        CountryCreateComponent,
        CountryListComponent,
        RegionComponent,
        RegionCreateComponent,
        RegionListComponent,
        StatesComponent,
        StatesCreateComponent,
        StatesListComponent,
        LgaComponent,
        LgaCreateComponent,
        LgaListComponent,
        LeaveTypeComponent,
        LeaveTypeCreateComponent,
        LeaveTypeListComponent,
        LeaveGroupComponent,
        LeaveGroupCreateComponent,
        LeaveGroupListComponent,
        PublicHolidayCreateComponent,
        PublicHolidaysComponent,
        PublicHolidayListComponent,
        DesignationComponent,
        DesignationCreateComponent,
        DesignationListComponent,
        UserProfileComponent,
        PasswordUpdateComponent,
        ManagersComponent,
        ManagersListComponent,
        ManagersCreateComponent,
        RolesComponent,
        RolesListComponent,
        RolesCreateComponent


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
        MatTabsModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        MatOptionModule,
        MatRadioModule,
        MaterialFileInputModule
    ]
})
export class DashboardModule {
}
