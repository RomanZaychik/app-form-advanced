import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { User } from '../shared/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit {

  roles: string[] = ['Гость', 'Модератор', 'Администратор'];
  model: User = new User(1, null, null, null);

  formErrors: any = {
    name: '',
    age: ''
  }

  validationMessages: any = {
    name: {
      required: 'Имя обязательно',
      minlength: 'Имя должно содержать минимум 4 символа'
    },
    age: {
      required: 'Возраст обязателен'
    }
  }

  @ViewChild('userForm') userForm: NgForm | null = null;

  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
   this.userForm?.valueChanges?.subscribe(data => this.onValueChanged());
  }

  onSubmit(): void {
    console.log('Форма отправлена');
  }

  private onValueChanged(): void {
     const form: any = this.userForm?.form;

     Object.keys(this.formErrors).forEach(field => {
       this.formErrors[field] = '';
       const control = form?.get(field);
      
       if (control && control.dirty && control.invalid) {
         const message = this.validationMessages[field];
         Object.keys(control.errors).forEach(key => {
           console.log(message[key]);
           this.formErrors[field] += message[key] + '';
         })
       }
       
     })
     
  }
  
}
