import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Student} from "../../entities/Student";
import * as moment from "moment";
import {StudentService} from "../../services/student.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {
  form: FormGroup;
  actionBtn: string = "Добавить";
  submitClick: boolean = false;
  maxDate: any = moment().subtract(10, 'years');

  constructor(
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: Student,
    private studentService: StudentService) {
    this.form = this.fb.group({
      fio: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      gender: [null],
      phone: [null, [Validators.minLength(5), Validators.pattern('^[0-9]*$')]],
      email: [null, [Validators.email]],
    });
  }

  ngOnInit(): void {
    if (this.editData) {
      this.actionBtn = "Изменить";
      this.form.controls["fio"].setValue(this.editData.fio);
      this.form.controls["birthday"].setValue(this.editData.birthday);
      this.form.controls["gender"].setValue(this.editData.gender);
      this.form.controls["phone"].setValue(this.editData.phone);
      this.form.controls["email"].setValue(this.editData.email);
    }
  }

  onSubmit(): void {
    if (!this.editData) {
      this.addData();
    } else {
      this.updateData();
    }
  }

  addData() {
    this.studentService.createStudent(this.form.value).subscribe({
      next: () => {
        alert("Запись успешно добавлена!");

        this.submitClick = true;
        //this.form.reset();
        //this.dialogRef.close("save");

      },
      error: err => {
        alert("Ошибка добавления записи! " + err.message);
      }
    });
  }

  updateData() {
    this.studentService.updateStudent(this.editData.id, this.form.value).subscribe(
      {
        next: () => {
          alert("Запись успешно обновлена!");
          this.submitClick = true;
          //this.form.reset();
          //this.dialogRef.close("update");
        },
        error: err => {
          alert("Ошибка обновления записи! " + err.message);
        }
      });
  }

  onClose() {
    this.dialogRef.close(this.submitClick);
  }
}
