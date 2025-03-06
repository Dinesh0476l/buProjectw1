import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { FormConfigurationComponent } from './Components/form-configuration/form-configuration.component';

const routes: Routes = [
  {path:'',component:RegisterComponent},
  {path:'memberRegistration',component:RegisterComponent},
  {path:'formConfiguration',component:FormConfigurationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
