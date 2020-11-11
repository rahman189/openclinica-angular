import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudyEventDefinitionComponent } from './study-event-definition.component';


const routes: Routes = [
  {
    path: '',
    component: StudyEventDefinitionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyEventDefinitionRoutingModule { }