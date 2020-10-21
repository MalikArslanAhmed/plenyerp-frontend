import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'app-balance-amount-model',
  templateUrl: './balance-amount-model.component.html',
  styleUrls: ['./balance-amount-model.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BalanceAmountModelComponent implements OnInit {
  action: any;
  dialogTitle: any;
  data: any;
  isUpdateItems = false;
  constructor(public matDialogRef: MatDialogRef<BalanceAmountModelComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private fb: FormBuilder,
     ) {
      this.data = _data.data;

  }

  ngOnInit(): void {
  }

}
