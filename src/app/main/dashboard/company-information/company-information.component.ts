import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyService } from 'app/shared/services/currency.service';
import { UpdateListModelComponent } from '../update-list-model/update-list-model.component';

@Component({
    selector: 'app-company-information',
    templateUrl: './company-information.component.html',
    styleUrls: ['./company-information.component.scss']
})
export class CompanyInformationComponent implements OnInit {
    currencies = [];
    dialogRef: any;
    header = [{name: "Company Information"}];
    dataAddress = [
        {key: "Company Name", value: "Abuja Corp"},
        {key: "Company Address", value: "1-301, Sector 18,"},
        {key: "Email Address", value: "info@gmail.com"},
        {key: "Phone number", value: "9999999999"},
    ];
    dataSetting = [
        {id: 1, key: "Home/local currency", value: "Naira"},
        {id: 2, key: "International Currency", value: "USD"},
        {id: 3, key: "Auto-Post JV?", value: ""}
    ];
    displayedColumns: string[] = ['key', 'value'];
   // displayedColumnsSetting: string[] = ['key', 'value', 'actions'];
    displayedColumnsSetting: string[] = ['key', 'value'];
    dropDownValues = [
        {id: 1, name: "naira"},
        {id: 2, name: "usd"}
    ];

    constructor(private currencyService: CurrencyService,private _matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.refresh();
        
    }
 
    refresh() {
        this.getCurrencies();
        this.dataSetting.forEach((value) => {
            value['isSelected'] = false;
        })
    }

    getCurrencies() {
        this.currencies = [];
        this.currencyService.getCurrency({}).subscribe(data => {
            this.currencies = data.items;
            console.log("currency",this.currencies);
        });
        
    }

    editSetting(element) {
        this.dataSetting.forEach((value) => {
            if (value.id == element.id) {

                value['isSelected'] = true;
            } else {
                value['isSelected'] = false;
            }
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
        });
    }

    update(element)
    {
         this.dataSetting.forEach((value) => {
            if (value.id == element.id) {
                value['isSelected'] = false;
            }
        })
    }
    autoPostJV(value)
    {
        this.dialogRef = this._matDialog.open(UpdateListModelComponent, {
            panelClass: 'update-items-dialog',
            data: {data: value}
        });
        this.dialogRef.afterClosed().subscribe((response: boolean) => {
            if (response) {
                this.updateAutoPostJV(value.id,value.checked);
            }
        });
        //console.log("val",value.checked)
    }
    updateAutoPostJV(id,value)
    {

    }

}
