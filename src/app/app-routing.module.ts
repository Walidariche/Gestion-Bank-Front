import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {authenticationGuard} from "./guard/authentication.guard";
import {authorizationGuard} from "./guard/authorization.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",redirectTo:"/login",pathMatch:"full"},
  {path:"admin",component:AdminTemplateComponent,canActivate:[authenticationGuard],

    children: [

      {path : "customers", component: CustomersComponent },
      {path : "accounts", component: AccountsComponent},
      {path : "new-customer", component:NewCustomerComponent,canActivate:[authorizationGuard],data :{role:"ADMIN"}},
      {path : "customer-account/:id", component:CustomerAccountsComponent,canActivate:[authorizationGuard],data :{role:"ADMIN"} },
      {path : "notAuthorized", component: NotAuthorizedComponent},
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
