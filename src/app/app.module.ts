import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {StudentComponent} from './student/student.component';
import {SubjectComponent} from './subject/subject.component';
import {TeacherComponent} from './teacher/teacher.component';
import {ProfileComponent} from './profile/profile.component';
import {httpInterceptorProviders} from "./helpers/http.interceptor";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { DialogComponent } from './subject/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

registerLocaleData(ru);

// определение маршрутов
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'subject', component: SubjectComponent},
  {path: 'student', component: StudentComponent},
  {path: 'teacher', component: TeacherComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [//классы представлений (view classes), которые принадлежат модулю. Angular имеет три типа классов представлений: компоненты (components), директивы (directives), каналы (pipes)
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    StudentComponent,
    SubjectComponent,
    TeacherComponent,
    ProfileComponent,
    DialogComponent
  ],
    imports: [//другие модули, классы которых необходимы для шаблонов компонентов из текущего модуля
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        ReactiveFormsModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
    ],
  providers: [httpInterceptorProviders],//классы, создающие сервисы, используемые модулем
  bootstrap: [AppComponent]//корневой компонент, который вызывается по умолчанию при загрузке приложения
})
export class AppModule {
}
