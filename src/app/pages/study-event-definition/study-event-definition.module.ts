import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyEventDefinitionRoutingModule } from './study-event-definition-routing.module';
import { StudyEventDefinitionComponent } from './study-event-definition.component';
import { StudyEventDefinitionDialog } from './study-event-definition.component'
import { SharedModule } from '../../shared/shared.modules'

@NgModule({
  imports: [
    CommonModule,
    StudyEventDefinitionRoutingModule,
    SharedModule
  ],
  declarations: [StudyEventDefinitionComponent, StudyEventDefinitionDialog]
})
export class StudyEventDefinitionModule { }