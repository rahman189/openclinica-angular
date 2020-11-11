import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectMatrixRoutingModule } from './subject-matrix-routing.module';
import { SubjectMatrixComponent } from './subject-matrix.component';
import { DialogOverviewExampleDialog } from './subject-matrix.component'
import { SharedModule } from '../../shared/shared.modules'

@NgModule({
  imports: [
    CommonModule,
    SubjectMatrixRoutingModule,
    SharedModule
  ],
  declarations: [SubjectMatrixComponent, DialogOverviewExampleDialog]
})
export class SubjectMatrixModule { }