import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';
import { CustomFormsModule } from 'ng2-validation';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routing } from './app.routing';
import { ListaService } from './lista.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ExtendedXHRBackend } from './extended-xhrbackend';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SideNavComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    MaterializeModule,
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
