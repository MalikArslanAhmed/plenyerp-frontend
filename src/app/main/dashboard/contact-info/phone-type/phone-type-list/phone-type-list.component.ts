import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { PhoneTypeCreateComponent } from '../phone-type-create/phone-type-create.component';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';

@Component({
  selector: 'app-phone-type-list',
  templateUrl: './phone-type-list.component.html',
  styleUrls: ['./phone-type-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PhoneTypeListComponent implements OnInit {
  phoneTypeList = [];
  displayedPhoneTypeColumns = ['id', 'name', 'actions'];
  dialogRef: any;
  selectIndex = 0;
  @Output() selectedIndexChange: EventEmitter<number>;

  constructor(private contactInfoService: ContactInfoService,
    private _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getPhoneTypeList();
  }

  getPhoneTypeList() {
    this.contactInfoService.getPhoneTypeList({ 'page': -1 }).subscribe(data => {
      this.phoneTypeList = data.items;

      if (this.phoneTypeList && this.phoneTypeList.length > 0) {
        let i = 1;
        this.phoneTypeList.forEach(val => {
          val['sno'] = i;
          i++;
        });
      }
    });
  }


  deletePhoneType(id) {
    this.contactInfoService.deletePhoneType(id).subscribe(data => {
      if (data) {
        this.getPhoneTypeList();
      }
    });
  }

  editPhoneType(phoneType) {
    this.dialogRef = this._matDialog.open(PhoneTypeCreateComponent, {
      panelClass: 'contact-form-dialog',
      data: { action: 'EDIT', phoneType: phoneType },
    });
    this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
      if (!response) {
        return;
      }
      this.getPhoneTypeList();
    });
  }

}


