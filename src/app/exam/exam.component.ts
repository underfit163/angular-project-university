import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Teacher} from "../entities/Teacher";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {TeacherService} from "../services/teacher.service";
import {TokenStorageService} from "../services/token-storage.service";
import {Exam} from "../entities/Exam";
import {ExamService} from "../services/exam.service";
import {ExamDialogComponent} from "./exam-dialog/exam-dialog.component";
import {SubjectService} from "../services/subject.service";
import {Subject} from "../entities/Subject";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'passtype', 'totalhours', 'semester', 'subjectidfk', 'teacheridfk'];
  dataSource: MatTableDataSource<Exam> = new MatTableDataSource<Exam>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Exam>(false, []);
  teachers!: Teacher[];
  subjects!: Subject[];

  role: string | undefined;

  constructor(public dialog: MatDialog,
              private examService: ExamService,
              private tokenStorage: TokenStorageService,
              private teacherService: TeacherService,
              private subjectService: SubjectService) {
  }

  ngOnInit(): void {
    this.role = this.tokenStorage.getUser().role;
    this.getAllData();
    this.getAllSubjects();
    this.getAllTeachers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Exam): string {
    return `${this.selection.isSelected(<Exam>row) ? 'deselect' : 'select'}`;
  }

  //---------------------------------------------------
  getAllSubjects() {
    this.subjectService.getSubjects().subscribe({
      next: data => {
        this.subjects = data;
      },
      error: err => {
        alert(err.message);
        return [];
      }
    });
  }

  getAllTeachers() {
    this.teacherService.getTeachers().subscribe({
      next: data => {
        this.teachers = data;
      },
      error: err => {
        alert(err.message);
        return [];
      }
    });
  }

  getAllData() {
    this.examService.getExams().subscribe({
      next: data => {
        this.dataSource.data = data;
      },
      error: err => {
        alert(err.message);
        return [];
      }
    });
  }

  openAddDataDialog() {
    this.dialog.open(ExamDialogComponent, {
      data: [
        this.subjects,
        this.teachers
      ]
    })
      .afterClosed().subscribe((data) => {
      if (data) {
        this.getAllData();
      }
    });
  }

  openUpdateDataDialog() {
    this.dialog.open(ExamDialogComponent, {
      data: [
        this.subjects,
        this.teachers,
        this.selection.selected[0]
      ]
    }).afterClosed().subscribe(data => {
      if (data) {
        this.getAllData();
        this.selection.clear();
      }
    });
  }

  openDeleteDataDialog() {
    this.examService.deleteExam(this.selection.selected[0]?.id).subscribe({
      next: () => {
        alert("Успешное удаление!");
        this.getAllData();
        this.selection.clear();
      },
      error: err => {
        alert("Ошибка удаления: " + err.message);
      }
    });
  }
}
