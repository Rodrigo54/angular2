import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { CustomFormsModule } from 'ng2-validation'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routing } from './app.routing';
import { ListaService } from './lista.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ExtendedXHRBackend } from './extended-xhrbackend';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    MaterialModule.forRoot(),
    CustomFormsModule
  ],
  providers: [
    { provide: XHRBackend, useClass: ExtendedXHRBackend },
    ListaService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
