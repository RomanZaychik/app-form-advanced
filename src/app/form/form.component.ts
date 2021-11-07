import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator, rangeValidator } from '../shared/custom-validators';
import { User } from '../shared/user';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  userForm!: FormGroup;
  roles: string[] = ['Гость', 'Модератор', 'Администратор'];
  user: User = new User(1, null, null, null, null, null);

  formLabels = {
    name: 'Логин',
    password: 'Пароль',
    email: 'Email',
    age: 'Возраст',
    role: 'Роль'
  }

  formPlaceholders = {
    name: 'Введите логин...',
    password: 'Введите пароль...',
    email: 'Укажите адрес еmail...',
    age: 'Установите возраст...',
    role: 'Выберите роль из списка...'
  }

  formSuccess = {
    name: 'Принято!',
    password: 'Принято!',
    email: 'Принято!',
    age: 'Принято!',
    role: 'Принято!'
  }

  formErrors: any = {
    name: '',
    password: '',
    email: '',
    age: '',
    role: ''
  }

  validationMessages: any = {
    name: {
      required: 'Имя обязательно.',
      minlength: 'Имя должно содержать не менее 4 символов.',
      maxlength: 'Имя должно содержать не более 15 символов.'
    },
    password: {
      required: 'Пароль обязателен.',
      minlength: 'Пароль должен содержать не менее 7 символов.',
      maxlength: 'Пароль должен содержать не более 25 символов.'
    },
    email: {
      required: 'email обязателен.',
      emailValidator: 'Неправильный формат email адреса.'
    },
    age: {
     required: 'Возраст обязателен.',
     rangeValidator: 'Значение должно быть числом в диапазоне 1..122.',
     minRange: 'Значение должно быть больше 1.',
     maxRange: 'Значение должно быть меньше 122.'
    },
    role: {
     required: 'Обязательное поле.'
    }
  }
  
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
      role: [this.user.role, [Validators.required]]
    })

     this.userForm.valueChanges.subscribe(() => this.onValueChanged());
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
