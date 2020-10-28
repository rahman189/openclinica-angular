import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SubjectMatrixComponent } from './pages/subject-matrix/subject-matrix.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { StudyAuditLogComponent } from './pages/study-audit-log/study-audit-log.component';
import { NotesDiscrepanciesComponent } from './pages/notes-discrepancies/notes-discrepancies.component';
import { ViewSubjectComponent } from './pages/view-subject/view-subject.component';
import { StudyEventDefinitionComponent } from './pages/study-event-definition/study-event-definition.component';
const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {path: '', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'subject-matrix', component: SubjectMatrixComponent, canActivate: [AuthGuard]},
      {path: 'study-audit-log', component: StudyAuditLogComponent, canActivate: [AuthGuard]},
      {path: 'notes-discrepancies', component: NotesDiscrepanciesComponent, canActivate: [AuthGuard]},
      {path: 'view-subject', component: ViewSubjectComponent, canActivate: [AuthGuard]},
      {path: 'study-event-definition', component: StudyEventDefinitionComponent, canActivate: [AuthGuard]}
    ],
    canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
