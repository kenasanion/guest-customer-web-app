import { Component, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, } from '@angular/forms';

@Component({
  selector: 'extended-recaptcha-control',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.scss'],
})
export class ExtendedRecaptchaComponent implements ControlValueAccessor {
  currentToken: string = '';

  touched = false;
  disabled = false;

  onChange = (currentToken: string) => {};
  onTouched = () => {};

  constructor(@Self() @Optional() private ngControl: NgControl) {
    if (ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  public get invalid(): boolean|null {
    return this.ngControl ? this.ngControl.invalid : false;
  }

  public get dirty(): boolean|null {
    return this.ngControl ? this.ngControl.dirty : false;
  }

  writeValue(currentToken: string) {
    this.currentToken = currentToken;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
