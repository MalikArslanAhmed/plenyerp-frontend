import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { ContactInfoService } from '../../../../../shared/services/contact-info.service';

@Component({
  selector: 'app-phone-type-create',
  templateUrl: './phone-type-create.component.html',
  styleUrls: ['./phone-type-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PhoneTypeCreateComponent implements OnInit {
  action: any;
  dialogTitle: any;
  phoneTypeForm: FormGroup;
  isSubmitted = false;
  salaryScales: any = [];
  updateData: any;
  constructor(public matDialogRef: MatDialogRef<PhoneTypeCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private fb: FormBuilder,
    private contactInfoService: ContactInfoService) {
    this.action = _data.action;
    if (this.action === 'EDIT') {
      this.dialogTitle = 'Edit Phone Type';
      if (_data.phoneType) {
        this.updateData = _data;
      }
    } else {
      this.dialogTitle = 'Add Phone Type';
    }
  }

  ngOnInit(): void {
    this.refresh();
    this.checkForUpdate();
  }

  refresh() {
    this.phoneTypeForm = this.fb.group({
      name: ['', Validators.required],
      isActive : [false]
    });
  }

  checkForUpdate() {
    if (this.updateData) {
      this.phoneTypeForm.patchValue({
        name: this.updateData.phoneType.name,
        isActive: this.updateData.phoneType.isActive
      });
    }
  }

  savePhoneType() {
    this.isSubmitted = true;
    if (!this.phoneTypeForm.valid) {
      this.isSubmitted = false;
      return;
    }

    if (this.isSubmitted) {
      this.contactInfoService.addPhoneType(this.phoneTypeForm.value).subscribe(data => {
        this.phoneTypeForm.reset();
        this.isSubmitted = false;
      });
    }
  }

  updatePhoneType() {
    this.isSubmitted = true;
    if (!this.phoneTypeForm.valid) {
      this.isSubmitted = false;
      return;
    }
    if (this.isSubmitted) {
      this.contactInfoService.updatePhoneType(this.updateData.phoneType.id, this.phoneTypeForm.value).subscribe(data => {
        this.updateData = undefined;
        this.phoneTypeForm.reset();
        this.isSubmitted = false;
      });

    }
  }
}
