import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {fuseAnimations} from '../../../../@fuse/animations';

@Component({
  selector: 'app-update-list-model',
  templateUrl: './update-list-model.component.html',
  styleUrls: ['./update-list-model.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UpdateListModelComponent implements OnInit {
  action: any;
  dialogTitle: any;
  data: any;
  isUpdateItems = false;
  constructor(public matDialogRef: MatDialogRef<UpdateListModelComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private fb: FormBuilder,
     ) {
      this.data = _data.data;

  }

  ngOnInit(): void {
  }

}
