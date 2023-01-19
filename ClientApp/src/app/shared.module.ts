import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IsLoadingDirectiveModule, IsLoadingPipeModule, IsLoadingService } from '@service-work/is-loading';
import { NgChartsModule } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { ExtendedRecaptchaComponent } from './views/shared/recaptcha/recaptcha.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { MaterialGenericFieldComponent } from './views/controls/material-generic-field/material-generic-field.component';

@NgModule({
  declarations: [
    ExtendedRecaptchaComponent,
    MaterialGenericFieldComponent,
  ],
  exports: [
    DatePipe,

    IsLoadingDirectiveModule,
    IsLoadingPipeModule,

    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    NgxMaterialTimepickerModule,

    NgChartsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatCardModule,

    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    MaterialGenericFieldComponent,
    RecaptchaModule,
    RecaptchaFormsModule,
    ExtendedRecaptchaComponent,
  ],
  imports: [
    IsLoadingDirectiveModule,
    IsLoadingPipeModule,

    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    NgxMaterialTimepickerModule,

    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatCardModule,

    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    IsLoadingService,
    DatePipe,
    CookieService,
    ToastrService,
  ]
})
export class GAPPSharedModule {
  static injector: Injector;
  constructor(injector: Injector) {
    GAPPSharedModule.injector = injector;
  }
}
