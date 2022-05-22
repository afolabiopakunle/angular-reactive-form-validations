import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  
  validationMessages = {
    fullName: {
      required: 'Full name is required',
      minlength: 'Full name must be greater than two characters',
      maxlength: 'Full name must be less than twelve characters'
    },
    email: {
      required: 'Email is required',
      email: 'This is not a valid email address'
    },
    skillName: {
      required: 'Skill name is required'
    },
    experienceInYears: {
      required: 'Experience in years is required',
      min: 'Minimum experience in years is 1'
    },
    proficiency: {
      required: 'Proficiency is required'
    }
  }

  formErrors = {
    fullName: '',
    email: '',
    skillName: '',
    experienceInYears: '',
    proficiency: ''
  }
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.email, Validators.required]],
      skill: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', [Validators.required, Validators.min(1)]],
        proficiency: ['', Validators.required]
      })
    })

    this.form.valueChanges.subscribe(data => {
      this.logValidationErrors(this.form)
    })
  }


  logValidationErrors(form: FormGroup) {
   Object.keys(form.controls).forEach((key: string ) => {
     const abstractControl = form.get(key);
     if(abstractControl instanceof FormGroup) {
       this.logValidationErrors(abstractControl)
     } else {
       this.formErrors[key] = '';
       if(abstractControl && abstractControl.invalid && (abstractControl.touched || abstractControl.dirty)) {
         const message = this.validationMessages[key];
         for(const errorKey in abstractControl.errors) {
           if(errorKey) {
             this.formErrors[key] += message[errorKey] + ' ';
           }
         }
       }
     }
   })
   console.log(this.formErrors)
  }

  submit() {

  }

}
