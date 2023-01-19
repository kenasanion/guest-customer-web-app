import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamUtils } from 'src/app/core/utils/query-param.utils';
import { FormType } from 'src/app/models/client/form-type.model';
import { UserService } from 'src/app/services/user.service';
import { ExtendedFormControl } from '../../controls/extended-form-control.component';

@Component({
  selector: 'verify-email-page',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss']
})
export class VerifyEmailPage implements OnInit {
  sendVerifyEmailForm: FormGroup = new FormGroup({
    recoveryEmail: new ExtendedFormControl('Recovery Email', FormType.Email, { validatorOrOpts: [Validators.required] }),
    recaptcha: new ExtendedFormControl('Recaptcha', FormType.Recaptcha, { validatorOrOpts: [Validators.required] }),
  });

  get recoveryEmail() { return this.sendVerifyEmailForm.get('recoveryEmail') as ExtendedFormControl; }
  get recaptcha() { return this.sendVerifyEmailForm.get('recaptcha') as ExtendedFormControl; }

  isSendConfirmEmailSuccess: boolean = false;

  isConfirmingEmail: boolean = false;
  isConfirmEmailSuccess?: boolean;

  isLoading: boolean = false;
  token: string = '';

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _titleService: Title, private _userService: UserService) {
    this._titleService.setTitle('GUEST - Verify Email');
  }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(params => {
      this.recoveryEmail?.setValue(params.get('email'));

      if (params.has('token')) {
        this.token = params.get('token')!;
        this.isConfirmingEmail = true;

        this.verifyEmail();
      }

      QueryParamUtils.removeParamFromUrl(this._router, this._activatedRoute, params, ['email', 'token']);
    });
  }

  goToHome(): void {
    window.open('https://guestapp.ph', '_self');
  }

  sendVerificationEmail(): void {
    if (this.sendVerifyEmailForm.valid) {
      const email = this.recoveryEmail?.value;
      const recaptcha = this.recaptcha?.value;
      this.isLoading = true;

      this._userService.resendEmailVerification(email, recaptcha, false).subscribe(res => {
        if (res) {
          this.isSendConfirmEmailSuccess = res;
          this.isLoading = false;
        }
      }, err => {
        this.recoveryEmail?.setErrors({ api: 'An error occurred when sending an email. Please try again later.' });
        this.isLoading = false;
      });
    }
  }

  verifyEmail(): void {
    if (this.recoveryEmail?.valid && this.token && this.isConfirmEmailSuccess === undefined) {
      this.isLoading = true;

      this._userService.verifyEmail(this.recoveryEmail?.value, this.token).subscribe(res => {
        if (res) {
          this.isConfirmEmailSuccess = res;
          this.isLoading = false;
        }
      }, err => {
        this.isConfirmEmailSuccess = false;
        this.isLoading = false;
      });
    }
  }
}
