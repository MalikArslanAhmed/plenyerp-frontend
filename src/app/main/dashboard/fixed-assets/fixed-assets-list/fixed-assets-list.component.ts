import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'app-fixed-assets-list',
    templateUrl: './fixed-assets-list.component.html',
    styleUrls: ['./fixed-assets-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FixedAssetsListComponent implements OnInit {


    fixedAssets= [];
    constructor() {
    }

    ngOnInit(): void {
    }

}
