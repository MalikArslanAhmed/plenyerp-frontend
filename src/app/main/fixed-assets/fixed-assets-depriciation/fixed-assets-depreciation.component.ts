import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FxaCategoriesService } from '../../../shared/services/fxa-categories.service';
import { MatDialog } from '@angular/material/dialog';
import { FixedAssetReDeploymentComponent } from '../fixed-asset-re-deployment/fixed-asset-re-deployment.component';
import { AssetsDepreciationModalComponent } from './assets-depreciation-modal/assets-depreciation-modal.component';
import { SelectCategoriesModalComponent } from './select-categories-modal/select-categories-modal.component';
import { FxaAssetsService } from 'app/shared/services/fxa-assets.service';
import { CompanyInformationService } from 'app/shared/services/company-information.service';
import * as moment from 'moment';

@Component({
    selector: 'app-fixed-assets-depriciation',
    templateUrl: './fixed-assets-depriciation.component.html',
    styleUrls: ['./fixed-assets-depriciation.component.scss']
})
export class FixedAssetsDepreciationComponent implements OnInit {
    // faCategories = [];
    filterForm: FormGroup;
    selectedFixedAsset = {};
    dialogRef: any;
    fixedAssets = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    assetsForm: FormGroup;
    faCategories: any = [{ id: 0 }];
    fixedAssetId: any;
    fetching = false
    printData: any = [];
    companyData: any = {}

    constructor(
        private fxaCategoryService: FxaCategoriesService,
        private _matDialog: MatDialog,
        private fb: FormBuilder,
        private fxaAssetsService: FxaAssetsService,
        private companyInformationService: CompanyInformationService,

    ) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getCompanyInformation();
        this.getFixedAsset();
    }
    refresh(): void {
        this.assetsForm = this.fb.group({
            fxaCategoryId: [''],
        });

    }
    openFixedAssetCategory(): void {
        this.dialogRef = this._matDialog.open(SelectCategoriesModalComponent, {
            panelClass: 'contact-form-dialog',
            data: {}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.faCategories = response
            this.assetsForm.patchValue({
                fxaCategoryId: response[0].id,
                disabled: true
            });
        });
    }
    getCompanyInformation() {
        this.companyInformationService.getCompaniesInformationList().subscribe(data => {
            this.companyData = data.items[0];
        });
    }
    printPage() {
        this.getDataForPrint()
    }
    getDataForPrint() {
        let params = {
            page: this.pagination.page,
            categoriesAllIds: 0,
            dep_month: 12,
            print: true
        };

        this.fetching = true
        this.fxaAssetsService.fixedAssetsReport(params).subscribe(
            data => {
                this.printData = data.map(item => {
                    return {
                        ...item,
                        acquisitionCost: +item['acquisitionCost'],
                        beginAccumDepr: +item['beginAccumDepr'],
                        currYrDepr: +item['currYrDepr'],
                    }
                })
                this.print()
            }
        );
    }
    print() {
        const WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes'
        );
        const htmlData = `<html><head>
             <style>
                table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
                }

                td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
                }

                tr:nth-child(even) {
                background-color: #dddddd;
                }
                .print-table-header{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                }
            </style>
        
            </head><body>
                    <div class="print-table-header">
                        <div>
                            <h1>Assets Depreciation Logs</h1>
                            <h1>${this.companyData.name}</h1>
                        </div>
                        <div>
                            <p><b>Category:</b> All Categories</p>
                            <p><b>Report Period:</b> December - ${moment().year()}</p>
                        </div>
                    </div>
                    <table>
                        <tr>
                            <th>S.No</th>
                            <th>Asset Number</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Asset Acquisition Cost</th>
                            <th>Total Depreciation</th>
                            <th>Current Book Value</th>
                        </tr>
                        ${this.getAllRowsData()}
                    </table>
                    </body></html>`;

        WindowObject.document.writeln(htmlData);
        WindowObject.document.close();
        WindowObject.focus();
        WindowObject.print()
        setTimeout(() => {
            WindowObject.close();
        }, 0.5);
    };
    getAllRowsData() {
        let rowDataString = ''
        this.printData.forEach((item, index) => {
            rowDataString += `<tr>
            <td>${index + 1}</td>
            <td>${item.assetNo}</td>
            <td>${item.title}</td>
            <td>${item.category}</td>
            <td>${item.acquisitionCost}</td>
            <td>${item.beginAccumDepr + item.currYrDepr}</td>
            <td>${(item.acquisitionCost - (item.beginAccumDepr + item.currYrDepr))}</td>
            </tr>`
        });
        return rowDataString
    }
    getFixedAsset(): void {
        let params = {
            page: this.pagination.page,
            categoriesAllIds: this.faCategories[0].id,
            dep_month: 12
        };
        this.fetching = true
        this.fxaAssetsService.fixedAssetsReport(params).subscribe(
            data => {
                this.fixedAssets = data.data.map(item => {
                    return {
                        ...item,
                        acquisitionCost: +item['acquisitionCost'],
                        beginAccumDepr: +item['beginAccumDepr'],
                        currYrDepr: +item['currYrDepr'],
                    }
                });
                this.pagination.page = data.currentPage;
                this.pagination.total = data.total;
                this.fetching = false
            }
        );
    }

    onPageChange(page): void {
        this.pagination.page = page.pageIndex + 1;
        this.getFixedAsset();
    }


    openDeprecateModal(): void {
        this.dialogRef = this._matDialog.open(AssetsDepreciationModalComponent, {
            panelClass: 'contact-form-dialog',
            data: {}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            console.log(response)
        });
    }
    getDepreciationDetails(fixedAsset): void {

    }
}
