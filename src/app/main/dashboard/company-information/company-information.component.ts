import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-company-information',
    templateUrl: './company-information.component.html',
    styleUrls: ['./company-information.component.scss']
})
export class CompanyInformationComponent implements OnInit {
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

    constructor() {
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.dataSetting.forEach((value) => {
            value['isSelected'] = false;
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

    update(element) {
        this.dataSetting.forEach((value) => {
            if (value.id == element.id) {
                value['isSelected'] = false;
            }
        })
    }

}
