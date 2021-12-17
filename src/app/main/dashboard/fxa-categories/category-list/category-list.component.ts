import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PermissionConstant} from 'app/shared/constants/permission-constant';
import {AlertService} from '../../../../shared/services/alert.service';
import {DeleteListModalComponent} from '../../delete-list-modal/delete-list-modal.component';
import * as moment from 'moment';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CategoryListComponent implements OnInit {

    categories = [];

    constructor() {
    }

    ngOnInit(): void {
    }


}
