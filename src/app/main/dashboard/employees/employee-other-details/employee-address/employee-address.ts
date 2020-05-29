import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fuseAnimations} from '../../../../../../@fuse/animations';
import {EmployeeOtherDetailsService} from '../../../../../shared/services/employee-other-details.service';

@Component({
    selector: 'app-employee-address',
    templateUrl: './employee-address.html',
    styleUrls: ['./employee-address.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

// tslint:disable-next-line:component-class-suffix
export class EmployeeAddress implements OnInit {
    data: any;
    dialogTitle: any;
    employeeAddressForm: FormGroup;
    typeOfAddress = [];
    countries = [];
    states = [];
    regions = [];
    lgas = [];
    employeeAddressList = [];
    employeeAddressColumns = ['sno', 'addressType', 'address', 'city', 'zipCode', 'country', 'region', 'state', 'lga', 'actions'];
    addressId = null;
    constructor(public matDialogRef: MatDialogRef<EmployeeAddress>,
                @Inject(MAT_DIALOG_DATA) private _data: any,
                private fb: FormBuilder,
                private employeeOtherDetailsService: EmployeeOtherDetailsService,
                ) {
        this.data = _data;
        if ( _data.title === 'ADDRESS') {
            this.dialogTitle = 'Address';
        }

    }

    ngOnInit(): void {
        this.refresh();
        this.getTypeOfAddress();
        this. getCountry();
        this.getAddressList();
    }

    refresh() {
        this.employeeAddressForm = this.fb.group({
            addressTypeId: ['', Validators.required],
            addressLine1: ['', Validators.required],
            addressLine2: [''],
            city: ['', Validators.required],
            zipCode: ['', Validators.required],
            countryId: ['', Validators.required],
            stateId: ['', Validators.required],
            regionId: ['', Validators.required],
            lgaId: ['', Validators.required],
        });
        this.employeeAddressForm.get('countryId').valueChanges.subscribe(val => {
            this.states = [];
            this.regions = [];
            this.lgas = [];
            this.employeeAddressForm.get('regionId').patchValue('');
            this.employeeAddressForm.get('stateId').patchValue('');
            this.employeeAddressForm.get('lgaId').patchValue('');
            if (val) {
                this.getRegion(val);
            }
        });
        this.employeeAddressForm.get('regionId').valueChanges.subscribe(val => {
            this.states = [];
            this.lgas = [];
            this.employeeAddressForm.get('stateId').patchValue('');
            this.employeeAddressForm.get('lgaId').patchValue('');
            if (val) {
                this.getState(val);
            }
        });
        this.employeeAddressForm.get('stateId').valueChanges.subscribe(val => {
            this.lgas = [];
            this.employeeAddressForm.get('lgaId').patchValue('');
            if (val) {
                this.getLga(val);
            }
        });

    }

    editEmployeeAddress(addressId: any) {
        this.addressId = addressId;
        this.employeeAddressList.forEach(val => {
            if (val.id === addressId) {
                this.employeeAddressForm.patchValue({
                    addressTypeId: val.addressTypeId,
                    addressLine1: val.addressLine1,
                    addressLine2: val.addressLine2,
                    city: val.city,
                    zipCode: val.zipCode,
                    countryId: val.country.id,
                    regionId: val.region.id ,
                    stateId: val.state.id,
                    lgaId: val.lga.id,
                });
            }
        });
    }

    updateEmployeeAddress() {
        this.employeeOtherDetailsService.updateAddress(this.data.employeeId, this.addressId, this.employeeAddressForm.value).subscribe(data => {
            this.addressId = null;
            this.employeeAddressForm.reset();
            this.getAddressList();
        });
    }
    cancelUpdate() {
        this.addressId = null;
        this.employeeAddressForm.reset();
    }

    deleteEmployeeAddress(id: any) {
        this.employeeOtherDetailsService.deleteAddress(id).subscribe(data => {
            this.employeeAddressForm.reset();
            this.getAddressList();
        });
    }
    getTypeOfAddress() {
      this.employeeOtherDetailsService.typeOfAddress({}).subscribe(data => {
          this.typeOfAddress = data.items;
      });
    }
    getCountry() {
        this.employeeOtherDetailsService.allCountry().subscribe(data => {
            this.countries = data.items;
        });
    }
    getRegion(countryId) {
        this.employeeOtherDetailsService.allRegion({countryId: countryId}).subscribe(data => {
            this.regions = data.items;
        });
    }
    getState(regionId) {
        this.employeeOtherDetailsService.allState({regionId: regionId}).subscribe(data => {
            this.states = data.items;
        });
    }
    getLga(stateId) {
        this.employeeOtherDetailsService.allLga({stateId: stateId}).subscribe(data => {
            this.lgas = data.items;
        });
    }

    addAddress() {
      this.employeeOtherDetailsService.addEmployeeAddress(this.data.employeeId, this.employeeAddressForm.value).subscribe(v => {
          // console.log(v);
          this.employeeAddressForm.reset();
          this.getAddressList();
      });
    }
    getAddressList() {
        this.employeeOtherDetailsService.employeeAddressList(this.data.employeeId).subscribe(data => {
            this.employeeAddressList = data.items;
            let index = 0;
            this.employeeAddressList.forEach(value => {
                index += 1;
                value['sno'] = index;
            });
            // console.log( this.employeeAddressList);
        });
    }
}
