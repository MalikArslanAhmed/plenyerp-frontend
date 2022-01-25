import {Component, Inject, OnInit} from '@angular/core';
import {SummaryAdminSegmentSelectComponent} from '../../dashboard/summary-admin-segment-select/summary-admin-segment-select.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminSegmentEmployeeSelectComponent} from '../../dashboard/treasure-report/default-setting-voucher-info/admin-segment-employee-select/admin-segment-employee-select.component';
import {WorkLocationsListSelectComponent} from '../../dashboard/employees/work-locations-list-select/work-locations-list-select.component';
import {FxaCategoriesService} from '../../../shared/services/fxa-categories.service';
import * as moment from 'moment';

@Component({
    selector: 'app-fixed-asset-re-deployment',
    templateUrl: './fixed-asset-re-deployment.component.html',
    styleUrls: ['./fixed-asset-re-deployment.component.scss']
})
export class FixedAssetReDeploymentComponent implements OnInit {
    dialogRef: any;
    deploymentForm: FormGroup;
    custodians = [];
    workLocations = [];
    adminSegments = [];
    todayDate = moment();

    constructor(private fb: FormBuilder,
                private fxaCategoryService: FxaCategoriesService,
                public matDialogRef: MatDialogRef<FixedAssetReDeploymentComponent>,
                private _matDialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) private _data: any) {
    }

    ngOnInit(): void {
        this.initialize();
    }

    initialize(): void {
        this.deploymentForm = this.fb.group({
            valueDate: ['', Validators.required],
            custodianId: ['', Validators.required],
            locationId: ['', Validators.required],
            adminSegmentId: ['', Validators.required],
            remark: [''],
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
            this.custodians = [{
                name: response['empData'].firstName + ' ' + response['empData'].lastName,
                id: response['empData'].id
            }];
            this.deploymentForm.patchValue({
                custodianId: response['empData'].id,
                disabled: true
            });
        });
    }

    workLocationListSelect(): void {
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
            this.deploymentForm.patchValue({
                locationId: response.id,
                disabled: true
            });
        });
    }

    deploymentAdminSegmentSelect(): void {
        this.dialogRef = this._matDialog.open(SummaryAdminSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.adminSegments = [{
                name: response.name,
                id: response.id
            }];
            this.deploymentForm.patchValue({
                adminSegmentId: response.id,
                disabled: true
            });
        });
    }

    save(): void {
        const reqData = {
            fixedAssetIds: this._data.fixedAssetIds,
            ...this.deploymentForm.value
        };

        if (reqData.valueDate) {
            reqData['valueDate'] = moment(reqData.valueDate).format('YYYY-MM-DD');
        }
        this.fxaCategoryService.reDeployments(reqData).subscribe(
            data => {
                this.matDialogRef.close();
            }
        );
    }
}
