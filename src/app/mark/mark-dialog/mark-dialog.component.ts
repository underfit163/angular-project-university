import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Student} from "../../entities/Student";
import {MarkService} from "../../services/mark.service";
import * as moment from "moment";

@Component({
  selector: 'app-mark-dialog',
  templateUrl: './mark-dialog.component.html',
  styleUrls: ['./mark-dialog.component.css']
})
export class MarkDialogComponent implements OnInit {
  form: FormGroup;
  actionBtn: string = "Добавить";
  submitClick: boolean = false;
  students!: Student[];
  maxDate: any = moment();


  constructor(
    public dialogRef: MatDialogRef<MarkDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private markService: MarkService) {
    this.form = this.fb.group({
      evaluation: [null, [Validators.required]],
      passdate: [null, [Validators.required]],
      studentidfk: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.students = this.data[0];
    if (this.data[2]) {
      this.actionBtn = "Изменить";
      this.form.controls["evaluation"].setValue(this.data[2].evaluation);
      this.form.controls["passdate"].setValue(this.data[2].passdate);
      this.form.controls["studentidfk"].setValue(this.data[2].studentidfk);
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
    this.markService.createMark(this.form.value, this.data[1]).subscribe({
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
    this.markService.updateMark(this.data[2].id, this.form.value, this.data[1]).subscribe(
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
