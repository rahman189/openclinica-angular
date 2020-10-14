import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { SubjectMatrixComponent } from './page/subject-matrix/subject-matrix.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'subject-matrix', component: SubjectMatrixComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
