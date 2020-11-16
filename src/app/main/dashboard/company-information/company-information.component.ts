import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CompanyInformationService} from 'app/shared/services/company-information.service';
import {CurrencyService} from 'app/shared/services/currency.service';
import {UpdateListModelComponent} from '../update-list-model/update-list-model.component';

interface Data {
    key: string;
    value: string;
}

interface DataSetting {
    id: any;
    key: string;
    value: string;
}

const keys = [
    {prev: 'name', to: 'Company Name'},
    {prev: 'address', to: 'Company Address'},
    {prev: 'email', to: 'Email Address'},
    {prev: 'phone', to: 'Phone Number'},
];

const settingKeys = [
    {prev: 'localCurrency', to: 'Home/Local Currency'},
    {prev: 'internationalCurrency', to: 'International Currency'},
    {prev: 'autoPost', to: 'Auto-Post JV?'}
];

@Component({
    selector: 'app-company-information',
    templateUrl: './company-information.component.html',
    styleUrls: ['./company-information.component.scss']
})
export class CompanyInformationComponent implements OnInit {
    currencies = [];
    dataSource: Data[] = [];
    dialogRef: any;
    header = [{name: "Company Information"}];
    dataAddress: any;
    local: any;
    id: any;
    dataSetting: any;
    displayedColumns: string[] = ['key', 'value'];
    displayedColumnsSetting: string[] = ['key', 'value'];

    constructor(private currencyService: CurrencyService,
                private _matDialog: MatDialog,
                private companyInformationService: CompanyInformationService) {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.getCompanyInformation();
        this.getCurrencies();
        this.getCompanySetting();
    }

    getCurrencies() {
        this.currencies = [];
        this.currencyService.getCurrency({}).subscribe(data => {
            this.currencies = data.items;
        });
    }

    getCompanyInformation() {
        this.companyInformationService.getCompaniesInformationList().subscribe(data => {
            this.dataAddress = data.items;
            this.id = this.dataAddress[0].id;
            const newData: Data[] = [];
            for (const d of this.dataAddress) {
                for (const k of keys) {
                    newData.push({key: k.to, value: d[k.prev]});
                }
            }
            this.dataSource = newData
        });
    }

    getCompanySetting() {
        this.companyInformationService.getCompanySetting().subscribe(data => {
            this.dataSetting = data.items;
            let num: number = 1;
            const newData: DataSetting[] = [];
            for (const d of this.dataSetting) {
                for (const k of settingKeys) {
                    newData.push({id: num++, key: k.to, value: d[k.prev]});
                }
            }
            this.dataSetting = newData;
            this.dataSetting.forEach((value) => {
                value['isSelected'] = false;
            })
        })
    }

    editSetting(element) {
        this.dataSetting.forEach((value) => {
            value['isSelected'] = value.id == element.id;
        });

    }

    updateModel(items) {
        this.dialogRef = this._matDialog.open(UpdateListModelComponent, {
            panelClass: 'update-items-dialog',
            data: {data: items}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.update(items);
            }
            this.getCompanyInformation();
            this.getCompanySetting();
        });
    }

    update(element) {
        if (element.id === 1) {
            this.companyInformationService.updateCompanySetting(this.id, {localCurrency: this.local}).subscribe((data) => {
                this.getCompanySetting();
            })
        }
        if (element.id === 2) {
            this.companyInformationService.updateCompanySetting(this.id, {internationalCurrency: this.local}).subscribe((data) => {
                this.getCompanySetting();
            })
        }
        this.dataSetting.forEach((value) => {
            if (value.id == element.id) {
                value['isSelected'] = false;
            }
        })
    }

    autoPostJV(value) {
        this.dialogRef = this._matDialog.open(UpdateListModelComponent, {
            panelClass: 'update-items-dialog',
            data: {data: value}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.updateAutoPostJV(value.checked);
            }
        });
    }

    updateAutoPostJV(value) {
        this.companyInformationService.updateCompanySetting(this.id, {autoPost: value}).subscribe((data) => {
            this.getCompanySetting();
        })
    }
}
