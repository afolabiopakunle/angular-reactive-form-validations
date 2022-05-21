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
      fullName: [''],
      email: ['', [Validators.email]],
      skill: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['']
      })
    })
  }

  loopFormGroup(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key: string) => {
      let abstractControl = formGroup.get(key);
      if(abstractControl instanceof FormGroup) {
        this.loopFormGroup(abstractControl)
      } else {
        console.log(`Key: ${key} | Value: ${abstractControl.value}`)
      }
    })
  }

}
