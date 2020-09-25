import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {CompaniesService} from '../../../../shared/services/companies.service';
import {BanksService} from '../../../../shared/services/banks.service';

@Component({
    selector: 'app-bank-create',
    templateUrl: './bank-create.component.html',
    styleUrls: ['./bank-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BankCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    itemForm: FormGroup;
    isSubmitted = false;
    updateData: any;
    dialogRef: any;
    constructor(public matDialogRef: MatDialogRef<BankCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private banksService: BanksService
    ) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Bank';
            if (_data.bank) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add New Bank';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.itemForm = this.fb.group({
            name: ['', Validators.required],
            isActive: [false, Validators.required]
        });
    }

    checkForUpdate(): void {
        if (this.updateData) {
            // console.log('--->>>', this.updateData);
            this.itemForm.patchValue({
                name: this.updateData.bank.name,
                isActive: this.updateData.bank.isActive
            });
        }
    }

    save(): void {
        this.isSubmitted = true;
        if (!this.itemForm.valid) {
            this.isSubmitted = false;
            return;
        }
        this.banksService.addBanks(this.itemForm.value).subscribe(data => {
            this.itemForm.reset();
            this.isSubmitted = false;
        });

    }

    update() {
        this.isSubmitted = true;
        if (!this.itemForm.valid) {
            this.isSubmitted = false;
            return;
        }
        this.banksService.updateBanks(this.updateData.bank.id, this.itemForm.value).subscribe(data => {
            this.updateData = undefined;
            this.itemForm.reset();
            this.isSubmitted = false;
        });
    }
}
