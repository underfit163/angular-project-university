import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ExamService} from "../../services/exam.service";
import {Teacher} from "../../entities/Teacher";
import {Subject} from "../../entities/Subject";

@Component({
  selector: 'app-exam-dialog',
  templateUrl: './exam-dialog.component.html',
  styleUrls: ['./exam-dialog.component.css']
})
export class ExamDialogComponent implements OnInit {
  form: FormGroup;
  actionBtn: string = "Добавить";
  submitClick: boolean = false;
  subjects!: Subject[];
  teachers!: Teacher[];


  constructor(
    public dialogRef: MatDialogRef<ExamDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private examService: ExamService) {
    this.form = this.fb.group({
      passtype: [null, [Validators.required]],
      totalhours: [null, [Validators.required]],
      semester: [null, [Validators.required]],
      subjectidfk: [null],
      teacheridfk: [null]
    });
  }

  ngOnInit(): void {
    this.subjects = this.data[0];
    this.teachers = this.data[1];
    if (this.data[2]) {
      this.actionBtn = "Изменить";
      this.form.controls["passtype"].setValue(this.data[2].passtype);
      this.form.controls["totalhours"].setValue(this.data[2].totalhours);
      this.form.controls["semester"].setValue(this.data[2].semester);
      this.form.controls["subjectidfk"].setValue(this.data[2].subjectidfk);
      this.form.controls["teacheridfk"].setValue(this.data[2].teacheridfk);
    }
  }

  onSubmit(): void {
    if (!this.data[2]) {
      this.addData();
    } else {
      this.updateData();
    }
  }

  addData() {
    this.examService.createExam(this.form.value).subscribe({
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
    this.examService.updateExam(this.data[2].id, this.form.value).subscribe(
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
