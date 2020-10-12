import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyInformationService } from 'app/shared/services/company-information.service';
import { CurrencyService } from 'app/shared/services/currency.service';
import { UpdateListModelComponent } from '../update-list-model/update-list-model.component';

interface Data{
    key:string;
    value:string;
}

interface DataSetting{
    id: any;
    key:string;
    value:string;
}

const keys =[
    {prev:'name', to:'Company Name'},
    {prev:'address', to:'Company Address'},
    {prev:'email', to:'Email Address'},
    {prev:'phone', to:'Phone Number'},
];

const settingKeys = [
    {prev:'localCurrency', to:'Home/Local Currency'},
    {prev:'internationalCurrency',to:'International Currency'},
    {prev:'autoPost',to:'Auto-Post JV?'}
]
// const keys =[
//     'Company Name',
//     'Company Address',
//     'Email Address',
//     'Phone Number'
// ]

// const namesEnum: {[key:string]:string} ={
//     'name' : 'Company Name',
//     'address' : 'Company Address',
//     'email' : 'Email',
//     'phone' : 'Phone'
// }
@Component({
    selector: 'app-company-information',
    templateUrl: './company-information.component.html',
    styleUrls: ['./company-information.component.scss']
})
export class CompanyInformationComponent implements OnInit {
    currencies = [];
    dataSource:Data[] =[];
    dialogRef: any;
    header = [{name: "Company Information"}];
    dataAddress:any;
    dataSourceSetting:DataSetting[] =[];
    local:any;
    internation:any;
    // dataAddress = [
    //     // {key: "Company Name", value: "Abuja Corp"},
    //     // {key: "Company Address", value: "1-301, Sector 18,"},
    //     // {key: "Email Address", value: "info@gmail.com"},
    //     // {key: "Phone number", value: "9999999999"},
    // ];
    dataSetting:any;
    // dataSetting = [
    //     {id: 1, key: "Home/local currency", value: "Naira"},
    //     {id: 2, key: "International Currency", value: "USD"},
    //     {id: 3, key: "Auto-Post JV?", value: ""}
    // ];
    displayedColumns: string[] = ['key', 'value'];
   // displayedColumnsSetting: string[] = ['key', 'value', 'actions'];
    displayedColumnsSetting: string[] = ['key', 'value'];
    // dropDownValues = [
    //     {id: 1, name: "naira"},
    //     {id: 2, name: "usd"}
    // ];

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
            //console.log("currency",this.currencies);
        });
        
    }

    getCompanyInformation()
    {
        this.companyInformationService.getCompaniesInformationList().subscribe(data => {
            this.dataAddress = data.items;
            //console.log("data",this.dataAddress);

            var num:number=0
            const newData: Data[] = [];
            for (const d of this.dataAddress) {
                for (const k of keys) {
                    newData.push({ key: k.to, value: d[k.prev] });
                }
            }
            this.dataSource = newData
           //console.log("new",newData)

        //    const newData: Data[] =[];

        //    for(const prop in this.dataAddress){
        //        newData.push({
        //         key:namesEnum[prop],
        //         value: this.dataAddress[prop]
        //        });
        //    }
        //    this.dataSource = newData
        //    console.log("new",newData)
        });
    }

    getCompanySetting()
    {
        //console.log("data",this.dataAddress)
        this.companyInformationService.getCompanySetting().subscribe(data =>{
            this.dataSetting = data.items;
            var num:number=1
            const newData: DataSetting[] = [];
            for (const d of this.dataSetting) {
                for (const k of settingKeys) {
                    newData.push({ id:num++,key: k.to, value: d[k.prev] });
                }
            }

            this.dataSetting = newData;
            this.dataSetting.forEach((value) => {
                value['isSelected'] = false;
            })
            console.log("setting",this.dataSetting)
           // console.log("newData",newData)
        })
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
            this.getCompanyInformation();
            this.getCompanySetting();
        });
    }

    update(element)
    {
        let id=1;
        console.log("loc",this.local)
        console.log("elemt",element.id);

        if(element.id===1)
        {
            this.companyInformationService.updateCompanySetting(id,{localCurrency:this.local}).subscribe((data)=>{
                this.getCompanySetting();
            })
        }
        if(element.id===2)
        {
            this.companyInformationService.updateCompanySetting(id,{internationalCurrency:this.local}).subscribe((data)=>{
                this.getCompanySetting();
            })
        }
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
                this.updateAutoPostJV(value.checked);
            }
        });
        //console.log("val",value.checked)
    }
    updateAutoPostJV(value)
    {
        let id=1;
        console.log("val",value);

        this.companyInformationService.updateCompanySetting(id,{autoPost:value}).subscribe((data)=>{
            this.getCompanySetting();
        })
    }

}
