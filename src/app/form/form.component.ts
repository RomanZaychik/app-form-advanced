import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { asyncUrlValidator, emailValidator, observableUrlValidator, rangeValidator } from '../shared/custom-validators';
import { FORM_ERRORS, FORM_LABELS, FORM_PLACEHOLDERS, FORM_ROLES, FORM_SUCCESS, FORM_VALIDATION_MESSAGES } from '../shared/form-data';
import { User } from '../shared/user';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formLabels = FORM_LABELS;
  formPlaceholders = FORM_PLACEHOLDERS;
  formSuccess = FORM_SUCCESS;
  formErrors: any = FORM_ERRORS;
  validationMessages: any = FORM_VALIDATION_MESSAGES;
  roles = FORM_ROLES;

  userForm!: FormGroup;

  name!: AbstractControl
  password!: AbstractControl
  email!: AbstractControl
  age!: AbstractControl
  site!: AbstractControl
  role!: AbstractControl

  private user: User = new User(1, null, null, null, null, null, null);

  
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }

  onSubmit(): void {
    console.log(this.userForm.valid);
    console.log(this.userForm.value);
  }

  private buildForm() {
    this.userForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: [this.user.password, [Validators.required, Validators.minLength(7), Validators.maxLength(25)]],
      email: [this.user.email, [Validators.required, emailValidator]],
      age: [this.user.age, [Validators.required, rangeValidator(1, 122)]],
      site: [this.user.site, [Validators.required], [observableUrlValidator]],
      role: [this.user.role, [Validators.required]]
    })

     this.userForm.valueChanges.subscribe(() => this.onValueChanged());
     this.createControls()
  }

  private createControls(): void {
    this.name = this.userForm.controls.name,
    this.password = this.userForm.controls.password,
    this.email = this.userForm.controls.email,
    this.age = this.userForm.controls.age,
    this.site = this.userForm.controls.site,
    this.role = this.userForm.controls.role
  }

  onValueChanged(): void {
         const form = this.userForm;
    
         Object.keys(this.formErrors).forEach(field => {
           this.formErrors[field] = '';

           const control = form.get(field);
          
           if ((control?.dirty || control?.touched) && control.invalid) {
             const message = this.validationMessages[field];
             Object.keys(control.errors as any).some(key => this.formErrors[field] = message[key])
           }
         })
}

}
