import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { CompaniesCreateComponent } from './companies-create/companies-create.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  dialogRef: any;
  constructor(private _fuseSidebarService:FuseSidebarService,
    private _matDialog:MatDialog) { }

  ngOnInit(): void {
  }
  
  addCompany()
  {
    this.dialogRef = this._matDialog.open(CompaniesCreateComponent, {
      panelClass: 'contact-form-dialog',
      data: {action: 'CREATE'}
  });
  this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
      if (!response) {
          return;
      }
      //this.getStores.getStores();
  });
  }

}
