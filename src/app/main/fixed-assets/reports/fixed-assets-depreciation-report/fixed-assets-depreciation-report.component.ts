import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CompanyInformationService } from 'app/shared/services/company-information.service';
import { FxaAssetsService } from 'app/shared/services/fxa-assets.service';
import { FxaCategoriesService } from 'app/shared/services/fxa-categories.service';
import { StatusService } from 'app/shared/services/status.service';
import { WorkLocationService } from 'app/shared/services/work-location.service';
import { FixedAssetsDepreciationReportModalComponent } from './fixed-assets-depreciation-report-modal/fixed-assets-depreciation-report-modal.component';

@Component({
    selector: 'app-fixed-assets-depreciation-report',
    templateUrl: './fixed-assets-depreciation-report.component.html',
    styleUrls: ['./fixed-assets-depreciation-report.component.scss']
})
export class FixedAssetsDepreciaitonReportComponent implements OnInit {
    displayedColumns = ['id', 'assetNo', 'title', 'acquistionCost', 'depreciation', 'accDepreciaition', 'netBookValue', 'remark'];

    dialogRef: any;
    fixedAssetsReport = [];
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    assetsForm: FormGroup;
    faCategories = '';
    depMonth: number = null;
    fixedAssetId: any;
    fetching = false
    assetNo = ''
    location = ''
    status = ''
    printData: any = [];
    companyData: any = {}
    statusData: any = []
    workLocationsData: any = []
    constructor(
        private fxaCategoryService: FxaCategoriesService,
        private _matDialog: MatDialog,
        private fb: FormBuilder,
        private fxaAssetsService: FxaAssetsService,
        private companyInformationService: CompanyInformationService,
        private workLocationService: WorkLocationService
    ) {
    }
    printPage() {
        this.getDataForPrint()
    }
    ngOnInit(): void {
        this.refresh();
    }
    refresh(): void {
        this.getCompanyInformation();
        this.getStatus();
        this.getWorkLocation();

        this.assetsForm = this.fb.group({
            fxaCategoryId: [''],
        });
    }
    getWorkLocation() {
        this.workLocationService.getWorkLocations({ page: -1 }).subscribe(data => {
            this.workLocationsData = data;
            console.log('work data data', this.workLocationsData);
        });
    }
    getStatus() {
        this.fxaCategoryService.getStatus({ page: -1 }).subscribe(data => {
            this.statusData = data.items;
            console.log('sattus data', this.statusData);

        });
    }
    getCompanyInformation() {
        this.companyInformationService.getCompaniesInformationList().subscribe(data => {
            this.companyData = data.items[0];
            console.log('companyData data', this.companyData);

        });
    }
    getDataForPrint() {
        let params = {
            page: this.pagination.page,
            categoriesAllIds: this.faCategories,
            dep_month: this.depMonth,
            location: this.location,
            assetNo: this.assetNo,
            status: this.status,
            print: true
        };

        this.fetching = true
        this.fxaAssetsService.fixedAssetsReport(params).subscribe(
            data => {
                console.log(data);
                this.printData = data.map(item => {
                    return {
                        ...item,
                        acquisitionCost: +item['acquisitionCost'],
                        beginAccumDepr: +item['beginAccumDepr'],
                        icurrYrDepr: +item['currYrDepr'],
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
            </style>
        
        </head><body>
        <h1>Fixed Assets Report</h1>
        <h1>${this.companyData.name}</h1>
        <table>
  <tr>
    <th>S.No</th>
    <th>Asset No</th>
    <th>Asset Name</th>
    <th>Acquisition Cost</th>
    <th>Depreciation</th>
    <th>Accumulated Depreciation</th>
    <th>ANet Book Value</th>
    <th>Remark</th>
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
            <td>${item.acquisitionCost}</td>
            <td>${item.currYrDepr}</td>
            <td>${item.beginAccumDepr + item.currYrDepr}</td>
            <td>${item.acquisitionCost - (item.beginAccumDepr + item.currYrDepr)}</td>
            <td>${item.remark}</td>
            </tr>`
        });
        return rowDataString
    }
    getFixedAssetReport(): void {
        let params = {
            page: this.pagination.page,
            categoriesAllIds: this.faCategories,
            dep_month: this.depMonth,
            location: this.location,
            assetNo: this.assetNo,
            status: this.status,
        };

        this.fetching = true
        this.fxaAssetsService.fixedAssetsReport(params).subscribe(
            data => {
                this.fixedAssetsReport = data.data.map(item => {
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
        this.getFixedAssetReport();
    }


    openDeprecateModal(): void {
        this.dialogRef = this._matDialog.open(FixedAssetsDepreciationReportModalComponent, {
            panelClass: 'contact-form-dialog',
            data: {}
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.location = ''
            this.assetNo = ''
            this.status = ''
            this.faCategories = response.categoriesAllIds
            this.depMonth = response.dep_month
            this.fixedAssetsReport = response.data.data.map(item => {
                return {
                    ...item,
                    acquisitionCost: +item['acquisitionCost'],
                    beginAccumDepr: +item['beginAccumDepr'],
                    currYrDepr: +item['currYrDepr'],
                }
            });
            this.pagination.page = response.data.currentPage;
            this.pagination.total = response.data.total;
            this.fetching = false
        });
    }

}
