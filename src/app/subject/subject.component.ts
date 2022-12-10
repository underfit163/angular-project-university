import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {Subject} from "../entities/Subject";
import {MatTableDataSource} from "@angular/material/table";
import {SubjectService} from "../services/subject.service";
import {TokenStorageService} from "../services/token-storage.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'subjectname'];
  dataSource: MatTableDataSource<Subject> = new MatTableDataSource<Subject>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Subject>(false, []);

  role: string | undefined;

  constructor(private subjectService: SubjectService, private tokenStorage: TokenStorageService) {
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
  checkboxLabel(row?: Subject): string {
    return `${this.selection.isSelected(<Subject>row) ? 'deselect' : 'select'}`;
  }

  //---------------------------------------------------

  getAllData() {
    this.subjectService.getSubjects()
      .subscribe({
        next: data => {
          this.dataSource.data = data;
        },
        error: err => {
          alert(err.message);
          return [];
        }
      });
  }

  addData() {
    console.log(this.selection.selected[0])
  }

  updateData() {
    console.log(this.selection.selected[0])
  }

  deleteData() {
    console.log(this.selection.selected[0]?.id)
    if (this.selection.selected[0]) this.subjectService.deleteSubject(this.selection.selected[0].id).subscribe({
      next: _ => {
        alert("Успешное удаление!");
        this.getAllData();
      },
      error: err => {
        alert("Ошибка удаления: " + err.message);
      }
    });
  }
}
