import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {TokenStorageService} from "../services/token-storage.service";
import {Mark} from "../entities/Mark";
import {Student} from "../entities/Student";
import {MarkService} from "../services/mark.service";
import {StudentService} from "../services/student.service";
import {MarkDialogComponent} from "./mark-dialog/mark-dialog.component";
import {parseStringToDate} from "../helpers/help-functions";

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'evaluation', 'passdate', 'studentidfk'];
  dataSource: MatTableDataSource<Mark> = new MatTableDataSource<Mark>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Mark>(false, []);
  students!: Student[];

  role: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public examId: number,
              public dialog: MatDialog,
              private markService: MarkService,
              private tokenStorage: TokenStorageService,
              private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.role = this.tokenStorage.getUser().role;
    this.getAllData();
    this.getAllStudents();
  }

  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'studentidfk':
          return this.students?.find(student => student.id == item.studentidfk)?.fio;
        default: // @ts-ignore
          return item[property];
      }
    };
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Mark): string {
    return `${this.selection.isSelected(<Mark>row) ? 'deselect' : 'select'}`;
  }

  //---------------------------------------------------
  getAllStudents() {
    this.studentService.getStudents().subscribe({
      next: data => {
        this.students = data;
      },
      error: err => {
        alert(err.message);
        return [];
      }
    });
  }


  getAllData() {
    console.log(this.examId)
    this.markService.getMarksByIdExam(this.examId).subscribe({
      next: data => {
        data.map(value => {
          value.passdate = parseStringToDate(value.passdate)
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
    this.dialog.open(MarkDialogComponent, {
      data: [
        this.students,
        this.examId
      ]
    }).afterClosed().subscribe((data) => {
      if (data) {
        this.getAllData();
      }
    });
  }

  openUpdateDataDialog() {
    this.dialog.open(MarkDialogComponent, {
      data: [
        this.students,
        this.examId,
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
    this.markService.deleteMark(this.selection.selected[0]?.id).subscribe({
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
