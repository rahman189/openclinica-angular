import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSubjectRoutingModule } from './view-subject-routing.module';
import { ViewSubjectComponent } from './view-subject.component';
import { DialogEditStudySubject } from './view-subject.component'
import { DialogEditSubject } from './view-subject.component'
import { SharedModule } from '../../shared/shared.modules'

@NgModule({
  imports: [
    CommonModule,
    ViewSubjectRoutingModule,
    SharedModule
  ],
  declarations: [ViewSubjectComponent, DialogEditStudySubject, DialogEditSubject]
})
export class ViewSubjectModule { }