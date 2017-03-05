import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

// plugins
import { MaterializeModule } from 'angular2-materialize';
import { CustomFormsModule } from 'ng2-validation';

 // meus imports
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { DashboardModule } from './dashboard/dashboard.module';
import { EventosModule } from './eventos/eventos.module';
import { DefaultBackendProvider } from './extended-xhrbackend';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterializeModule,
    CustomFormsModule,
    // meus imports
    AppRoutingModule,
    DashboardModule,
    EventosModule
  ],
  providers: [
    DefaultBackendProvider,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
