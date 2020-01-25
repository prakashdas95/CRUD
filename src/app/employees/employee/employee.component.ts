import { NotificationService } from './../../shared/notification.service';
import { DepartmentService } from './../../shared/department.service';
import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService, private notificationService: NotificationService
    , private dialogRef: MatDialogRef<EmployeeComponent>) { }

  ngOnInit() {
    this.employeeService.getEmployees();
  }


  // *****clear button********
  onClear() {
    this.employeeService.form.reset();
    this.employeeService.intializeFormGroup();
    this.notificationService.success('Cleared Successfully')

  }


  onSubmit() {
    // if whole form is valid 
    if (this.employeeService.form.valid) {
      // if there is no key(id) available then we submit newly data
      if (!this.employeeService.form.get('$key').value)
        this.employeeService.insertEmployee(this.employeeService.form.value);
      else
        // if there is key(id) available means user is in edit mode
        this.employeeService.insertEmployee(this.employeeService.form.value);
      this.employeeService.form.reset();
      this.employeeService.intializeFormGroup();
      this.notificationService.success('Submitted Successfully')
      this.onClose();
    }
  }

  onClose() {
    this.employeeService.form.reset();
    this.employeeService.intializeFormGroup();
    this.dialogRef.close();
  }
}
