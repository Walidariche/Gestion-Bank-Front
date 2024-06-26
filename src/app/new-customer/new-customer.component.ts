import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {ERROR} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit{
  newCustomerFormGroup! :FormGroup;


  constructor( private fb : FormBuilder,private customerService:CustomerService) {
  }
  ngOnInit(): void {

    this.newCustomerFormGroup=this.fb.group({

      name:this.fb.control(null,[Validators.required]),
      email:this.fb.control(null,[Validators.email,Validators.required])


    });

  }


  handleSaveCustomer() {

    let customer: Customer = this.newCustomerFormGroup.value;

    this.customerService.saveCustomer(customer).subscribe({

      next:data=>{

        alert("Customer has been saved successfully ");
        this.newCustomerFormGroup.reset();
      },error :err => {

        console.log(err)
      }
    });

  }


  protected readonly Validators = Validators;
  protected readonly name = name;
}

