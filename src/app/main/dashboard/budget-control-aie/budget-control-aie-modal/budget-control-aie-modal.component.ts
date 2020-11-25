import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {ContactInfoService} from '../../../../shared/services/contact-info.service';
import {UserRolesPermissionService} from '../../../../shared/services/user-roles-permission.service';
import {BudgetControlService} from '../../../../shared/services/budget-control.service';
import {FundSegmentSelectComponent} from '../../journal-voucher/fund-segment-select/fund-segment-select.component';
import {EconomicSegmentSelectComponent} from '../../journal-voucher/economic-segment-select/economic-segment-select.component';

@Component({
    selector: 'app-budget-control-aie-modal',
    templateUrl: './budget-control-aie-modal.component.html',
    styleUrls: ['./budget-control-aie-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BudgetControlAieModalComponent implements OnInit {
    action: any;
    dialogTitle: any;
    economicCodeForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;
    dialogRef: any;
    economicCodes;
    isUpdate = false;
    constructor(public matDialogRef: MatDialogRef<BudgetControlAieModalComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private budgetControlService: BudgetControlService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Economic code';
            this.isUpdate = true;
            if (_data.economic) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add Economic code';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.economicCodeForm = this.fb.group({
            ecoCode: ['', Validators.required],
            title: ['', Validators.required],
            amount: ['', Validators.required],
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.economicCodeForm.patchValue({
                ecoCode: this.updateData.economic.ecoCode,
                title: this.updateData.economic.title,
                amount: this.updateData.economic.amount
            });
        }
    }

    economicModalOpen() {
        this.dialogRef = this._matDialog.open(EconomicSegmentSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }

            this.economicCodes = [{
                'name': response.name,
                'id': response.id
            }];

            this.economicCodeForm.patchValue({
                ecoCode: response.id,
                title: response.name,
            });
        });
    }
    saveUserRole() {

    }

    updateUserRole() {

    }
}
