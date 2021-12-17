import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructureService} from '../../../../shared/services/structure.service';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FxaCategoriesService} from '../../../../shared/services/fxa-categories.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../shared/services/alert.service';

@Component({
    selector: 'app-create-fixed-assets',
    templateUrl: './create-fixed-assets.component.html',
    styleUrls: ['./create-fixed-assets.component.scss']
})
export class CreateFixedAssetsComponent implements OnInit {

    selectedCategoryId: any;
    assetsForm: FormGroup;

    constructor(
        private structureService: StructureService,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private fb: FormBuilder,
        private fxaCategoryService: FxaCategoriesService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService
    ) {

    }


    refresh() {
        this.assetsForm = this.fb.group({
            title: ['', Validators.required],
            depreciationRate: ['', Validators.required],
            depreciationMethod: ['', Validators.required],
            assetNoPrefixLine: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.refresh();
    }


    saveCategories() {

    }

    updateCategories() {

    }
}
