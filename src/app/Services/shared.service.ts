import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private formDataSubject = new BehaviorSubject<any>(this.getStoredFormData());

  constructor() {}

  get formData$() {
    return this.formDataSubject.asObservable();
  }

  setFormData(data: any) {
    this.formDataSubject.next(data);
  }


  saveFormData() {
    localStorage.setItem('formData', JSON.stringify(this.formDataSubject.getValue()));
  }

  getFormData() {
    return this.formDataSubject.getValue();
  }

  
  private getStoredFormData() {
    const storedData = localStorage.getItem('formData');
    return storedData ? JSON.parse(storedData) : { fields: [] };
  }
}
