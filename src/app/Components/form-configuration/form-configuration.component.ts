import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropTargetEvent } from '@progress/kendo-angular-utils';

@Component({
  selector: 'app-form-configuration',
  templateUrl: './form-configuration.component.html',
  styleUrls: ['./form-configuration.component.scss']
})
export class FormConfigurationComponent implements OnInit {
  public gridData: any[] = []; 
  public tempGridData: any[] = [];
  public formData: any[] = [];
  public form!: FormGroup;

  constructor(private sharedService: SharedService, private fb: FormBuilder) {}

  ngOnInit() {
    // Load saved form data
    const savedData = this.sharedService.getFormData();
    this.gridData = savedData?.fields?.length ? savedData.fields : [
      { name: 'Name', firstChecked: true, secondChecked: true },
      { name: 'Email', firstChecked: true, secondChecked: true },
      { name: 'Mobile', firstChecked: true, secondChecked: true },
      { name: 'Address', firstChecked: true, secondChecked: true }
    ];

    // Create a temporary copy for UI updates
    this.tempGridData = JSON.parse(JSON.stringify(this.gridData));

    this.updateFormData();
    this.initializeForm();
  }

  updateFormData() {
    this.formData = this.tempGridData.filter(field => field.firstChecked);
  }

  initializeForm() {
    const formControls = this.formData.reduce((controls, field) => {
      controls[field.name.toLowerCase()] = ['', field.secondChecked ? Validators.required : []];
      return controls;
    }, {} as any);

    this.form = this.fb.group(formControls);
  }

  saveChanges() {

    this.gridData = JSON.parse(JSON.stringify(this.tempGridData));

    const formData = { fields: this.gridData };
    this.sharedService.setFormData(formData);
    this.sharedService.saveFormData();

    console.log('Form data saved:', JSON.stringify(formData, null, 2));

    this.updateFormData();
    this.initializeForm();

    alert('Changes Saved!');
  }

  dragData = ({ dragTarget }: any) => {
    return Number(dragTarget.getAttribute("data-index"));
  };

  onDrop(e: DropTargetEvent): void {
    const fromIndex = e.dragData;
    const toIndex = Number(e.dropTarget.getAttribute("data-index"));

    if (fromIndex === toIndex) return;

    const movedItem = this.tempGridData[fromIndex];
    this.tempGridData.splice(fromIndex, 1);
    this.tempGridData.splice(toIndex, 0, movedItem);
  }
}
