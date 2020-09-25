import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {CompaniesService} from '../../../../shared/services/companies.service';
import {BanksService} from '../../../../shared/services/banks.service';

@Component({
    selector: 'app-branch-create',
    templateUrl: './branch-create.component.html',
    styleUrls: ['./branch-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BranchCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    itemForm: FormGroup;
    isSubmitted = false;
    updateData: any;
    dialogRef: any;
    bankId;
    constructor(public matDialogRef: MatDialogRef<BranchCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private banksService: BanksService
    ) {
        this.action = _data.action;
        this.bankId = _data.bankId;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Branch';
            if (_data.branch) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add New Branch';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.itemForm = this.fb.group({
            name: ['', Validators.required],
            country: ['', Validators.required],
            sortCode: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            address: ['', Validators.required],
            isActive: [false, Validators.required]
        });
    }

    checkForUpdate(): void {
        if (this.updateData) {
            // console.log('--->>>', this.updateData);
            this.itemForm.patchValue({
                name: this.updateData.branch.name,
                country: this.updateData.branch.country,
                sortCode: this.updateData.branch.sortCode,
                city: this.updateData.branch.city,
                state: this.updateData.branch.state,
                address: this.updateData.branch.address,
                isActive: this.updateData.branch.isActive
            });
        }
    }

    save(): void {
        this.isSubmitted = true;
        if (!this.itemForm.valid) {
            this.isSubmitted = false;
            return;
        }
        this.banksService.addBranches(this.bankId, this.itemForm.value).subscribe(data => {
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
        this.banksService.updateBranch(this.bankId, this.updateData.branch.id, this.itemForm.value).subscribe(data => {
            this.updateData = undefined;
            this.itemForm.reset();
            this.isSubmitted = false;
        });
    }
}
