import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule, DateFormatPipe } from 'ngx-moment';

import { JwtInterceptor, ErrorInterceptor } from './helpers';

import { LoginComponent } from './pages/login/login.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AppTopBarComponent } from './layout/app-top-bar/app-top-bar.component';
import { AppSideBarComponent } from './layout/app-side-bar/app-side-bar.component';
import { AppFooterComponent } from './layout/app-footer/app-footer.component';
import { StudyAuditLogComponent } from './pages/study-audit-log/study-audit-log.component';
import { NotesDiscrepanciesComponent } from './pages/notes-discrepancies/notes-discrepancies.component';

import { SharedModule } from './shared/shared.modules';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    AppLayoutComponent,
    AppTopBarComponent,
    AppSideBarComponent,
    AppFooterComponent,
    StudyAuditLogComponent,
    NotesDiscrepanciesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MomentModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DateFormatPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
