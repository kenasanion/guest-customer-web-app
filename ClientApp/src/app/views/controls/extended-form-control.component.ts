import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { FormType } from "src/app/models/client/form-type.model";

export class ExtendedFormGroup extends FormGroup {

    constructor(controls: {
        [key: string]: AbstractControl;
    }, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(controls, validatorOrOpts);
    }

    public override get(path: Array<string | number> | string): ExtendedFormControl {
        return super.get(path) as ExtendedFormControl;
    }
}

export class ExtendedFormControl extends FormControl {
    public displayName: string = '';
    public inputType: string = '';
    public formType: FormType = FormType.Default;

    public dataSource: any;
    public lookupService: any;
    public displayValueBind: string = 'name';

    public minLength: number = 0;
    public maxLength: number = 0;
    public required: boolean = false;

    constructor(displayName: string,
                formType: FormType,
                data?: {
                    lookupService?: any,
                    displayValueBind?: string,
                    dataSource?: any,
                    formState?: any,
                    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
                    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
                }) {
        super(ExtendedFormControl.getDefaultValue(data, formType), data?.validatorOrOpts);

        this.formType = formType;
        this.lookupService = data?.lookupService;
        this.displayValueBind = data?.displayValueBind ?? 'name';
        this.dataSource = data?.dataSource;
        this.displayName = displayName;

        this.addValidators(this.getDefaultFormValidators());

        if (this.hasValidator(Validators.required))
            this.required = true;

        this.updateValueAndValidity();
    }

    private static getDefaultValue(data: any, formType: FormType): any {
        if (data?.formState) return data.formState;

        switch(formType) {
            case FormType.Number:
                return 0;
            case FormType.Date: return new Date();
            case FormType.Currency:
            case FormType.Number:
                return 0;
            case FormType.Album:
            case FormType.Array:
            case FormType.MultiGroupCategory:
            case FormType.MultiLookup:
                return [];
            case FormType.MultiLookup:
                return {};
            case FormType.Boolean:
                return false;
            case FormType.ShortText:
            case FormType.LongText:
            case FormType.ShortCode:
            case FormType.UserName:
            case FormType.Password:
            case FormType.Email:
            case FormType.Gender:
            case FormType.GroupCategory:
            case FormType.OperatingHours:
            case FormType.ContactNumber:
            case FormType.Type:
                return '';
            default: return null;
        }
    }

    private getDefaultFormValidators(): ValidatorFn | ValidatorFn[] {
        switch(this.formType) {
            case FormType.Date:
                this.inputType = 'date';
                return [];
            case FormType.OperatingHours:
                return [];
            case FormType.Address:
                return [];
            case FormType.Default:
                return [];
            case FormType.ForeignKey:
                this.minLength = 1;
                this.setValue(0);
                return [Validators.min(1)];
            case FormType.UserName:
                this.inputType = 'text';
                this.required = true;
                this.maxLength = 256;
                return [Validators.required, Validators.maxLength(256)];
            case FormType.Password:
                this.inputType = 'password';
                this.required = true;
                this.minLength = 6;
                this.maxLength = 150;
                return [Validators.required, Validators.minLength(6), Validators.maxLength(150)];
            case FormType.Name:
                this.inputType = 'text';
                this.required = true;
                this.minLength = 2;
                this.maxLength = 150;
                return [Validators.required, Validators.minLength(2), Validators.maxLength(250)];
            case FormType.Email:
                this.inputType = 'text';
                this.maxLength = 320;
                return [Validators.maxLength(320), Validators.email];
            case FormType.Gender:
                this.inputType = 'text';
                this.maxLength = 100;
                return [Validators.maxLength(100)];
            case FormType.Enum:
                this.inputType = 'text';
                this.maxLength = 50;
                return [Validators.maxLength(50)];
            case FormType.Type:
                this.inputType = 'text';
                this.required = true;
                this.maxLength = 50;
                return [Validators.required, Validators.maxLength(50)];
            case FormType.Array:
            case FormType.MultiGroupCategory:
                return [];
            case FormType.GroupCategory:
                this.inputType = 'text';
                this.required = true;
                this.maxLength = 100;
                return [Validators.required, Validators.maxLength(100)];
            case FormType.ShortText:
                this.inputType = 'text';
                this.maxLength = 150;
                return [Validators.maxLength(150)];
            case FormType.LongText:
                this.inputType = 'text';
                this.maxLength = 1000;
                return [Validators.maxLength(1000)];
            case FormType.ShortCode:
                this.inputType = 'text';
                this.maxLength = 20;
                return [Validators.maxLength(20)];
            case FormType.ContactNumber:
                this.inputType = 'text';
                // Will match an empty string $|
                // or a mobile digit pattern...
                return [Validators.pattern(/^$|(\+\d{1,3}[- ]?)?\d$/)];
            case FormType.Number:
                this.inputType = 'number';
                return [];
            case FormType.Currency:
                this.inputType = 'number';
                return [];
            case FormType.Album:
            case FormType.Image:
                return [];
            default:
                return [];
        }
    }
}
