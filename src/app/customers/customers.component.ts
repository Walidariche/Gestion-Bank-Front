import {Component, OnInit} from '@angular/core';


import {CustomerService} from "../services/customer.service";

import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  customers!:Observable<Array<Customer>>;
  eroorMessage!:string;
  searchFormGroup :FormGroup | undefined;


  constructor(private customerService:CustomerService , private fb :FormBuilder,private router:Router,public authService:  AuthService) {}
    ngOnInit(): void {

      this.searchFormGroup =this.fb.group({

        keyword :this.fb.control("")

      });

    this.customers=this.customerService.getCustomers().pipe(


      catchError(err => {

        this.eroorMessage=err.message;
       return  throwError(err);
      })
    );


    }
    handleSearchCustomers() {

    let kw=this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(

      catchError(err => {

        this.eroorMessage=err.message;
        return  throwError(err);
      })

    );

      }

  handledeletecustomer(c: Customer) {

    let conf= confirm("Are you Sure !")
    if(!conf)return;

    this.customerService.deleteCustomer(c.id).subscribe({

      next :data=>{

        this.customers = this.customerService.getCustomers();

      },
      error: (err)=>{
        console.log(Error)

      }


    })


  }


  handlecustomeraccount(customer: Customer) {
    this.router.navigateByUrl("/admin/customer-account/"+customer.id,{state:customer})

  }
}
