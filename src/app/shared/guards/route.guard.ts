import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {GlobalService} from '../services/global.service';

@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {
    permission: [];

    constructor(private globalService: GlobalService, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        let hasPermission = false;

        if (next && next.data && next.data.permissions && next.data.permissions.length) {
            this.permission = next.data.permissions;
        }

        const userPermissions = this.globalService.getSelf().permissions;
        for (const i in userPermissions) {
            if (userPermissions.hasOwnProperty(i) && this.permission && this.permission.length) {
                for (const j in this.permission) {
                    if (this.permission.hasOwnProperty(j) && userPermissions[i].id === this.permission[j] || userPermissions[i].entityName === this.permission[j]) {
                        hasPermission = true;
                        break;
                    }
                }
            }
        }
        return true;
        /*if (hasPermission) {
            return true;
        }

        this.router.navigateByUrl('auth/login');
        return false;*/
    }

}
