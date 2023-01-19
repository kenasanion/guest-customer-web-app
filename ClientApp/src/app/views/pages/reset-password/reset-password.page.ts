import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamUtils } from 'src/app/core/utils/query-param.utils';
import { FormType } from 'src/app/models/client/form-type.model';
import { UserService } from 'src/app/services/user.service';
import { ExtendedFormControl } from '../../controls/extended-form-control.component';

@Component({
  selector: 'reset-password-page',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss']
})
export class ResetPasswordPage implements OnInit {
  sendResetPasswordForm: FormGroup = new FormGroup({
    recoveryEmail: new ExtendedFormControl('Recovery Email', FormType.Email, { validatorOrOpts: [Validators.required] }),
    recaptcha: new ExtendedFormControl('Recaptcha', FormType.Recaptcha, { validatorOrOpts: [Validators.required] }),
  });

  get recoveryEmail() { return this.sendResetPasswordForm.get('recoveryEmail') as ExtendedFormControl; }
  get recaptcha() { return this.sendResetPasswordForm.get('recaptcha') as ExtendedFormControl; }

  resetPasswordForm: FormGroup = new FormGroup({
    password: new ExtendedFormControl('New Password', FormType.Password, { validatorOrOpts: [Validators.required] }),
    confirmPassword: new ExtendedFormControl('Confirm New Password', FormType.Password, { validatorOrOpts: [Validators.required] })
  });

  get password() { return this.resetPasswordForm.get('password') as ExtendedFormControl; }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword') as ExtendedFormControl; }

  isSendPasswordEmailSuccess: boolean = false;

  isResettingPassword: boolean = false;
  isResetPasswordSuccess: boolean = false;

  isLoading: boolean = false;
  token: string = '';

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _titleService: Title, private _userService: UserService) {
    this._titleService.setTitle('GUEST - Reset Password');
  }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('token')) {
        this.recoveryEmail?.setValue(params.get('email'));
        this.token = params.get('token')!;
        this.isResettingPassword = true;
      }

      QueryParamUtils.removeParamFromUrl(this._router, this._activatedRoute, params, ['email', 'token']);
    });
  }

  goToHome(): void {
    window.open('https://guestapp.ph', '_self');
  }

  sendResetPasswordLink(): void {
    if (this.sendResetPasswordForm.valid) {
      const email = this.recoveryEmail?.value;
      const recaptcha = this.recaptcha?.value;
      this.isLoading = true;

      this._userService.sendForgetPasswordEmail(email, recaptcha, false).subscribe(res => {
        if (res) {
          this.isLoading = false;
          this.isSendPasswordEmailSuccess = res;
        }
      }, err => {
        this.isLoading = false;
        this.recoveryEmail?.setErrors({ api: 'An error occurred when sending an email. Please try again later.' });
      })
    }
  }

  resetPassword(): void {
    if (this.password?.value !== this.confirmPassword?.value) {
      this.confirmPassword?.setErrors({ passwordnotmatch: true });
      return;
    }

    if (this.resetPasswordForm.valid) {
      this.isLoading = true;

      this._userService.resetPassword(this.recoveryEmail?.value, this.token, this.password?.value).subscribe(res => {
        if (res) {
          this.isLoading = false;
          this.isResetPasswordSuccess = res;
        }
      }, err => {
        this.isLoading = false;
        this.password?.setErrors({ api: 'An error occurred when resetting the password. Please try again.' });
      })
    }
  }
}
