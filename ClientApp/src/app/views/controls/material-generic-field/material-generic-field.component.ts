import { ComponentType } from '@angular/cdk/portal';
import { AfterContentInit, ChangeDetectorRef, Component, EventEmitter, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FormType } from 'src/app/models/client/form-type.model';
import { ServiceBase } from 'src/app/services/base.service';
import { ExtendedFormControl } from '../extended-form-control.component';

export class MaterialLookupFieldArgs {
  service: ServiceBase = {} as ServiceBase;
  component: ComponentType<any> = {} as ComponentType<any>;
  preSelectedValues: any[] = [];
  lookupModelDiscriminator: string = '';
  filter: string = '';
  isMultiSelectLookup: boolean = false;

  constructor(component: ComponentType<any>, service: ServiceBase) {
    this.component = component;
    this.service = service;
  }
}

@Component({
  selector: 'mat-generic-field',
  templateUrl: './material-generic-field.component.html',
  styleUrls: ['./material-generic-field.component.scss'],
})
export class MaterialGenericFieldComponent implements AfterContentInit, ControlValueAccessor {
  @Output() valueChanged: EventEmitter<any> = new EventEmitter<any>();

  control: ExtendedFormControl|null = null;
  proxyControl: ExtendedFormControl|null = null;

  imagePreview: any;
  value: any;

  FormType = FormType;
  id = '';

  public minLength: number = 0;
  public maxLength: number = 0;
  public required: boolean = false;

  public dialogLookupParams?: MaterialLookupFieldArgs;

  touched = false;
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  contactNumberPrefix = '+63';

  constructor(@Self() @Optional() public ngControl: NgControl, private cdr: ChangeDetectorRef) {
    if (ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit(): void {
    if (this.ngControl && this.ngControl.control && !this.control) {
      this.control = this.ngControl.control as ExtendedFormControl;
      this.id = this.control?.displayName.toLowerCase().replace(' ', '');
      this.minLength = this.control?.minLength;
      this.maxLength = this.control?.maxLength;
      this.required = this.control?.required;

      if (this.control.lookupService) {
        // this.dialogLookupParams = new MaterialLookupFieldArgs(MaterialLookupDialog, this.control.lookupService);
      }

      if (FormType.ContactNumber == this.control?.formType) {
        this.proxyControl = new ExtendedFormControl(this.control.displayName, this.control.formType);

        this.proxyControl?.valueChanges.subscribe(x => {
          if (this.proxyControl?.value) {
            this.control?.setValue(`${this.contactNumberPrefix}${this.proxyControl?.value}`);
          } else {
            this.control?.setValue('');
          }
        });
      }

      if (FormType.Image == this.control?.formType) {
        this.imagePreview = this.control?.value?.fileKey;
      }
      else if (FormType.ContactNumber == this.control?.formType) {
        this.proxyControl?.setValue(this.control?.value.replace(this.contactNumberPrefix, ''), { emitEvent: false });
      }

      this.cdr.detectChanges();
    }
  }

  writeValue(value: any) {
    this.value = value;
  }

  onPreviewChanged(event: any) {
    this.imagePreview = event;
    this.valueChanged?.emit(event);
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;

    if (this.disabled) {
      this.proxyControl?.disable();
    } else {
      this.proxyControl?.enable();
    }
  }

  isPlainTypeControl(): boolean {
    return this.control?.formType !== FormType.LongText &&
           this.control?.formType !== FormType.Type &&
           this.control?.formType !== FormType.Enum &&
           this.control?.formType !== FormType.Date &&
           this.control?.formType !== FormType.ContactNumber;
  }

  getControlErrors(): string {
    var errorList: string[] = [];

    if (this.control?.hasError('api')) {
      return this.control?.getError('api');
    }
    if (this.control?.hasError('required')) {
      errorList.push('is required');
    }
    if (this.control?.hasError('nomatch')) {
      errorList.push('value is not in the range of valid values');
    }
    if (this.control?.hasError('passwordnotmatch')) {
      return 'Passwords do not match.';
    }
    if (this.control?.hasError('minlength')) {
      errorList.push(`should at least be ${this.minLength} characters`);
    }
    if (this.control?.hasError('maxlength')) {
      errorList.push(`should not be more than ${this.maxLength} characters`);
    }
    if (this.control?.formType === FormType.ContactNumber && this.control?.hasError('pattern')) {
      errorList.push(`should follow correct contact number.`);
    }

    var errorPhrase = 'not valid';

    if (errorList.length > 1) {
      var first = errorList.splice(errorList.length - 1, 1);
      var last = errorList[errorList.length - 1];
      errorPhrase = first.join(', ') + ' and ' + last;
    } else if (errorList.length == 1) {
      errorPhrase = errorList[0];
    }

    return `${this.control?.displayName} ${errorPhrase}.`;
  }
}
