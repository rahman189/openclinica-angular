import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SubjectMatrixComponent } from './pages/subject-matrix/subject-matrix.component';
import { DialogOverviewExampleDialog } from './pages/subject-matrix/subject-matrix.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { JwtInterceptor, ErrorInterceptor } from './helpers';

import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoginComponent } from './pages/login/login.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AppTopBarComponent } from './layout/app-top-bar/app-top-bar.component';
import { AppSideBarComponent } from './layout/app-side-bar/app-side-bar.component';
import { AppFooterComponent } from './layout/app-footer/app-footer.component';
import { TableSubjectSiteComponent } from './components/table-subject-site/table-subject-site.component';
import { TableSubjectStudyComponent } from './components/table-subject-study/table-subject-study.component';
import { StudyProgressComponent } from './components/study-progress/study-progress.component';
import { SubjectCountComponent } from './components/subject-count/subject-count.component';
import { StudyAuditLogComponent } from './pages/study-audit-log/study-audit-log.component';
import { NotesDiscrepanciesComponent } from './pages/notes-discrepancies/notes-discrepancies.component';
import { ViewSubjectComponent } from './pages/view-subject/view-subject.component';
import { DialogEditSubject } from './pages/view-subject/view-subject.component';
import { DialogEditStudySubject } from './pages/view-subject/view-subject.component';
import { StudyEventDefinitionComponent } from './pages/study-event-definition/study-event-definition.component';
import { StudyEventDefinitionDialog } from './pages/study-event-definition/study-event-definition.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    SubjectMatrixComponent,
    DialogOverviewExampleDialog,
    ConfirmDialogComponent,
    LoginComponent,
    AppLayoutComponent,
    AppTopBarComponent,
    AppSideBarComponent,
    AppFooterComponent,
    TableSubjectSiteComponent,
    TableSubjectStudyComponent,
    StudyProgressComponent,
    SubjectCountComponent,
    StudyAuditLogComponent,
    NotesDiscrepanciesComponent,
    ViewSubjectComponent,
    DialogEditSubject,
    DialogEditStudySubject,
    StudyEventDefinitionComponent,
    StudyEventDefinitionDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
