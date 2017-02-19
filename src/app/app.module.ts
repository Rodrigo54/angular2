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
import { ExtendedXHRBackend } from './extended-xhrbackend';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    DashboardModule
  ],
  providers: [
    { provide: XHRBackend, useClass: ExtendedXHRBackend },
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
