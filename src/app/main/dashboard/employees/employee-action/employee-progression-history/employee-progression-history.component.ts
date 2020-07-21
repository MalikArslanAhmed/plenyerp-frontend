import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'app/shared/services/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { JobPositionsListSelectComponent } from '../../job-positions-list-select/job-positions-list-select.component';
import { DepartmentListSelectComponent } from 'app/main/dashboard/structure/department-list/department-list-select.component';
import { WorkLocationsListSelectComponent } from '../../work-locations-list-select/work-locations-list-select.component';
import { StructureService } from 'app/shared/services/structure.service';
import { SalaryScalesService } from 'app/shared/services/salary-scales.service';

@Component({
  selector: 'app-employee-progression-history',
  templateUrl: './employee-progression-history.component.html',
  styleUrls: ['./employee-progression-history.component.scss']
})
export class EmployeeProgressionHistoryComponent implements OnInit {

  action: any;
  employeeProgressionForm: FormGroup;
  isSubmitted = false;
  updateData: any;
  dialogRef: any;
  currentEmployee: any;
  jobPositions = [];
  departments = [];
  workLocations = [];
  designations = [];
  salaryScales = [];
  gradeLevels = [];
  gradeLevelSteps = [];
  constructor(private employeesService: EmployeeService,
    public matDialogRef: MatDialogRef<EmployeeProgressionHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private fb: FormBuilder,
    private _matDialog: MatDialog,
    private structureService: StructureService,
    private salaryScalesService: SalaryScalesService) {
    this.action = _data.action;
    this.currentEmployee = _data.selectedEmployee;
// if (this.action === 'EDIT') {
//   if (_data.bankDetails) {
//     this.updateData = _data;
//   }
// }
}
  ngOnInit(): void {
    this.refresh();
    this.getDesignations();
    this.getSalaryScales();
  }

      refresh()
      {
        console.log(this.currentEmployee)
        this.employeeProgressionForm = this.fb.group({
          currentAppointment: ['', Validators.required],
          jobPositionId: ['', Validators.required],
          departmentId: ['', Validators.required],
          workLocationId: ['', Validators.required],
          designationId: ['', Validators.required],
          salaryScaleId: ['', Validators.required],
          gradeLevelId: ['', Validators.required],
          gradeLevelStepId: ['', Validators.required]
        });
      }
 
      jobPositionListSelect() {
        this.dialogRef = this._matDialog.open(JobPositionsListSelectComponent, {
            panelClass: 'jobposition-form-dialog',
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            // console.log('response job---->', response);
            // console.log('salary scale---->', this.salaryScales);
            // console.log('gradelevels---->', this.gradeLevels);
            if (!response) {
                return;
            }
            this.jobPositions = [{
                'name': response.name,
                'id': response.id
            }];
            this.employeeProgressionForm.patchValue({
                jobPositionId: response.id,
                disabled: true
            });
            // if (this.salaryScales && this.salaryScales.length > 0) 
            // {
            //     let salaryScales = this.salaryScales.find(function(salaryScale) {
            //         return (salaryScale.id === response.salaryScaleId);
            //     });

            //     console.log('let salary scale---->', salaryScales);

            //     // this.salaryScales = [{
            //     //     'id': salaryScales.id,
            //     //     'name': salaryScales.name
            //     // }];
            //     // console.log('new salary scale---->', this.salaryScales);
            //     this.jobProfileSalaryPlacementForm.patchValue({
            //         'salaryScaleId': salaryScales.id
            //     });
            //     if (salaryScales) {
            //         if (salaryScales['gradeLevels'] && salaryScales['gradeLevels'].length > 0) {
            //             this.gradeLevels = salaryScales['gradeLevels'];
            //             let gradeLevels = salaryScales['gradeLevels'].find(function(gradeLevel) {
            //                 return (gradeLevel.id === response.gradeLevelId);
            //             });

            //             console.log('this gradelevels---->', this.gradeLevels);
            //             console.log('let gradelevels---->', gradeLevels);
            //             // this.gradeLevels = [{
            //             //     'id': gradeLevels.id,
            //             //     'name': gradeLevels.name
            //             // }];
            //             this.jobProfileSalaryPlacementForm.patchValue({
            //                 'gradeLevelId': gradeLevels.id
            //             });

            //             if (gradeLevels && gradeLevels['gradeLevelSteps'].length > 0) {
            //                 this.gradeLevelSteps = gradeLevels['gradeLevelSteps'];
            //                 let gradeLevelSteps = gradeLevels['gradeLevelSteps'].find(function(gradeLevelStep) {
            //                     return (gradeLevelStep.id === response.gradeLevelStepId);
            //                 });

            //                 console.log('this gradelevelsteps---->', this.gradeLevelSteps);
            //                 console.log('let gradelevelsteps---->', gradeLevelSteps);

            //                 // this.gradeLevelSteps = [{
            //                 //     'id': gradeLevelSteps.id,
            //                 //     'name': gradeLevelSteps.name
            //                 // }];
            //                 this.jobProfileSalaryPlacementForm.patchValue({
            //                     'gradeLevelStepId': gradeLevelSteps.id
            //                 });
            //             }
            //         }
            //     }
            // }
        });
    }

    adminUnitListSelect() {
      this.dialogRef = this._matDialog.open(DepartmentListSelectComponent, {
          panelClass: 'contact-form-dialog',
      });
      this.dialogRef.afterClosed().subscribe((response) => {
          if (!response) {
              return;
          }
          this.departments = [{
              'name': response.name,
              'id': response.id
          }];
          this.employeeProgressionForm.patchValue({
              departmentId: response.id,
              disabled: true
          });
      });
    }

    workLocationListSelect() {
      this.dialogRef = this._matDialog.open(WorkLocationsListSelectComponent, {
          panelClass: 'contact-form-dialog',
      });
      this.dialogRef.afterClosed().subscribe((response) => {
          if (!response) {
              return;
          }
          this.workLocations = [{
              'name': response.name,
              'id': response.id
          }];
          this.employeeProgressionForm.patchValue({
              workLocationId: response.id,
              disabled: true
          });
      });
    }

    getDesignations() {
      this.structureService.getDesignations({'page': -1, 'isActive': 1,orderby: 'name'}).subscribe(data => {
          this.designations = data.items;
      });
    }
    getSalaryScales() {
      this.salaryScalesService.getSalaryScales({'page': -1, 'isActive': 1,orderby: 'name'}).subscribe(data => {
          this.salaryScales = data;
      });
    }

    salaryScaleChange(data, action?) {
      let salaryScales = this.salaryScales.find(function(salaryScale) {
          return (salaryScale.id === data);
      });
      this.gradeLevels = salaryScales['gradeLevels'];

      if (!action) {
          this.gradeScaleChange();
      }
    }

    gradeScaleChange(data?) {
      if (data) {
          let gradeScales = this.gradeLevels.find(function(gradeLevel) {
              return (gradeLevel.id === data);
          });
          this.gradeLevelSteps = gradeScales['gradeLevelSteps'];
        } else {
          this.gradeLevelSteps = [];
      }

    }

    saveEmployeeProgressDetails()
    {
      this.employeeProgressionForm.value['currentAppointment'] = this.employeeProgressionForm.value['currentAppointment'].format('YYYY-MM-DD');
      console.log('this.employeeProgressionForm', this.employeeProgressionForm.value);
    }

}
