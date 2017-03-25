import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterializeModule } from 'ng2-materialize';

import { AdminRoutingModule } from './admin.routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterializeModule.forRoot(),
    AdminRoutingModule
  ],
  exports: [],
  declarations: [
    SideNavComponent,
    NavBarComponent,
    AdminComponent
  ],
  providers: [],
})
export class AdminModule {}
