import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from "rxjs";
import {FuseConfigService} from "../../../../@fuse/services/config.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {Router} from "@angular/router";
import {StorageService} from "../../../shared/services/storage.service";
import {GlobalService} from "../../../shared/services/global.service";
import {AuthService} from "../../../shared/services/auth.service";
import {AppConstants} from "../../../shared/constants/app-constants";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    isBusy = false;
    loginPressed = false;
    loginForm: FormGroup;
    private _unsubscribeAll: Subject<any>;

    constructor(private _fuseConfigService: FuseConfigService,
                private fb: FormBuilder,
                private router: Router,
                private globalService: GlobalService,
                private authService: AuthService) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });
        this.checkLogin();
    }

    checkLogin() {
        if (StorageService.getItem('accessToken') && StorageService.getItem('self')) {
            this.globalService.setAccessToken(StorageService.getItem('accessToken'));
            this.globalService.setSelf(StorageService.getItem('self'));
            let role = StorageService.getItem('self');
            this.navigateToAuthorizePage(role['roles']);
        }
    }

    login() {
        // console.log('loginForm', this.loginForm.value);
        if (this.isBusy) {
            return;
        }
        this.isBusy = true;
        this.loginPressed = true;
        const accessToken = StorageService.getItem('accessToken');
        if (accessToken && accessToken !== 'null') {
            // console.log('here', typeof accessToken);
            this.globalService.setAccessToken(accessToken);
            this.authService.self({all: true}).subscribe((userDetails) => {
                this.isBusy = false;
                this.globalService.setSelf(userDetails);
                // this.router.navigateByUrl('/login-conflict');
                return;
            }, e => {
                this.isBusy = false;
                StorageService.clearAll();
                this.proceedLogin();
            });
        } else {
            this.proceedLogin();
        }
    }

    proceedLogin() {
        this.authService.authenticate(this.loginForm.getRawValue()).subscribe(data => {
            // console.log('data', data);
            this.globalService.setAccessToken(data.token);
            this.authService.self({all: true}).subscribe((userDetails) => {
                // console.log('userDetails', userDetails);
                this.isBusy = false;
                this.globalService.setSelf(userDetails);
                // console.log('user', userDetails);
                this.navigateToAuthorizePage(userDetails.roles);
            }, e => {
                this.isBusy = false;
            });
        }, error => {
            // console.log('error', error);
            this.isBusy = false;
            this.loginPressed = false;
        });
    }

    navigateToAuthorizePage(roles) {
        let roleArr = [];
        if (roles && roles.length > 0) {
            roles.forEach(role => {
                roleArr.push(role.id);
            });
        }
        /*console.log('roles', roles);
        console.log('roleArr', roleArr);*/
        let navUrl = '/dashboard/qualification';

        if (roleArr.includes(AppConstants.ROLE_ID_HR)) {
            navUrl = '/dashboard/employees';
        } else if (roleArr.includes(AppConstants.ROLE_ID_ADMIN)) {
            navUrl = '/dashboard/admin-segments';
        } else if (roleArr.includes(AppConstants.ROLE_ID_INVENTORY)) {
            navUrl = '/dashboard/store-setup-items';
        }

        // const navUrl = '/dashboard/qualification';
        // console.log('navUrl', navUrl);
        this.router.navigateByUrl(navUrl);
    }

    goToRegister() {
        this.router.navigateByUrl(`/auth/register`);
    }
}
