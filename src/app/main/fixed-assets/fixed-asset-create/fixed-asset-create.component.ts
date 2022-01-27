import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructureService} from '../../../shared/services/structure.service';
import {FuseSidebarService} from '../../../../@fuse/components/sidebar/sidebar.service';
import {MatDialog} from '@angular/material/dialog';
import {FxaCategoriesService} from '../../../shared/services/fxa-categories.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';
import {SummaryAdminSegmentSelectComponent} from '../../dashboard/summary-admin-segment-select/summary-admin-segment-select.component';
import {ProgrammingSegmentSelectComponent} from '../../dashboard/journal-voucher/programming-segment-select/programming-segment-select.component';
import {FunctionalSegmentSelectComponent} from '../../dashboard/journal-voucher/functional-segment-select/functional-segment-select.component';
import {EconomicSegmentSelectComponent} from '../../dashboard/journal-voucher/economic-segment-select/economic-segment-select.component';
import {FundSegmentSelectComponent} from '../../dashboard/journal-voucher/fund-segment-select/fund-segment-select.component';
import {GeoCodeSegmentSelectComponent} from '../../dashboard/journal-voucher/geo-code-segment-select/geo-code-segment-select.component';
import * as moment from 'moment';
import {AdminSegmentEmployeeSelectComponent} from '../../dashboard/treasure-report/default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component';
import {FixedAssetCategorySelectComponent} from '../fixed-asset-category-select/fixed-asset-category-select.component';
import {WorkLocationsListSelectComponent} from '../../dashboard/employees/work-locations-list-select/work-locations-list-select.component';

@Component({
    selector: 'app-create-fixed-assets',
    templateUrl: './fixed-asset-create.component.html',
    styleUrls: ['./fixed-asset-create.component.scss']
})
export class FixedAssetCreateComponent implements OnInit {
    fixedAssetId: any;
    assetsForm: FormGroup;
    dialogRef: any;
    faCategories = [];
    faDepreciations = [];
    faLocations = [];
    faStatuses = [];
    adminSegments = [];
    deploymentAdminSegments = [];
    economicSegments = [];
    programmeSegments = [];
    functionSegments = [];
    fundSegmentsAddDet = [];
    geoCodeSegments = [];
    custodians = [];
    workLocations = [];
    todayDate = moment();
    maxManufactureDate = moment();

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
            fxaDepreciationMethodId: [''],
            fxaCategoryId: [''],
            assetNo: ['', Validators.required],
            title: ['', Validators.required],
            make: ['', Validators.required],
            model: ['', Validators.required],
            dateManufactured: [''],
            dateAcquired: [''],
            modelNo: [''],
            oemSerialNo: ['', Validators.required],
            oemBarCodeNo: ['', Validators.required],
            acquisitionCost: ['', Validators.required],
            nmrlLocation: [''],
            supplierInvoice: [''],
            supplierName: [''],
            supplierContact: ['', Validators.required],
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
            custodian: [''],

            isInstalled: [false],
            isCommissioned: [false],
            isDateCommissioned: [false],

            depreciationRate: [''],
            depreciationMethod: [''],
            assetNoPrefixLine: [''],

            // quantity: [{value: 1, disabled: true}],
            salvageValue: ['', Validators.required],
            expectedLife: ['', Validators.required],
            beginAccumDepr: ['', Validators.required],

            valueDate: [''],
            custodianId: [''],
            locationId: [''],
            deploymentRemark: [{value: '', disabled: this.fixedAssetId}],
            deploymentAdminSegmentId: [''],
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
            fxaDepreciationMethodId: updatedData.fxaDepreciationMethodId,
            fxaCategoryId: updatedData.fxaCategoryId,
            assetNo: updatedData.assetNo,
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
            remark: updatedData.remark,
            salvageValue: updatedData.salvageValue,
            expectedLife: updatedData.expectedLife,
            beginAccumDepr: updatedData.beginAccumDepr,

            depreciationRate: '',
            depreciationMethod: '',
            assetNoPrefixLine: '',
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
            name: (updatedData && updatedData['programSegment']) ? updatedData['programSegment'].name : '',
            id: (updatedData && updatedData['programSegment']) ? updatedData['programSegment'].id : '',
        }];
        this.functionSegments = [{
            name: (updatedData && updatedData['functionalSegment']) ? updatedData['functionalSegment'].name : '',
            id: (updatedData && updatedData['functionalSegment']) ? updatedData['functionalSegment'].id : '',
        }];
        this.fundSegmentsAddDet = [{
            name: (updatedData && updatedData['fundSegment']) ? updatedData['fundSegment'].name : '',
            id: (updatedData && updatedData['fundSegment']) ? updatedData['fundSegment'].id : '',
        }];
        this.geoCodeSegments = [{
            name: (updatedData && updatedData['geoCodeSegment']) ? updatedData['geoCodeSegment'].name : '',
            id: (updatedData && updatedData['geoCodeSegment']) ? updatedData['geoCodeSegment'].id : '',
        }];
        this.faCategories = [{
            title: (updatedData && updatedData['category']) ? updatedData['category'].title : '',
            id: (updatedData && updatedData['category']) ? updatedData['category'].id : '',
        }];

        if (updatedData['latestDeployment']) {
            this.assetsForm.patchValue({
                valueDate: updatedData.latestDeployment.valueDate,
                custodianId: updatedData.latestDeployment.custodianId,
                locationId: updatedData.latestDeployment.locationId,
                deploymentRemark: updatedData.latestDeployment.remark,
                deploymentAdminSegmentId: updatedData.latestDeployment.adminSegmentId,
            });
            this.deploymentAdminSegments = [{
                name: (updatedData['latestDeployment']['adminSegment']) ? updatedData['latestDeployment']['adminSegment'].name : '',
                id: (updatedData['latestDeployment']['adminSegment']) ? updatedData['latestDeployment']['adminSegment'].id : '',
            }];

            this.workLocations = [{
                name: (updatedData['latestDeployment']['workLocation']) ? updatedData['latestDeployment']['workLocation'].name : '',
                id: (updatedData['latestDeployment']['workLocation']) ? updatedData['latestDeployment']['workLocation'].id : '',
            }];

            this.custodians = [{
                // tslint:disable-next-line:max-line-length
                name: (updatedData['latestDeployment']['custodian']) ? updatedData['latestDeployment']['custodian'].firstName + ' ' + updatedData['latestDeployment']['custodian'].lastName : '',
                id: (updatedData['latestDeployment']['custodian']) ? updatedData['latestDeployment']['custodian'].id : '',
            }];
        }
    }

    onDateAcquiredChange(event): void {
        if (event.value) {
            this.maxManufactureDate = event.value;
        } else {
            this.maxManufactureDate = this.todayDate;
        }
    }

    parseFormData(reqData): any {
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
        if (reqData.valueDate) {
            reqData['valueDate'] = moment(reqData.valueDate).format('YYYY-MM-DD');
        }
        return reqData;
    }

    saveFixedAssets(): void {
        const reqData = this.parseFormData(this.assetsForm.value);

        this.fxaCategoryService.add(reqData).subscribe(
            data => {
                this.router.navigateByUrl(`/fixed-assets/list`);
            }
        );
    }

    updateFixedAssets(): void {
        const reqData = this.parseFormData(this.assetsForm.value);
        this.fxaCategoryService.update(this.fixedAssetId, reqData).subscribe(
            data => {
                this.faStatuses = data.items;
                this.router.navigateByUrl(`/fixed-assets/list`);
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
        // restrict on edit
        if (this.fixedAssetId) {
            return;
        }
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
            this.custodians = [{
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
                fxaCategoryId: response.id,
                disabled: true
            });
        });
    }

    workLocationListSelect(): void {
        // restrict on edit
        if (this.fixedAssetId) {
            return;
        }
        this.dialogRef = this._matDialog.open(WorkLocationsListSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.workLocations = [{
                name: response.name,
                id: response.id
            }];
            this.assetsForm.patchValue({
                locationId: response.id,
                disabled: true
            });
        });
    }

    deploymentAdminSegmentSelect(): void {
        // restrict on edit
        if (this.fixedAssetId) {
            return;
        }
        const data = {};
        if (this.assetsForm.value.adminSegmentId) {
            data['segmentId'] = this.assetsForm.value.adminSegmentId;
        }
        this.dialogRef = this._matDialog.open(SummaryAdminSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
            data
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.deploymentAdminSegments = [{
                name: response.name,
                id: response.id
            }];
            this.assetsForm.patchValue({
                deploymentAdminSegmentId: response.id,
                disabled: true
            });
        });
    }
}
