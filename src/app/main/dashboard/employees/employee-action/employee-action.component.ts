import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeService} from '../../../../shared/services/employee.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeePreviewComponent} from '../employee-preview/employee-preview.component';
import {DepartmentListSelectComponent} from '../../structure/department-list/department-list-select.component';
import {EmployeeAddress} from '../employee-other-details/employee-address/employee-address';
import {DesignationCreateComponent} from '../../designation/designation-create/designation-create.component';
import {EmployeeCensure} from '../employee-other-details/employee-censure/employee-censure';
import {EmployeeHistory} from '../employee-other-details/employee-history/employee-history';
import {EmployeeLanguages} from '../employee-other-details/employee-languages/employee-languages';
import {EmployeeMembership} from '../employee-other-details/employee-membership/employee-membership';
import {EmployeeMilitaryService} from '../employee-other-details/employee-military-service/employee-military-service';
import {EmployeePhoneNumber} from '../employee-other-details/employee-phone-number/employee-phone-number';
import {EmployeeQualifications} from '../employee-other-details/employee-qualifications/employee-qualifications';
import {EmployeeRelations} from '../employee-other-details/employee-relations/employee-relations';
import {EmployeeSchoolAttended} from '../employee-other-details/employee-school-attended/employee-school-attended';
import {EmployeeBankDetailsComponent} from './employee-bank-details/employee-bank-details.component';
import {EmployeeBackground} from '../employee-other-details/employee-background/employee-background';
import {PageEvent} from '@angular/material/paginator';
import {EmployeeProgressionHistoryComponent} from './employee-progression-history/employee-progression-history.component';
import {EmployeeLoginAccessComponent} from './employee-login-access/employee-login-access.component';

@Component({
    selector: 'app-employee-action',
    templateUrl: './employee-action.component.html',
    styleUrls: ['./employee-action.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EmployeeActionComponent implements OnInit {
    employees = [];
    displayedColumns = ['select', 'id', 'empId', 'fileNo', 'lastName', 'firstName', 'title', 'actions'];
    dialogRef: any;
    selectedEmployee = [];
    selectedStatus;
    nextStatus;
    statuses = [
        {
            'value': 'NEW',
            'name': 'New'
        },
        {
            'value': 'ACTIVE',
            'name': 'Activated'
        },
        {
            'value': 'RETIRE',
            'name': 'Retire'
        },
        {
            'value': 'RETIREMENT_DUE',
            'name': 'Retirement Due'
        },
        {
            'value': 'CONFIRMED',
            'name': 'Confirmed'
        },
        {
            'value': 'CONFIRMATION_DUE',
            'name': 'Confirmtion Due'
        },
        {
            'value': 'INCREMENT',
            'name': 'Increment'
        },
        {
            'value': 'INCREMENT_DUE',
            'name': 'Increment Due'
        },
        {
            'value': 'PROMOTION',
            'name': 'Promotion'
        },
        {
            'value': 'PROMOTION_DUE',
            'name': 'Promotion Due'
        }
    ];
    departments = [];
    employeeFilterForm: FormGroup;
    isSubmitted = false;

    previewEmp;
    otherDetailsList = [
        {
            name: 'Address',
            value: 'ADDRESS'
        },
        {
            name: 'Censure',
            value: 'CENSURE'
        },
        {
            name: 'Employment History',
            value: 'EMPLOYMENT_HISTORY'
        },
        {
            name: 'Languages',
            value: 'LANGUAGES'
        },
        {
            name: 'Membership',
            value: 'MEMBERSHIP'
        },
        {
            name: 'Military Service',
            value: 'MILITARY_SERVICE'
        },
        {
            name: 'Phone Number',
            value: 'PHONE_NUMBER'
        },
        {
            name: 'Qualifications',
            value: 'QUALIFICATIONS'
        },
        {
            name: 'Relations',
            value: 'RELATIONS'
        },
        {
            name: 'Schools Attended',
            value: 'SCHOOLS_ATTENDED'
        },
        {
            name: 'Background',
            value: 'BACKGROUND'
        }
    ];
    otherDetailForm: FormGroup;
    exportOpen = false;
    pagination = {
        page: 1,
        total: null,
        perpage: 15,
        pages: null
    };
    pageEvent: PageEvent;
    departmentAllIds = [];
    filters = {};

    constructor(private employeesService: EmployeeService,
                private _matDialog: MatDialog,
                private router: Router,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.refresh();
        this.getEmployees({});
    }

    refresh() {
        this.employeeFilterForm = this.fb.group({
            'departmentId': [''],
            'search': [''],
            'statusId': ['']
        });
        this.otherDetailForm = this.fb.group({
            otherDetail: '',
        });
    }

    addSearchFilter() {
        this.filters['search'] = this.employeeFilterForm.value.search;
        this.getEmployees(this.filters);
    }

    getEmployees(params) {
        if (params.status === 'NEW') {
            this.nextStatus = 'ACTIVE';
        } else if (params.status === 'RETIREMENT_DUE') {
            this.nextStatus = 'RETIRE';
        } else if (params.status === 'CONFIRMATION_DUE') {
            this.nextStatus = 'CONFIRMED';
        } else if (params.status === 'INCREMENT_DUE') {
            this.nextStatus = 'INCREMENT';
        } else if (params.status === 'PROMOTION_DUE') {
            this.nextStatus = 'PROMOTION';
        } else {
            this.nextStatus = '';
        }
        if (this.filters['departmentIds']) {
            params['departmentIds'] = this.filters['departmentIds'];
        }
        if (this.filters['search']) {
            params['search'] = this.filters['search'];
        }
        this.employeesService.getEmployees(params).subscribe(data => {
            this.employees = data.items;

            if (this.employees && this.employees.length > 0) {
                let i = 1;
                this.employees.forEach(employee => {
                    employee['sno'] = i;
                    i++;
                });
            }
            this.pagination.page = data.page;
            this.pagination.total = data.total;
        });
    }

    onPageChange(page) {
        this.pagination.page = page.pageIndex + 1;
        this.getEmployees({page: this.pagination.page});
    }

    resetEmployeeFilter() {
        this.employeeFilterForm.patchValue({
            'departmentId': '',
            'search': '',
            'statusId': '',
        });
        this.getEmployees({});
    }

    addBankDetails(previewEmp) {
        this.dialogRef = this._matDialog.open(EmployeeBankDetailsComponent, {
            panelClass: 'bank-details-dialog',
            data: {action: 'CREATE', selectedEmployee: previewEmp}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            // this.getAddressTypeList.getAddressTypeList();
        });
    }

    employeeProgression(previewEmp) {
        // console.log(previewEmp);
        this.dialogRef = this._matDialog.open(EmployeeProgressionHistoryComponent, {
            panelClass: 'employee-Progression-history-details-dialog',
            data: {action: 'CREATE', selectedEmployee: previewEmp}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            // this.getAddressTypeList.getAddressTypeList();
        });
    }

    employeeLoginAccess(previewEmp) {
        // console.log(previewEmp);
        this.dialogRef = this._matDialog.open(EmployeeLoginAccessComponent, {
            panelClass: 'employee-login-access-dialog',
            data: {action: 'CREATE', selectedEmployee: previewEmp}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            // this.getAddressTypeList.getAddressTypeList();
        });
    }

    editEmployee(employee) {
        console.log(3);
        this.router.navigateByUrl('dashboard/employee/edit/' + employee.id);
    }


    fileUpload(event, previewEmp) {
        const file = event && event.target.files[0];
        const obj = {
            type: 'USER_IMAGE',
            fileType: 'Normal',
        };
        obj['file'] = file;
        this.employeesService.uploadFile(obj).subscribe((fileData: any) => {
            this.previewEmp.file = fileData.data;
            this.afterFileUpload(fileData.data, previewEmp);
        });
    }

    afterFileUpload(image, employee) {
        this.employeesService.editEmployeeProfilePic(employee.id, {profileImageId: image.id}).subscribe((data) => {

        });
    }


    // previewEmployee(employee) {
    //     this.dialogRef = this._matDialog.open(EmployeePreviewComponent, {
    //         panelClass: 'contact-form-dialog',
    //         data: {action: 'PREVIEW', employee: employee},
    //     });
    //     this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
    //         if (!response) {
    //             return;
    //         }
    //     });
    // }

    previewEmployee(selected) {
        if (selected) {
            this.previewEmp = selected;
        }
    }

    checkEmployee(employee) {
        let found = false;
        if (this.selectedEmployee && this.selectedEmployee.length > 0) {
            let i = 0;
            this.selectedEmployee.forEach(selectedEmployee => {
                if (selectedEmployee.id === employee.id) {
                    this.selectedEmployee.splice(i, 1);
                    found = true;
                }
                i++;
            });
        }

        if (!found) {
            this.selectedEmployee.push(employee);
        }
    }

    addEmployee() {
        this.router.navigateByUrl(`/dashboard/add-employee`);
    }

    adminUnitListSelect() {
        this.dialogRef = this._matDialog.open(DepartmentListSelectComponent, {
            panelClass: 'contact-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            if (!response) {
                return;
            }
            this.departmentAllIds = [];
            this.departmentAllIds.push(response.id);
            this.findAllIds(response);

            this.departments = [{
                'name': response.name,
                'id': response.id
                // 'id': this.departmentAllIds
            }];


            this.employeeFilterForm.patchValue({
                departmentId: response.id,
                // departmentId: this.departmentAllIds,
                disabled: true
            });
            // this.getEmployees({'departmentId': response.id});
            this.filters['departmentIds'] = JSON.stringify(this.departmentAllIds);
            // this.getEmployees({departmentIds: JSON.stringify(this.departmentAllIds)});
            this.getEmployees(this.filters);
        });
    }

    findAllIds(data) {
        data.children.forEach(item => {
            if (item.children && item.children.length) {
                this.departmentAllIds.push(item.id);
                this.findAllIds(item);
            } else {
                this.departmentAllIds.push(item.id);
                return;
            }
        });
    }

    activateEmployee() {
        console.log(this.nextStatus);
        this.isSubmitted = true;
        if (this.isSubmitted) {
            const params = {
                'status': this.nextStatus,
                'employeeIds': this.selectedEmployee.map(i => i.id)
            };

            console.log(params);
            this.employeesService.setStatusEmployee(params).subscribe(data => {
                this.isSubmitted = false;
            });
        }
    }

    addOtherDetails(employeeDetails) {
        // console.log('---------->>>', employeeDetails.id);
        const od = this.otherDetailForm.get('otherDetail').value;
        if (od === 'ADDRESS') {
            this.dialogRef = this._matDialog.open(EmployeeAddress, {
                panelClass: 'employee-address-details-form-dialog',
                data: {
                    title: od,
                    employeeId: employeeDetails.id,
                }
            });

        } else if (od === 'CENSURE') {
            this.dialogRef = this._matDialog.open(EmployeeCensure, {
                panelClass: 'employee-censure-details-form-dialog',
                data: {
                    title: od,
                    employeeId: employeeDetails.id,
                }
            });

        } else if (od === 'EMPLOYMENT_HISTORY') {
            this.dialogRef = this._matDialog.open(EmployeeHistory, {
                panelClass: 'employee-history-details-form-dialog',
                data: {
                    title: od,
                    employeeId: employeeDetails.id,
                }
            });

        } else if (od === 'LANGUAGES') {
            this.dialogRef = this._matDialog.open(EmployeeLanguages, {
                panelClass: 'employee-language-details-form-dialog',
                data: {
                    title: od,
                    employeeId: employeeDetails.id,
                }
            });

        } else if (od === 'MEMBERSHIP') {
            this.dialogRef = this._matDialog.open(EmployeeMembership, {
                panelClass: 'employee-membership-details-form-dialog',
                data: {
                    title: od,
                    employeeId: employeeDetails.id,
                }
            });

        } else if (od === 'MILITARY_SERVICE') {
            this.dialogRef = this._matDialog.open(EmployeeMilitaryService, {
                panelClass: 'employee-military-service-details-form-dialog',
                data: {
                    title: od,
                    employeeId: employeeDetails.id,
                }
            });

        } else if (od === 'PHONE_NUMBER') {
            this.dialogRef = this._matDialog.open(EmployeePhoneNumber, {
                panelClass: 'employee-phone-number-details-form-dialog',
                data: {
                    title: od,
                    employeeId: employeeDetails.id,
                }
            });

        } else if (od === 'QUALIFICATIONS') {
            this.dialogRef = this._matDialog.open(EmployeeQualifications, {
                panelClass: 'employee-qualification-details-form-dialog',
                data: {
                    title: od,
                    employeeId: employeeDetails.id,
                }
            });

        } else if (od === 'RELATIONS') {
            this.dialogRef = this._matDialog.open(EmployeeRelations, {
                panelClass: 'employee-relations-details-form-dialog',
                data: {
                    title: od,
                    employeeId: employeeDetails.id,
                }
            });

        } else if (od === 'SCHOOLS_ATTENDED') {
            this.dialogRef = this._matDialog.open(EmployeeSchoolAttended, {
                panelClass: 'employee-school-attended-details-form-dialog',
                data: {
                    title: od,
                    employeeId: employeeDetails.id,
                }
            });

        } else if (od === 'BACKGROUND') {
            this.dialogRef = this._matDialog.open(EmployeeBackground, {
                panelClass: 'employee-background-details-form-dialog',
                data: {
                    title: od,
                    employeeId: employeeDetails.id,
                }
            });

        }
    }

    exportSummary() {
        this.exportOpen = !this.exportOpen;
    }

    downloadSummary(id, type) {
        const params = {
            'type': type
        };
        this.employeesService.getEmployeesDetailsDownload(id, params).subscribe(data => {
            // console.log('data', data);
            window.open(data.url, '_blank');
        });
    }
}
