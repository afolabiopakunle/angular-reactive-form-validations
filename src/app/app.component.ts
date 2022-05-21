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
      required: 'Email is required'
    },
    skillName: {
      required: 'Skill name is required'
    },
    experienceInYears: {
      required: 'Experience in years is required'
    },
    proficiency: {
      required: 'Proficiency is required'
    }

  }
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email, Validators.required]],
      skill: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', [Validators.required, Validators.min(1)]],
        proficiency: ['', Validators.required]
      })
    })
  }


  loopFormGroup(form: FormGroup) {
    console.log(this.form.controls)
   Object.keys(form.controls).forEach((key: string) => {
     const abstractControl = form.get(key);
     if(abstractControl instanceof FormGroup) {
       this.loopFormGroup(abstractControl)
     } else {
       console.log(`Key: ${key} | Value: ${abstractControl.value}`)
     }
   })
  }

}
