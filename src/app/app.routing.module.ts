import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
