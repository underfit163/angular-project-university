import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {TokenStorageService} from "../services/token-storage.service";
import {Teacher} from "../entities/Teacher";
import {TeacherService} from "../services/teacher.service";
import {parseStringToDate} from "../helpers/help-functions";
import {TeacherDialogComponent} from "./teacher-dialog/teacher-dialog.component";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'fio', 'birthday', 'gender', 'title', 'teacherdegree', 'phone'];
  dataSource: MatTableDataSource<Teacher> = new MatTableDataSource<Teacher>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Teacher>(false, []);

  role: string | undefined;

  constructor(public dialog: MatDialog, private teacherService: TeacherService,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.role = this.tokenStorage.getUser().role;
    this.getAllData();
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
  checkboxLabel(row?: Teacher): string {
    return `${this.selection.isSelected(<Teacher>row) ? 'deselect' : 'select'}`;
  }

  //---------------------------------------------------
  getAllData() {
    this.teacherService.getTeachers()
      .subscribe({
        next: data => {
          data.map(value => {
            value.birthday = parseStringToDate(value.birthday)
          });
          this.dataSource.data = data;
        },
        error: err => {
          alert(err.message);
          return [];
        }
      });
  }

  openAddDataDialog() {
    this.dialog.open(TeacherDialogComponent)
      .afterClosed().subscribe((data) => {
      if (data) {
        this.getAllData();
      }
    });
  }

  openUpdateDataDialog() {
    this.dialog.open(TeacherDialogComponent, {
      data: this.selection.selected[0]
    }).afterClosed().subscribe(data => {
      if (data) {
        this.getAllData();
        this.selection.clear();
      }
    });
  }

  openDeleteDataDialog() {
    this.teacherService.deleteTeacher(this.selection.selected[0]?.id).subscribe({
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
