import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {RegisterComponent} from './register/register.component';
import {AuthenticationComponent} from './authentication.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FuseDirectivesModule} from '../../../@fuse/directives/directives';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';

@NgModule({
    declarations: [
        AuthenticationComponent,
        RegisterComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        FlexLayoutModule,
        FuseDirectivesModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule
    ]
})
export class AuthenticationModule {
}
