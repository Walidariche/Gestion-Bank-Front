import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {customerAccountdetails} from "../model/customerAccount";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit{
 customerId! :number;
 customer !:Customer;
  customerAccount!:Observable<Array<customerAccountdetails>>;
  errorMessage!:string;
  typeaccountformgroup!:FormGroup;

  constructor(
              private route:ActivatedRoute,
              private router:Router,
              private accountservice:AccountsService,
              private fb:FormBuilder) {

    this.customer=this.router.getCurrentNavigation()?.extras.state as  Customer;
  }
    ngOnInit(): void {
       this.customerId=this.route.snapshot.params['id'];
       this.typeaccountformgroup=this.fb.group({
         TypeAccount :this.fb.control(null),

       });


      this.customerAccount=this.accountservice.accoutbycustomerid(this.customerId).pipe(
        catchError(err=>{
          this.errorMessage=err.message;

          return throwError(err);

       })
     );


    }




}
