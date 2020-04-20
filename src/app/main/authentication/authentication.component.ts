import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseConfigService} from '../../../@fuse/services/config.service';
import {fuseAnimations} from '../../../@fuse/animations';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthenticationComponent implements OnInit {
    constructor(private _fuseConfigService: FuseConfigService) {
    }

    ngOnInit(): void {
    }
}
