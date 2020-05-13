import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {QualificationComponent} from './qualification/qualification.component';
import {SkillsComponent} from './skills/skills.component';
import {WorkLocationsComponent} from './work-locations/work-locations.component';
import {LanguagesComponent} from './languages/languages.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {AcademicMajorComponent} from './academic-major/academic-major.component';
import {RelationshipComponent} from './relationship/relationship.component';
import {CategoriesComponent} from './categories/categories.component';
import {StatusComponent} from './status/status.component';
import {DisengagementComponent} from './disengagement/disengagement.component';
import {CensuresComponent} from './censures/censures.component';
import {ArmOfServiceComponent} from './arm-of-service/arm-of-service.component';
import {MembershipComponent} from './membership/membership.component';
import {SalaryScalesComponent} from './salary-scales/salary-scales.component';
import {AdminSegmentsComponent} from './admin-segments/admin-segments.component';
import {SegmentDetailsComponent} from './admin-segments/segment-details/segment-details.component';
import {EmployeesComponent} from "./employees/employees.component";
import {EmployeeAddComponent} from "./employees/employee-add/employee-add.component";
import {CountryComponent} from './contact-info/country/country.component';
import {RegionComponent} from './contact-info/region/region.component';
import {StatesComponent} from './contact-info/states/states.component';
import {LgaComponent} from './contact-info/lga/lga.component';
import {StructureComponent} from "./structure/structure.component";
import {DepartmentsComponent} from "./departments/departments.component";
import {LeaveTypeComponent} from './holidays/leave-type/leave-type.component';
import {LeaveGroupComponent} from './holidays/leave- group/leave-group.component';
import {PublicHolidaysComponent} from './holidays/public-holidays/public-holidays.component';
import {DesignationListComponent} from './designation/designation-list/designation-list.component';
import {DesignationComponent} from './designation/designation.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import { ManagersComponent } from './managers/managers.component';
import { RolesComponent } from './managers/roles/roles.component';

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
    },
    {
        path: 'arm-of-service',
        component: ArmOfServiceComponent,
        data: {
            title: 'Arm Of Service'
        },
    },
    {
        path: 'membership',
        component: MembershipComponent,
        data: {
            title: 'Membership'
        },
    },
    {
        path: 'salary-scales',
        component: SalaryScalesComponent,
        data: {
            title: 'Salary Scales'
        },
    },
    {
        path: 'grade-level',
        component: SalaryScalesComponent,
        data: {
            title: 'Grade Level'
        },
    },
    {
        path: 'gl-step',
        component: SalaryScalesComponent,
        data: {
            title: 'GL Step'
        },
    },
    {
        path: 'employees',
        component: EmployeesComponent,
        data: {
            title: 'Employees'
        },
    },
    {
        path: 'add-employee',
        component: EmployeeAddComponent,
        data: {
            title: 'Add Employees'
        },
    },
    {
        path: 'admin-segments',
        component: AdminSegmentsComponent,
        data: {
            title: 'Admin Segment'
        },
    },
    {
        path: 'admin-segment-detail/:segmentId',
        component: SegmentDetailsComponent,
        data: {
            title: 'Segment Details'
        },
    },
    {
        path: 'departments',
        component: DepartmentsComponent,
        data: {
            title: 'Departments'
        },
    },
    {
        path: 'structure',
        component: StructureComponent,
        data: {
            title: 'Structure'
        },
    },
    {
        path: 'country',
        component: CountryComponent,
        data: {
            title: 'Country'
        },
    },
    {
        path: 'region',
        component: RegionComponent,
        data: {
            title: 'Region'
        },
    },
    {
        path: 'states',
        component: StatesComponent,
        data: {
            title: 'States'
        },
    },
    {
        path: 'lga',
        component: LgaComponent,
        data: {
            title: 'LGA'
        },
    },
    {
        path: 'leaves-type',
        component: LeaveTypeComponent,
        data: {
            title: 'Type of leaves'
        },
    },
    {
        path: 'leave-group',
        component: LeaveGroupComponent,
        data: {
            title: 'Leave Group'
        },
    },
    {
        path: 'public-holiday',
        component: PublicHolidaysComponent,
        data: {
            title: 'Public Holidays'
        },
    },
    {
        path: 'designation',
        component: DesignationComponent,
        data: {
            title: 'Designations'
        },
    },
    {
        path: 'profile',
        component: UserProfileComponent,
        data: {
            title: 'Profile'
        },
    },
    {
        path: 'managers',
        component: ManagersComponent,
        data: {
            title: 'Managers'
        },
        children: [
            {
                path: 'roles',
                component: RolesComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
