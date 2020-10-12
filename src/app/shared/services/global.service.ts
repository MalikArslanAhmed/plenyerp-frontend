import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import * as moment from 'moment';
// import {StaticEventsService} from './static.event.service';
// import {PubNubAngular} from 'pubnub-angular2';
// import {ROUTES} from '../sidebar/sidebar-routes.config';
import {environment} from '../../../environments/environment';
import { AuthService } from './auth.service';

declare var $: any;

@Injectable()
export class GlobalService {
    public user: BehaviorSubject<any> = new BehaviorSubject(undefined);
    public self: BehaviorSubject<any> = new BehaviorSubject(undefined);
    public accessToken: BehaviorSubject<string> = new BehaviorSubject('');
    // public permissions: BehaviorSubject<string> = new BehaviorSubject(undefined);
    public viewRefresh: BehaviorSubject<string> = new BehaviorSubject(undefined);
    // public reloadSelf: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public isSessionExist: Subject<any> = new Subject();
    // public notification = new BehaviorSubject(undefined);
    // viewRefresh$ = this.viewRefresh.asObservable();
    self$ = this.self.asObservable();

    constructor() {
        if (StorageService.getItem('accessToken')) {
            this.setAccessToken(StorageService.getItem('accessToken'));
        }
        if (StorageService.getItem('self')) {
            this.setSelf(StorageService.getItem('self'));
        }
    }

    setSelf(self): void {
        this.self.next(self);
    }

    getSelf() {
        return this.self.value;
    }

    public setIsSessionExist() {
        this.isSessionExist.next();
    }

    public setAccessToken(item) {
        StorageService.setItem('accessToken', item);
        this.accessToken.next(item);
    }

    public setViewRefresh(value) {
        this.viewRefresh.next(value);
    }

    public getAccessToken() {
        return StorageService.getItem('accessToken');
    }
}