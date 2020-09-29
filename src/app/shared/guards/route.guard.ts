import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  permission: [];
  constructor(private globalService: GlobalService,private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("next",next)
    
    let hasPermission = false;

    if (next && next.data && next.data.permissions && next.data.permissions.length) {
      this.permission = next.data.permissions;
    }
    console.log('glob',this.globalService.getSelf())
    //console.log('glob1',this.globalService.getSelf().roles[0].permissions)
    //console.log("per",this.permission);

    for (let i = 0; i < this.globalService.getSelf().permissions.length; i++) {
      if (this.permission && this.permission.length) {
        for (let j = 0; j < this.permission.length; j++) {
          if (this.globalService.getSelf().permissions[i].id === this.permission[j] || this.globalService.getSelf().permissions[i].entityName === this.permission[j]) {
            hasPermission = true;
            break;
          }
        }
      }
    }
    return true;
  //   if (hasPermission) {
  //     return true;
  //   }

  //  // this.router.navigateByUrl('auth/login');
  //   return false;
  
  }
  
}
