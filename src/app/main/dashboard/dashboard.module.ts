import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import { QualificationComponent } from './qualification/qualification.component';
import { SkillsComponent } from './skills/skills.component';
import {FuseSharedModule} from "../../../@fuse/shared.module";
import { QualificationListComponent } from './qualification/qualification-list/qualification-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {_MatMenuDirectivesModule, MatMenuModule} from "@angular/material/menu";
import { QualificationCreateComponent } from './qualification/qualification-create/qualification-create.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
    declarations: [DashboardComponent, QualificationComponent, SkillsComponent, QualificationListComponent, QualificationCreateComponent],
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
        MatTooltipModule
    ]
})
export class DashboardModule {
}
