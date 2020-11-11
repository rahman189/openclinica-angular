import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.modules'
import { TableSubjectSiteComponent } from '../../components/table-subject-site/table-subject-site.component';
import { TableSubjectStudyComponent } from '../../components/table-subject-study/table-subject-study.component';
import { StudyProgressComponent } from '../../components/study-progress/study-progress.component';
import { SubjectCountComponent } from '../../components/subject-count/subject-count.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    TableSubjectSiteComponent,
    TableSubjectStudyComponent,
    StudyProgressComponent,
    SubjectCountComponent
  ]
})
export class HomeModule { }