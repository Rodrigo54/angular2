import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';

// plugins
import { MaterializeModule } from 'ng2-materialize';
import { CustomFormsModule } from 'ng2-validation';

 // meus imports
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DefaultBackendProvider } from './extended-xhrbackend';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { TabelaComponent } from './tabela/tabela.component';
import { HttpProvider } from './http.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    TabelaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterializeModule.forRoot(),
    CustomFormsModule,
    // meus imports
    AppRoutingModule,
  ],
  providers: [
    DefaultBackendProvider,
    AuthService,
    AuthGuard,
    HttpProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
