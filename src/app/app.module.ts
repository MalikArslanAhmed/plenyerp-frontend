import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import {SampleModule} from 'app/main/sample/sample.module';
import {AuthService} from "./shared/services/auth.service";
import { GlobalService } from './shared/services/global.service';
import {AppUrl} from "./shared/constants/app-url";
import {AlertService} from "./shared/services/alert.service";
import {SnotifyModule, SnotifyService, ToastDefaults} from "ng-snotify";
import {HtpInterceptor} from "./shared/services/interceptor.service";
// import {DashboardModule} from './main/dashboard/dashboard.module';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./main/authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path: '**',
        redirectTo: 'sample'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        SnotifyModule
    ],
    providers: [
        AuthService,
        GlobalService,
        AppUrl,
        AlertService,
        {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
        SnotifyService,
        HtpInterceptor
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
