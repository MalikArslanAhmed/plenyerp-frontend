import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructureService} from '../../../../shared/services/structure.service';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {SalaryScalesService} from '../../../../shared/services/salary-scales.service';
import {SkillService} from '../../../../shared/services/skill.service';
import {EmployeeService} from '../../../../shared/services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../shared/services/alert.service';
import {CompaniesService} from '../../../../shared/services/companies.service';
import {FxaCategoriesService} from '../../../../shared/services/fxa-categories.service';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CreateCategoryComponent implements OnInit {

    constructor(private structureService: StructureService,
                private _fuseSidebarService: FuseSidebarService,
                private _matDialog: MatDialog,
                private fb: FormBuilder,
                private fxaCategoryService: FxaCategoriesService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private alertService: AlertService) {
    }

    categoryForm: FormGroup;
    selectedCategoryId: any;

    ngOnInit(): void {
        this.refresh();
    }


    refresh() {
        this.categoryForm = this.fb.group({
            title: ['', Validators.required],
            depreciationRate: ['', Validators.required],
            depreciationMethod: ['', Validators.required],
            assetNoPrefixLine: ['', Validators.required]
        });

    }

    saveCategories() {

    }

    updateCategories() {

    }

}
