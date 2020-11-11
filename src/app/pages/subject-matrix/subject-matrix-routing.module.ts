import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectMatrixComponent } from './subject-matrix.component';


const routes: Routes = [
  {
    path: '',
    component: SubjectMatrixComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectMatrixRoutingModule { }