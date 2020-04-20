import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from "rxjs";
import {FuseConfigService} from "../../../../@fuse/services/config.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fuseAnimations} from "../../../../@fuse/animations";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    private _unsubscribeAll: Subject<any>;

    constructor(private _fuseConfigService: FuseConfigService, private fb: FormBuilder, private router: Router) {
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
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    login() {
        console.log('loginForm', this.loginForm.value);
    }

    goToRegister() {
        this.router.navigateByUrl(`/auth/register`);
    }
}
