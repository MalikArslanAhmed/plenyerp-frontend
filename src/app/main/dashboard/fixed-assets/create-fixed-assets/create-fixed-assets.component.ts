import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructureService} from '../../../../shared/services/structure.service';
import {FuseSidebarService} from '../../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FxaCategoriesService} from '../../../../shared/services/fxa-categories.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../shared/services/alert.service';
import {SummaryAdminSegmentSelectComponent} from '../../summary-admin-segment-select/summary-admin-segment-select.component';
import {ProgrammingSegmentSelectComponent} from '../../journal-voucher/programming-segment-select/programming-segment-select.component';
import {FunctionalSegmentSelectComponent} from '../../journal-voucher/functional-segment-select/functional-segment-select.component';
import {EconomicSegmentSelectComponent} from '../../journal-voucher/economic-segment-select/economic-segment-select.component';
import {FundSegmentSelectComponent} from '../../journal-voucher/fund-segment-select/fund-segment-select.component';
import {GeoCodeSegmentSelectComponent} from '../../journal-voucher/geo-code-segment-select/geo-code-segment-select.component';
import * as moment from 'moment';

@Component({
    selector: 'app-create-fixed-assets',
    templateUrl: './create-fixed-assets.component.html',
    styleUrls: ['./create-fixed-assets.component.scss']
})
export class CreateFixedAssetsComponent implements OnInit {
    fixedAssetId: any;
    assetsForm: FormGroup;
    dialogRef: any;
    faCategories = [];
    faDepreciations = [];
    faLocations = [];
    faStatuses = [];
    adminSegments = [];
    economicSegments = [];
    programmeSegments = [];
    functionSegments = [];
    fundSegmentsAddDet = [];
    geoCodeSegments = [];

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

    refresh(): void {
        this.assetsForm = this.fb.group({
            fxaStatusId: [''],
            title: [''],
            custodian: [''],
            make: [''],
            model: [''],
            modelNo: [''],
            oemSerialNo: [''],
            oemBarCodeNo: [''],
            dateManufactured: [''],
            dateAcquired: [''],
            acquisitionCost: [''],
            nmrlLocation: [''],
            SupplierName: [''],
            supplierContact: [''],

            depreciationRate: [''],
            depreciationMethod: [''],
            assetNoPrefixLine: [''],
            adminSegmentId: [''],
            economicSegmentId: [''],
            programmeSegmentId: [''],
            functionalSegmentId: [''],
            geoCodeSegmentId: [''],
            fundSegmentId: [''],
        });
    }

    ngOnInit(): void {
        this.refresh();
        this.getCategories();
        this.getDepreciation();
        this.getStatus();
    }


    getCategories(): void {
        this.fxaCategoryService.getCategories({}).subscribe(
            data => {
                this.faCategories = data.items;
            }
        );
    }

    getDepreciation(): void {
        this.fxaCategoryService.getDepreciation({}).subscribe(
            data => {
                this.faDepreciations = data.items;
            }
        );
    }

    getStatus(): void {
        this.fxaCategoryService.getStatus({}).subscribe(
            data => {
                this.faStatuses = data.items;
            }
        );
    }

    saveFixedAssets(): void {
        const reqData = this.assetsForm.value;
        if (reqData.dateManufactured) {
            reqData['dateManufactured'] = moment(reqData.dateManufactured).format('YYYY-MM-DD');
        }
        if (reqData.dateAcquired) {
            reqData['dateAcquired'] = moment(reqData.dateAcquired).format('YYYY-MM-DD');
        }

        this.fxaCategoryService.add(reqData).subscribe(
            data => {
                this.faStatuses = data.items;
                this.router.navigateByUrl(`/dashboard/fixed-assets`);
            }
        );
    }

    updateFixedAssets(): void {
        this.fxaCategoryService.update(this.fixedAssetId, this.assetsForm.value).subscribe(
            data => {
                this.faStatuses = data.items;
                this.router.navigateByUrl(`/dashboard/fixed-assets`);
            }
        );
    }

    adminSegmentSelect(): void {
        this.dialogRef = this._matDialog.open(SummaryAdminSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.adminSegments = [];
            this.adminSegments = [{
                name: response.name,
                id: response.id
            }];
            this.assetsForm.patchValue({
                adminSegmentId: response.id,
                disabled: true
            });
        });
    }

    programmeSegmentSelect(): void {
        this.dialogRef = this._matDialog.open(ProgrammingSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.programmeSegments = [{name: response.name, id: response.id}];
            this.assetsForm.patchValue({
                programmeSegmentId: response.id,
            });
        });
    }

    functionSegmentSelect(): void {
        this.dialogRef = this._matDialog.open(FunctionalSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.functionSegments = [{name: response.name, id: response.id}];
            this.assetsForm.patchValue({
                functionalSegmentId: response.id,
                disabled: true
            });
        });
    }

    economicSegmentSelect(): void {
        this.dialogRef = this._matDialog.open(EconomicSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.economicSegments = [{name: response.name, id: response.id}];
            this.assetsForm.patchValue({
                economicSegmentId: response.id,
                disabled: true
            });
        });
    }

    fundSegmentSelectAddDetails(): void {
        this.dialogRef = this._matDialog.open(FundSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.fundSegmentsAddDet = [{name: response.name, id: response.id}];
            this.assetsForm.patchValue({
                fundSegmentId: response.id,
                disabled: true
            });
        });
    }

    geoCodeSegmentSelect(): void {
        this.dialogRef = this._matDialog.open(GeoCodeSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.geoCodeSegments = [{name: response.name, id: response.id}];
            this.assetsForm.patchValue({
                geoCodeSegmentId: response.id,
                disabled: true
            });
        });
    }
}
