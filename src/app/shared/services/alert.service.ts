import {Injectable} from '@angular/core';
import {SnotifyPosition, SnotifyService, SnotifyToastConfig} from 'ng-snotify';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    showErrors(error: any) {
        if (typeof error === 'string') {
            this.popToaster('error', 'Error', error);
        } else if (error) {
            error.forEach(e => {
                this.popToaster('error', e.keyName ? e.keyName : e.title, e.description);
            });
        }
    }

    getConfig(): SnotifyToastConfig {
        this.snotifyService.setDefaults({
            global: {
                newOnTop: true,
                maxAtPosition: 6,
                maxOnScreen: 3,
            }
        });
        return {
            bodyMaxLength: 30,
            titleMaxLength: 15,
            backdrop: -1,
            position: SnotifyPosition.centerBottom,
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true
        };
    }

    popToaster(type, title = 'Error', message) {
        switch (type) {
            case 'info':
                this.snotifyService.info(message, title);
                break;
            case 'error':
                this.snotifyService.error(message, title);
                break;
            case 'success':
                this.snotifyService.success(message, title);
                break;
        }
    }

    constructor(private snotifyService: SnotifyService) {

    }

    showSuccess(param: { title: string; message: string }) {
        this.popToaster('success', param.title, param.message);
    }
}
