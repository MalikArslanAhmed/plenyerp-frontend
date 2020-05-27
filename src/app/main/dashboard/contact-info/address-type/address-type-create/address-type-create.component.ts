import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';

@Component({
  selector: 'app-address-type-create',
  templateUrl: './address-type-create.component.html',
  styleUrls: ['./address-type-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddressTypeCreateComponent implements OnInit {
  action: any;
  dialogTitle: any;
  addressTypeForm: FormGroup;
  isSubmitted = false;
  salaryScales: any = [];
  updateData: any;
  constructor(public matDialogRef: MatDialogRef<AddressTypeCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private fb: FormBuilder,
    private contactInfoService: ContactInfoService) {
    this.action = _data.action;
    if (this.action === 'EDIT') {
      this.dialogTitle = 'Edit Address Type';
      if (_data.addressType) {
        this.updateData = _data;
      }
    } else {
      this.dialogTitle = 'Add Address Type';
    }
  }

  ngOnInit(): void {
    this.refresh();
    this.checkForUpdate();
  }

  refresh() {
    this.addressTypeForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  checkForUpdate() {
    if (this.updateData) {
      this.addressTypeForm.patchValue({
        name: this.updateData.addressType.name,
      });
    }
  }

  saveAddressType() {
    this.isSubmitted = true;
    if (!this.addressTypeForm.valid) {
      this.isSubmitted = false;
      return;
    }

    if (this.isSubmitted) {
      this.contactInfoService.addAddressType(this.addressTypeForm.value).subscribe(data => {
        this.addressTypeForm.reset();
        this.isSubmitted = false;
      });
    }
  }

  updateAddressType() {
    this.isSubmitted = true;
    if (!this.addressTypeForm.valid) {
      this.isSubmitted = false;
      return;
    }
    if (this.isSubmitted) {
      this.contactInfoService.updateAddressType(this.updateData.addressType.id, this.addressTypeForm.value).subscribe(data => {
        this.updateData = undefined;
        this.addressTypeForm.reset();
        this.isSubmitted = false;
      });

    }
  }
}
