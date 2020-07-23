import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'app/shared/services/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { JobPositionsListSelectComponent } from '../../job-positions-list-select/job-positions-list-select.component';
import { DepartmentListSelectComponent } from 'app/main/dashboard/structure/department-list/department-list-select.component';
import { WorkLocationsListSelectComponent } from '../../work-locations-list-select/work-locations-list-select.component';
import { StructureService } from 'app/shared/services/structure.service';
import { SalaryScalesService } from 'app/shared/services/salary-scales.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-employee-progression-history',
  templateUrl: './employee-progression-history.component.html',
  styleUrls: ['./employee-progression-history.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
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
  editAction = false;
  selectedProgression;
  isEdit=false;
  isAdd=false;
  isAddNew=true;

  addNewList=[];
  addCurrentNewList=[];
  displayedBankColumns = ['id', 'valueDate', 'designation', 'department', 'workLocation', 'jobPosition', 'actions'];

  progressionList=[];
  constructor(private employeesService: EmployeeService,
    public matDialogRef: MatDialogRef<EmployeeProgressionHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private fb: FormBuilder,
    private _matDialog: MatDialog,
    private structureService: StructureService,
    private salaryScalesService: SalaryScalesService) {
    this.action = _data.action;
    this.currentEmployee = _data.selectedEmployee;
   // console.log("current",this.currentEmployee);
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
    this.getProgressionDetailsList(this.currentEmployee.id);
  }

      refresh()
      {
        this.employeeProgressionForm = this.fb.group({
          valueDate: ['', Validators.required],
          jobPositionId: ['', Validators.required],
          departmentId: ['', Validators.required],
          workLocationId: ['', Validators.required],
          designationId: ['', Validators.required],
          salaryScaleId: ['', Validators.required],
          gradeLevelId: ['', Validators.required],
          gradeLevelStepId: ['', Validators.required]
        });
      }
      getProgressionDetailsList(empId)
      {
        this.employeesService.getProgressionList(empId).subscribe(data => {
          this.progressionList = data.items;
          if (this.progressionList && this.progressionList.length > 0) {
              let i = 1;
              this.progressionList.forEach(val => {
                  val['sno'] = i;
                  // this.employeeBankDetailsForm.controls['index'].setValue(i+1);
                  i++;

                  this.addNewList=this.progressionList;
              });
          }
      });
      }
 
      jobPositionListSelect() {
        this.dialogRef = this._matDialog.open(JobPositionsListSelectComponent, {
            panelClass: 'contact-form-dialog',
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

    addNewEmployeeProgression()
    {
      this.isAdd=true;
      this.isAddNew=false
      //this.editAction = true;
      //console.log("123",this.addNewList);
      this.addNewList.forEach((value)=>{
        if(value.isActive===true)
        {
          this.addCurrentNewList.push(value);
        }
      });
    //  console.log('add',this.addCurrentNewList)


      this.jobPositions = [{
        'name': this.addCurrentNewList[0].jobPosition && this.addCurrentNewList[0].jobPosition.name ? this.addCurrentNewList[0].jobPosition && this.addCurrentNewList[0].jobPosition.name : '',
        'id': this.addCurrentNewList[0].jobPosition && this.addCurrentNewList[0].jobPosition.id ? this.addCurrentNewList[0].jobPosition && this.addCurrentNewList[0].jobPosition.id : '',
    }];

    this.departments = [{
        'name': this.addCurrentNewList[0].department && this.addCurrentNewList[0].department.name ? this.addCurrentNewList[0].department && this.addCurrentNewList[0].department.name : '',
        'id': this.addCurrentNewList[0].department && this.addCurrentNewList[0].department.id ? this.addCurrentNewList[0].department && this.addCurrentNewList[0].department.id : '',
    }];

    this.workLocations = [{
        'name': this.addCurrentNewList[0].workLocation && this.addCurrentNewList[0].workLocation.name ? this.addCurrentNewList[0].workLocation && this.addCurrentNewList[0].workLocation.name : '',
        'id': this.addCurrentNewList[0].workLocation && this.addCurrentNewList[0].workLocation.id ? this.addCurrentNewList[0].workLocation && this.addCurrentNewList[0].workLocation.id : '',
    }];

      this.salaryScaleChange(this.addCurrentNewList[0].salaryScale && this.addCurrentNewList[0].salaryScale.id, 'edit');
      this.gradeScaleChange(this.addCurrentNewList[0].gradeLevel && this.addCurrentNewList[0].gradeLevel.id);
        this.employeeProgressionForm.patchValue({
          'valueDate':this.addCurrentNewList[0].valueDate,
          'jobPositionId':this.addCurrentNewList[0].jobPositionId,
          'departmentId':this.addCurrentNewList[0].departmentId,
          'workLocationId':this.addCurrentNewList[0].workLocationId,
          'designationId':this.addCurrentNewList[0].designationId,
          'salaryScaleId':this.addCurrentNewList[0].salaryScaleId,
          'gradeLevelId':this.addCurrentNewList[0].gradeLevelId,
          'gradeLevelStepId':this.addCurrentNewList[0].gradeLevelStepId
        });
       // 'designationId':this.addCurrentNewList['designationId'],
        
      

    }

    cancel()
    {
      this.isAdd=false;
      this.isAddNew=true;
      this.employeeProgressionForm.controls['valueDate'].reset();
      this.employeeProgressionForm.controls['jobPositionId'].reset();
      this.employeeProgressionForm.controls['departmentId'].reset();
      this.employeeProgressionForm.controls['workLocationId'].reset();
      this.employeeProgressionForm.controls['designationId'].reset();
      this.employeeProgressionForm.controls['salaryScaleId'].reset();
      this.employeeProgressionForm.controls['gradeLevelId'].reset();
      this.employeeProgressionForm.controls['gradeLevelStepId'].reset();
    }
    saveEmployeeProgressDetails()
    {
      this.isAdd=false;
      this.isAddNew=true;
      //console.log("form",this.employeeProgressionForm.value);
      //this.employeeProgressionForm.value['valueDate'] = this.employeeProgressionForm.value['valueDate'].format('YYYY-MM-DD');
      this.isSubmitted = true;
        if (!this.employeeProgressionForm.valid) {
            this.isSubmitted = false;
            return;
        }
        if (this.isSubmitted) {
          this.employeesService.addEmployeeProgression(this.currentEmployee.id,this.employeeProgressionForm.value).subscribe(data => {
            // this.employeeBankDetailsForm.reset();
            this.employeeProgressionForm.controls['valueDate'].reset();
            this.employeeProgressionForm.controls['jobPositionId'].reset();
            this.employeeProgressionForm.controls['departmentId'].reset();
            this.employeeProgressionForm.controls['workLocationId'].reset();
            this.employeeProgressionForm.controls['designationId'].reset();
            this.employeeProgressionForm.controls['salaryScaleId'].reset();
            this.employeeProgressionForm.controls['gradeLevelId'].reset();
            this.employeeProgressionForm.controls['gradeLevelStepId'].reset();
            this.isSubmitted = false;
            this.getProgressionDetailsList(this.currentEmployee.id);
        });
        }

    }

    
    editProgression(progression)
    {
      this.editAction = true;
      this.isAdd=false;
      this.isAddNew=false;
      this.selectedProgression=progression;

      this.jobPositions = [{
        'name': progression.jobPosition && progression.jobPosition.name ? progression.jobPosition && progression.jobPosition.name : '',
        'id': progression.jobPosition && progression.jobPosition.id ? progression.jobPosition && progression.jobPosition.id : '',
    }];

    this.departments = [{
        'name': progression.department && progression.department.name ? progression.department && progression.department.name : '',
        'id': progression.department && progression.department.id ? progression.department && progression.department.id : '',
    }];

    this.workLocations = [{
        'name': progression.workLocation && progression.workLocation.name ? progression.workLocation && progression.workLocation.name : '',
        'id': progression.workLocation && progression.workLocation.id ? progression.workLocation && progression.workLocation.id : '',
    }];

      this.salaryScaleChange(progression.salaryScale && progression.salaryScale.id, 'edit');
      this.gradeScaleChange(progression.gradeLevel && progression.gradeLevel.id);

      this.employeeProgressionForm.patchValue({
        'valueDate':progression.valueDate,
        'jobPositionId':progression.jobPositionId,
        'departmentId':progression.departmentId,
        'workLocationId':progression.workLocationId,
        'designationId':progression.designationId,
        'salaryScaleId':progression.salaryScaleId,
        'gradeLevelId':progression.gradeLevelId,
        'gradeLevelStepId':progression.gradeLevelStepId
      });
    }

    updateEmployeeProgressionDetails()
    {
      this.isSubmitted = true;
        if (!this.employeeProgressionForm.valid) {
            this.isSubmitted = false;
            return;
        }

        if (this.isSubmitted) {
          this.employeesService.updateProgressionDetails(this.currentEmployee.id,this.selectedProgression.id,this.employeeProgressionForm.value).subscribe(data => {
            this.employeeProgressionForm.controls['valueDate'].reset();
            this.employeeProgressionForm.controls['jobPositionId'].reset();
            this.employeeProgressionForm.controls['departmentId'].reset();
            this.employeeProgressionForm.controls['workLocationId'].reset();
            this.employeeProgressionForm.controls['designationId'].reset();
            this.employeeProgressionForm.controls['salaryScaleId'].reset();
            this.employeeProgressionForm.controls['gradeLevelId'].reset();
            this.employeeProgressionForm.controls['gradeLevelStepId'].reset();
            this.isSubmitted = false;
            this.editAction = false;
            this.getProgressionDetailsList(this.currentEmployee.id);
        });
        }
    }

}
