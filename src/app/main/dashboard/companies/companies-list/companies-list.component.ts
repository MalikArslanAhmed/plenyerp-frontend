import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
export interface master
{
  sno:number;
  companyId:string;
  companyName:string;
  companyAddress:string;
}

const MASTERS_DATA: master[]=[
  {sno:1,companyId:'SPP0957',companyName:'ABBA',companyAddress:'Kano Nigeria'},
  {sno:2,companyId:'2018-926B',companyName:'ABDULLAHI',companyAddress:'Dept of Agriculture eng.'},
  {sno:3,companyId:'2019-5531',companyName:'A.B.M.',companyAddress:'NYSC-Kano'},
];
@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CompaniesListComponent implements OnInit {

  constructor() { }
  displayedColumns:string[]=['sno','companyId','companyName','companyAddress','actions'];
  items=MASTERS_DATA;
  ngOnInit(): void {
   // console.log(this.dataSource)
  }
  editStore(item)
  {

  }
  deleteItemModal(item)
  {

  }
  onPageChange(page) {
  }
  
}
