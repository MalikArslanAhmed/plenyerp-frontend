import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructureService} from '../../../../shared/services/structure.service';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../shared/services/alert.service';
import {FxaCategoriesService} from '../../../../shared/services/fxa-categories.service';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CreateCategoryComponent implements OnInit {
    categoryForm: FormGroup;
    selectedCategoryId: any;

    constructor(private structureService: StructureService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog,
                private fb: FormBuilder,
                private fxaCategoryService: FxaCategoriesService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.refresh();
    }


    refresh(): void {
        this.categoryForm = this.fb.group({
            title: ['', Validators.required],
            depreciationRate: [''],
            depreciationMethod: [''],
            assetNoPrefixLine: ['']
        });
    }

    saveCategories(): void {
        this.fxaCategoryService.saveCategories(this.categoryForm.value).subscribe(
            data => {
                this.router.navigateByUrl('dashboard/fixed-assets-categories');
            }
        );
    }

    updateCategories(): void {
        this.fxaCategoryService.updateCategories(this.selectedCategoryId, this.categoryForm.value).subscribe(
            data => {
                this.router.navigateByUrl('dashboard/fixed-assets-categories');
            }
        );
    }

}
