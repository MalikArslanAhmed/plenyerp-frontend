import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
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
import {AdminSegmentEmployeeSelectComponent} from '../../treasure-report/default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component';
import {FixedAssetCategorySelectComponent} from '../fixed-asset-category-select/fixed-asset-category-select.component';

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
    custodian = [];

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

    ngOnInit(): void {
        this.refresh();
        this.getDepreciation();
        this.getStatus();
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
            supplierInvoice: [''],
            supplierName: [''],
            supplierContact: [''],
            dateInstalled: [''],
            dateCommissioned: [''],
            dateDeCommissioned: [''],
            dateDisposed: [''],
            disposalPrice: [''],
            adminSegmentId: [''],
            economicSegmentId: [''],
            programmeSegmentId: [''],
            functionalSegmentId: [''],
            geoCodeSegmentId: [''],
            fundSegmentId: [''],
            remark: [''],

            depreciationRate: [''],
            depreciationMethod: [''],
            assetNoPrefixLine: [''],
            valueDate: [''],
            custodianId: [''],
        });


        this.fixedAssetId = this.activatedRoute.snapshot.params.id;

        if (this.fixedAssetId) {
            this.getDetail();
        }
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

    getDetail(): void {
        this.fxaCategoryService.detail(this.fixedAssetId).subscribe(
            data => {
                this.patchForm(data);
            }
        );
    }

    patchForm(updatedData): void {
        this.assetsForm.patchValue({
            fxaStatusId: updatedData.fxaStatusId,
            title: updatedData.title,
            custodian: updatedData.custodian,
            make: updatedData.make,
            model: updatedData.model,
            modelNo: updatedData.modelNo,
            oemSerialNo: updatedData.oemSerialNo,
            oemBarCodeNo: updatedData.oemBarCodeNo,
            dateManufactured: updatedData.dateManufactured,
            dateAcquired: updatedData.dateAcquired,
            acquisitionCost: updatedData.acquisitionCost,
            nmrlLocation: updatedData.nmrlLocation,
            supplierInvoice: updatedData.supplierInvoice,
            supplierName: updatedData.supplierName,
            supplierContact: updatedData.supplierContact,
            dateInstalled: updatedData.dateInstalled,
            dateCommissioned: updatedData.dateCommissioned,
            dateDeCommissioned: updatedData.dateDeCommissioned,
            dateDisposed: updatedData.dateDisposed,
            disposalPrice: updatedData.disposalPrice,
            adminSegmentId: updatedData.adminSegmentId,
            economicSegmentId: updatedData.economicSegmentId,
            programmeSegmentId: updatedData.programmeSegmentId,
            functionalSegmentId: updatedData.functionalSegmentId,
            geoCodeSegmentId: updatedData.geoCodeSegmentId,
            fundSegmentId: updatedData.fundSegmentId,

            depreciationRate: [''],
            depreciationMethod: [''],
            assetNoPrefixLine: [''],
        });

        this.adminSegments = [{
            name: (updatedData && updatedData['adminSegment']) ? updatedData['adminSegment'].name : '',
            id: (updatedData && updatedData['adminSegment']) ? updatedData['adminSegment'].id : '',
        }];
        this.economicSegments = [{
            name: (updatedData && updatedData['economicSegment']) ? updatedData['economicSegment'].name : '',
            id: (updatedData && updatedData['economicSegment']) ? updatedData['economicSegment'].id : '',
        }];
        this.programmeSegments = [{
            name: (updatedData && updatedData['programmeSegment']) ? updatedData['programmeSegment'].name : '',
            id: (updatedData && updatedData['programmeSegment']) ? updatedData['programmeSegment'].id : '',
        }];
        this.functionSegments = [{
            name: (updatedData && updatedData['functionSegment']) ? updatedData['functionSegment'].name : '',
            id: (updatedData && updatedData['functionSegment']) ? updatedData['functionSegment'].id : '',
        }];
        this.fundSegmentsAddDet = [{
            name: (updatedData && updatedData['fundSegmentsAddDet']) ? updatedData['fundSegmentsAddDet'].name : '',
            id: (updatedData && updatedData['fundSegmentsAddDet']) ? updatedData['fundSegmentsAddDet'].id : '',
        }];
        this.geoCodeSegments = [{
            name: (updatedData && updatedData['geoCodeSegment']) ? updatedData['geoCodeSegment'].name : '',
            id: (updatedData && updatedData['geoCodeSegment']) ? updatedData['geoCodeSegment'].id : '',
        }];
    }

    saveFixedAssets(): void {
        const reqData = this.assetsForm.value;
        if (reqData.dateManufactured) {
            reqData['dateManufactured'] = moment(reqData.dateManufactured).format('YYYY-MM-DD');
        }
        if (reqData.dateAcquired) {
            reqData['dateAcquired'] = moment(reqData.dateAcquired).format('YYYY-MM-DD');
        }
        if (reqData.dateInstalled) {
            reqData['dateInstalled'] = moment(reqData.dateInstalled).format('YYYY-MM-DD');
        }
        if (reqData.dateCommissioned) {
            reqData['dateCommissioned'] = moment(reqData.dateCommissioned).format('YYYY-MM-DD');
        }
        if (reqData.dateDeCommissioned) {
            reqData['dateDeCommissioned'] = moment(reqData.dateDeCommissioned).format('YYYY-MM-DD');
        }
        if (reqData.dateDisposed) {
            reqData['dateDisposed'] = moment(reqData.dateDisposed).format('YYYY-MM-DD');
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

    selectAdminEmployee(type): void {
        const allowType: any = 'BOTH';
        const node: any = undefined;

        this.dialogRef = this._matDialog.open(AdminSegmentEmployeeSelectComponent, {
            panelClass: 'transaction-items-form-dialog',
            data: {head: type, allow: allowType, node: node}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.custodian = [{
                name: response['empData'].firstName + ' ' + response['empData'].lastName,
                id: response['empData'].id
            }];
            this.assetsForm.patchValue({
                custodianId: response['empData'].id,
                disabled: true
            });
        });
    }

    openFixedAssetCategory(): void {
        this.dialogRef = this._matDialog.open(FixedAssetCategorySelectComponent, {
            panelClass: 'contact-form-dialog',
            data: {}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.faCategories = [{
                title: response.title,
                id: response.id
            }];
            this.assetsForm.patchValue({
                assetNoPrefixLine: response.id,
                disabled: true
            });
        });
    }
}
