import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './views/pages/home-page/home.page';
import { ResetPasswordPage } from './views/pages/reset-password/reset-password.page';
import { VerifyEmailPage } from './views/pages/verify-email/verify-email.page';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'verify-email',
    component: VerifyEmailPage,
  },
  {
    path: 'reset-password',
    component: ResetPasswordPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
