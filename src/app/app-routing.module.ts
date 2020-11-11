import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { StudyAuditLogComponent } from './pages/study-audit-log/study-audit-log.component';
import { NotesDiscrepanciesComponent } from './pages/notes-discrepancies/notes-discrepancies.component';
const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {path: 'dashboard', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
      {path: 'subject-matrix', loadChildren: () => import('./pages/subject-matrix/subject-matrix.module').then(m => m.SubjectMatrixModule), canActivate: [AuthGuard]},
      {path: 'study-audit-log', component: StudyAuditLogComponent, canActivate: [AuthGuard]},
      {path: 'notes-discrepancies', component: NotesDiscrepanciesComponent, canActivate: [AuthGuard]},
      {path: 'view-subject', loadChildren: () => import('./pages/view-subject/view-subject.module').then(m => m.ViewSubjectModule), canActivate: [AuthGuard]},
      {path: 'study-event-definition', loadChildren: () => import('./pages/study-event-definition/study-event-definition.module').then(m => m.StudyEventDefinitionModule), canActivate: [AuthGuard]}
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
