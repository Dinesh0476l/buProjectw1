import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public gridData: any[] = [];
  public formData: any[] = [];
  public form!: FormGroup;

  constructor(private sharedService: SharedService, private fb: FormBuilder) {}

  ngOnInit() {
    // Load saved data
    const savedData = this.sharedService.getFormData();
    this.gridData = savedData?.fields?.length ? savedData.fields : [
      { name: 'Name', firstChecked: true, secondChecked: true },
      { name: 'Email', firstChecked: true, secondChecked: true },
      { name: 'Mobile', firstChecked: true, secondChecked: true },
      { name: 'Address', firstChecked: true, secondChecked: true }
    ];

    this.updateFormData();
    this.initializeForm();
  }

  updateFormData() {
    this.formData = this.gridData.filter(field => field.firstChecked);
  }

  initializeForm() {
    const formControls = this.formData.reduce((controls, field) => {
      const fieldName = field.name.toLowerCase();
      let validators = [];

      if (field.secondChecked) {
        validators.push(Validators.required);
      }

      if (fieldName === 'mobile') {
        validators.push(Validators.pattern(/^\d{10}$/)); 
      } else if (fieldName === 'name') {
        validators.push(Validators.maxLength(20)); 
      } else if (fieldName === 'address') {
        validators.push(Validators.maxLength(50)); 
      } else if (fieldName === 'email') {
        validators.push(Validators.email); 
      }

      controls[fieldName] = ['', validators];
      return controls;
    }, {} as any);

    this.form = this.fb.group(formControls);
  }

  saveChanges() {
    const formData = { fields: this.gridData };
    this.sharedService.setFormData(formData); 
    this.sharedService.saveFormData(); 
    console.log('Form data saved:', JSON.stringify(formData, null, 2));

    this.updateFormData();
    this.initializeForm();
    alert('Changes Saved!');
  }
}
