import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['My name'],
      email: ['', [Validators.email]],
      skill: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['']
      })
    })
  }


  loopFormGroup(form: FormGroup) {
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
