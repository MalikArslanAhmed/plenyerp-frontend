import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {CompaniesService} from '../../../../shared/services/companies.service';
import {log} from 'util';

@Component({
    selector: 'app-companies-create',
    templateUrl: './companies-create.component.html',
    styleUrls: ['./companies-create.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CompaniesCreateComponent implements OnInit {
    action: any;
    dialogTitle: any;
    itemForm: FormGroup;
    isSubmitted = false;
    qualifications: any = [];
    updateData: any;
    dialogRef: any;
    labels:string[];
    toggles:boolean;
    companyToggleArr = [
        // {
        //     id: 1,
        //     name: 'Is Supplier?',
        //     value: false
        // },
        // {
        //     id: 2,
        //     name: 'Is Customer?',
        //     value: false
        // },
        // {
        //     id: 3,
        //     name: 'Is Cashbook A/C?',
        //     value: false
        // },
        // {
        //     id: 4,
        //     name: 'Is One-off?',
        //     value: false
        // },
        // {
        //     id: 5,
        //     name: 'Is PFA?',
        //     value: false
        // },
    ];
 
    constructor(public matDialogRef: MatDialogRef<CompaniesCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private _matDialog: MatDialog,
                private companiesService: CompaniesService
    ) {
        this.action = _data.action;
        if (this.action === 'EDIT') {
            this.dialogTitle = 'Edit Company';
            if (_data.company) {
                this.updateData = _data;
            }
        } else {
            this.dialogTitle = 'Add New Company';
        }
    }

    ngOnInit(): void {
        this.refresh();
        this.getCompanyConfig();
        this.checkForUpdate();
    }

    refresh() {
        this.itemForm = this.fb.group({
            name: ['', Validators.required],
            city: ['', Validators.required],
            address: ['', Validators.required],
            state: ['', Validators.required],
            country: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            website: ['', Validators.required],
            isActive: [false, Validators.required],
            // is_supplier:[true, Validators.required],
            // is_customer:[false, Validators.required],
            // is_cashbook_ac:[false, Validators.required],
            // is_on_off:[false, Validators.required],
            // is_pfa:[false, Validators.required],
            // isSupplier: [false, Validators.required],
            // isCustomer: [false, Validators.required],
            // isCashbookAc: [false, Validators.required],
            // isOnOff: [false, Validators.required],
            // isPf: [false, Validators.required]

            // 'categoryId': ['', Validators.required],
            // 'measurementId': ['', Validators.required],
            // 'unitPrice': ['', Validators.required],
            // 'leadDays': ['', Validators.required],
            // 'reorderQuantity': ['', Validators.required],
            // 'salesCommission': ['', Validators.required],
            // 'minimumQuantity': ['', Validators.required],
            // 'maximumQuantity': ['', Validators.required],
            // 'isChargedVat': [false, Validators.required],
            // 'isChargedOtherTax': [false, Validators.required],
            // 'isPhysicalQuantity': [false, Validators.required]
        });
    }

    checkForUpdate(): void {
        if (this.updateData) {
            this.itemForm.patchValue({
                name: this.updateData.company.name,
                city: this.updateData.company.city,
                address: this.updateData.company.address,
                state: this.updateData.company.state,
                country: this.updateData.company.country,
                phone: this.updateData.company.phone,
                email: this.updateData.company.email,
                website: this.updateData.company.website,
                isActive: this.updateData.company.isActive,
                

                // isSupplier: this.updateData.company.isSupplier,
                // isCustomer: this.updateData.company.isCustomer,
                // isCashbookAc: this.updateData.company.isCashbookAc,
                // isOnOff: this.updateData.company.isOnOff,
                // isPf: this.updateData.company.isPf
            });
            this.companyToggleArr = this.updateData.configs;
        }
    }

    saveCompany(): void {
        this.isSubmitted = true;
        if (!this.itemForm.valid) {
            this.isSubmitted = false;
            return;
        }
        // const params = {
        //     ...this.itemForm.value,
        //     configs: this.companyToggleArr,
        // };       
        // console.log('--->>', params);

        console.log(this.companyToggleArr);
        this.companyToggleArr.forEach(value => {
            //this.itemForm.value[value.name] = value.status; 
            this.itemForm.value[value.name] = value.status ? value.status : false;
        });

        //this.itemForm.value['toogleData'] = this.companyToggleArr;
        if (this.isSubmitted) {
            console.log(this.itemForm.value)
            this.companiesService.addCompany(this.itemForm.value).subscribe(data => {
                this.itemForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    updateCompany() {
        this.isSubmitted = true;
        if (!this.itemForm.valid) {
            this.isSubmitted = false;
            return;
        }
        const params = {
            ...this.itemForm.value,
            configs: this.companyToggleArr,
        };
        // console.log('--->>', params);
        if (this.isSubmitted) {
            this.companiesService.updateCompany(this.updateData.company.id, this.itemForm.value).subscribe(data => {
                this.updateData = undefined;
                this.itemForm.reset();
                this.isSubmitted = false;
            });
        }
    }

    resetForm() {
        this.itemForm.reset();
        this.itemForm.controls['isActive'].setValue(true);
    }

    getCompanyConfig() {
       
        this.companiesService.companyConfig({page: -1}).subscribe(data => {
            this.companyToggleArr = data.items;
            this.labels=data.items.map(x=>"Is "+x.name.split('is')[1])
            console.log(this.labels)
        });
    }

}
