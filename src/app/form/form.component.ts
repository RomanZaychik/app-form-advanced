import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)])
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.userForm.valid);
    console.log(this.userForm.value);
  }

}


// export class FormComponent implements OnInit, AfterViewInit {

//   roles: string[] = ['Гость', 'Модератор', 'Администратор'];
//   model: User = new User(1, null, null, null);

//   formErrors: any = {
//     name: '',
//     age: ''
//   }

//   validationMessages: any = {
//     name: {
//       required: 'Имя обязательно',
//       minlength: 'Имя должно содержать минимум 4 символа'
//     },
//     age: {
//       required: 'Возраст обязателен'
//     }
//   }

//   @ViewChild('userForm') userForm: NgForm | null = null;

//   constructor() { }

//   ngOnInit(): void {
//   }
  
//   ngAfterViewInit(): void {
//    this.userForm?.valueChanges?.subscribe(data => this.onValueChanged());
//   }

//   onSubmit(): void {
//     console.log('Форма отправлена');
//   }

//   private onValueChanged(): void {
//      const form: any = this.userForm?.form;

//      Object.keys(this.formErrors).forEach(field => {
//        this.formErrors[field] = '';
//        const control = form?.get(field);
      
//        if (control && control.dirty && control.invalid) {
//          const message = this.validationMessages[field];
//          Object.keys(control.errors).forEach(key => {
//            console.log(message[key]);
//            this.formErrors[field] += message[key] + '';
//          })
//        }
       
//      })
     
//   }
  
// }
