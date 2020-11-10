import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {TreasureReportService} from '../../../../../shared/services/treasure-report.service';

@Component({
    selector: 'app-cashbook-create',
    templateUrl: './cashbook-create.component.html',
    styleUrls: ['./cashbook-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CashbookCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    voucherSourceUnitForm: FormGroup;
    isSubmitted = false;
    salaryScales: any = [];
    updateData: any;   
    constructor(public matDialogRef: MatDialogRef<CashbookCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private treasureReportService: TreasureReportService) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit a Cashbook Account';
            if (_data.roles) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add a Cashbook Account';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.checkForUpdate();
    }

    refresh() {
        this.voucherSourceUnitForm = this.fb.group({
            refNo: ['', Validators.required],
            longName: ['', Validators.required],
            shortName: ['', Validators.required],
            nextPvIndexNo: ['', Validators.required],
            nextRvIndexNo: ['', Validators.required],
            honourCertificate: ['', Validators.required],
            checkingOfficer: ['', Validators.required],
            payingOfficer: ['', Validators.required],
            financialController: ['', Validators.required],
            retirementRefNo: ['', Validators.required],
            reverseVRefNo: ['', Validators.required],
            revalidationRefNo: ['', Validators.required],
            textVoucherRefNo: ['', Validators.required],
            isPersonalAdvUnit: [''],
        });
    }

    checkForUpdate() {
        if (this.updateData) {
            this.voucherSourceUnitForm.patchValue({
                // name: this.updateData.roles.role,
                // description: this.updateData.roles.description
            });
        }
    }

    saveVoucherSourceUnit() {
        console.log('-->save', this.voucherSourceUnitForm.getRawValue());
        if (!this.voucherSourceUnitForm.valid) {
            return;
        }
        // this.treasureReportService.addVoucherSourceUnits(this.voucherSourceUnitForm.value).subscribe(data => {
        //     this.voucherSourceUnitForm.reset();
        // });
    }

    updateVoucherSourceUnit() {
        console.log('-->update', this.voucherSourceUnitForm.getRawValue());
        if (!this.voucherSourceUnitForm.valid) {
            return;
        }
        // this.treasureReportService.updateVoucherSourceUnits(this.updateData.roles.id, this.voucherSourceUnitForm.value).subscribe(data => {
        //     this.updateData = undefined;
        //     this.voucherSourceUnitForm.reset();
        // });
    }
}
