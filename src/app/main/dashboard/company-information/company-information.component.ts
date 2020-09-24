import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.scss']
})
export class CompanyInformationComponent implements OnInit {

  constructor() { }

  header=[{name:"Company Information"}]
  dataAddress=[
    {key:"Company Name",value:"Abuja Corp"},
    {key:"Company Address",value:"1-301, Sector 18,"},
    {key:"Email Address",value:"info@gmail.com"},
    {key:"Phone number",value:"9999999999"},
  ];

  dataSetting=[
    {key:"Home/local currency",value:"Naira"},
    {key:"International Currency",value:"USD"}
  ]
  displayedColumns: string[] = ['key','value'];
  ngOnInit(): void {
  }

}
