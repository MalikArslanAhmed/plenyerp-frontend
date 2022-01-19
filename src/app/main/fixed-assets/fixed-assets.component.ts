import {Component, OnInit} from '@angular/core';
import {FuseSidebarService} from '../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {PermissionConstant} from '../../shared/constants/permission-constant';
import {Router} from '@angular/router';

@Component({
    selector: 'app-fixed-assets',
    templateUrl: './fixed-assets.component.html',
    styleUrls: ['./fixed-assets.component.scss']
})
export class FixedAssetsComponent implements OnInit {

    constructor(private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog,
                private router: Router,
                private fb: FormBuilder) {
    }

    dialogRef: any;
    permissionAddJV = [PermissionConstant.ADD_GL_JV];

    ngOnInit(): void {
    }


    addFixedAssets(): void {
        this.router.navigateByUrl(`/fixed-assets/create`);
    }
}
