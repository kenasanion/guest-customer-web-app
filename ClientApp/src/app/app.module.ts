import { NgModule } from '@angular/core';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GAPPSharedModule } from './shared.module';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HomePage } from './views/pages/home-page/home.page';
import { GuestBarLineComponent } from './views/controls/guest-bar-line/guest-bar-line.component';
import { NavBarComponent } from './views/controls/nav-bar/nav-bar.component';
import { FooterComponent } from './views/controls/footer/footer.component';
import { BenefitsListComponent } from './views/components/guest-benefits-list/guest-benefits-list.component';
import { GuestDashboardSectionComponent } from './views/components/guest-dashboard-section/guest-dashboard-section.component';
import { GuestPhoneSectionComponent } from './views/components/guest-phone-section/guest-phone-section.component';

export function getToken() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,

    GuestBarLineComponent,
    NavBarComponent,
    FooterComponent,

    HomePage,
    GuestPhoneSectionComponent,
    BenefitsListComponent,
    GuestDashboardSectionComponent,
  ],
  imports: [
    GAPPSharedModule,
    AppRoutingModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        allowedDomains: [environment.baseUrl],
        disallowedRoutes: []
      }
    }),

    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
    }),
  ],
  providers: [
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
