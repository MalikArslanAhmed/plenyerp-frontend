import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from "../../../../../shared/services/employees.service";

@Component({
  selector: 'app-emp-list-headers',
  templateUrl: './emp-list-headers.component.html',
  styleUrls: ['./emp-list-headers.component.scss']
})
export class EmpListHeadersComponent implements OnInit {
  dialogTitle: any;
  listHeadersForm: FormGroup;
  isSubmitted = false;
  // managers: any = [];
  updateData: any;

  availableColumns = ['SN', 'id', 'fileId', 'lName', 'fName', 'phone', 'department', 'title'];
  selectedColumns = [];
  

  constructor(public matDialogRef: MatDialogRef<EmpListHeadersComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private fb: FormBuilder,
    private employeesService: EmployeesService) {
    this.dialogTitle = 'Update Columns';
    this.selectedColumns = _data.selectedCol;
    if (_data.manager) {
      this.updateData = _data;
    }
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    const config: any = {
      headers: [this.selectedColumns, Validators.required]
    };
    this.listHeadersForm = this.fb.group(config);
  }

  updateList() {
    this.isSubmitted = true;
    if (!this.listHeadersForm.valid) {
      this.isSubmitted = false;
      return;
    }
    if (this.isSubmitted) {
      this.selectedColumns = this.listHeadersForm.getRawValue().headers;
      // this.employeesService.updateManager(this.updateData.manager.id, this.listHeadersForm.value).subscribe(data => {
      //   this.updateData = undefined;
      //   this.listHeadersForm.reset();
      //   this.isSubmitted = false;
      // });


    }
  }
}
