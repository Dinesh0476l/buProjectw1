import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppBarModule } from '@progress/kendo-angular-navigation';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormConfigurationComponent } from './Components/form-configuration/form-configuration.component';
import { RegisterComponent } from './Components/register/register.component';
import { InputsModule } from "@progress/kendo-angular-inputs";
import { CheckBoxModule } from '@progress/kendo-angular-inputs';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DragAndDropModule } from "@progress/kendo-angular-utils";
import { GridModule } from '@progress/kendo-angular-grid';
import { LabelModule } from "@progress/kendo-angular-label";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FormConfigurationComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,InputsModule,
    CheckBoxModule,
    AppBarModule,
    FormsModule,
    ReactiveFormsModule,
    DragAndDropModule,
     GridModule, 
     BrowserAnimationsModule,
     LabelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
