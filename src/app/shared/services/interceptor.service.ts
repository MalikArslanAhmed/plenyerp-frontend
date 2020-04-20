import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalService} from './global.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(private globalService: GlobalService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = {'Accept': 'application/json'};
        // console.log('req.headers', req.headers.has('Content-Type'), req.url);
        if (!req.headers.has('Content-Type')) {
            headers['Content-Type'] = 'application/json';
        } else {
            req = req.clone({headers: req.headers.delete('Content-Type')});
        }

        if (this.globalService.getAccessToken()) {
            headers['Authorization'] = 'Bearer ' + this.globalService.getAccessToken();
        }
        const dupReq = req.clone({
            setHeaders: headers
        });
        return <any>next.handle(dupReq);
    }
}

export const HtpInterceptor = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}];
