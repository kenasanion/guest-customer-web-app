import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceBase } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class UserService extends ServiceBase {
    constructor(protected _httpClient: HttpClient) {
        super();
    }

    resetPassword(email: string, code: string, newPassword: string): Observable<boolean> {
        return this._httpClient.post<boolean>(this._rootURL + `/reset-password?email=${email}&code=${code}&newPassword=${newPassword}`, null);
    }

    verifyEmail(email: string, code: string): Observable<boolean> {
        return this._httpClient.post<boolean>(this._rootURL + `/confirm-email?email=${email}&code=${code}`, null);
    }

    sendForgetPasswordEmail(email: string, recaptchaToken: string, resentOnBehalf?: boolean): Observable<boolean> {
        return this._httpClient.post<boolean>(this._rootURL + `/send-reset-password-email?email=${email}&resentOnBehalf=${resentOnBehalf}&recaptchaToken=${recaptchaToken}`, null);
    }

    resendEmailVerification(email: string, recaptchaToken: string, resentOnBehalf?: boolean): Observable<boolean> {
        return this._httpClient.post<boolean>(this._rootURL + `/send-confirmation-email?email=${email}&resentOnBehalf=${resentOnBehalf}&recaptchaToken=${recaptchaToken}`, null);
    }
}
