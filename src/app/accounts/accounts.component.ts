import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
    accountFormGroup!:FormGroup;
    currentPage :number=0;
     pageSize :number=5;
     accountObservable!:Observable<AccountDetails>
      operationsFormGroup!:FormGroup;
     errorMessage!:string;

  constructor(private accountsService:AccountsService,private fb:FormBuilder) {}
    ngOnInit(): void {

    this.accountFormGroup=this.fb.group({

      accountId :this.fb.control("")

    });
    this.operationsFormGroup=this.fb.group({

      operationType :this.fb.control(null),
      amount:this.fb.control(0),
      description:this.fb.control(null),
      accountDestination:this.fb.control(null)
    })
    }

  handleSearchAccount() {

    let accountId : string=this.accountFormGroup.value.accountId;

   this.accountObservable = this.accountsService.getAccount(accountId,this.currentPage,this.pageSize).pipe(

     catchError(err=>{
       this.errorMessage=err.message;

       return throwError(err);


     })
   ) ;



  }

  protected readonly formatDate = formatDate;

    gotopage(page: number) {
    this.currentPage=page;
    this.handleSearchAccount();

  }

  handleAccountOperations() {
      let accountId : string=this.accountFormGroup.value.accountId;
      let operationType=this.operationsFormGroup.value.operationType;
      let amount :number=this.operationsFormGroup.value.amount;
      let description :string=this.operationsFormGroup.value.description;
    let accountDestination :string=this.operationsFormGroup.value.accountDestination;

      if(operationType=='DEBIT'){

        this.accountsService.debit(accountId,amount,description).subscribe({

          next:(data)=>{

            alert("Success Debit Operations ");
            this.operationsFormGroup.reset();

            this.handleSearchAccount();
          },error : (err) => {

            console.log(err);
          }
        });

      }else if (operationType=='CREDIT'){

        this.accountsService.credit(accountId,amount,description).subscribe({
           next :(data)=>{

             alert("Success Credit Operations");
             this.operationsFormGroup.reset();

             this.handleSearchAccount();

           },error:(err) => {
             console.log(err);
          }

        });

      }else if (operationType=='TRANSFER'){

        this.accountsService.transfer(accountId,accountDestination,amount,description).subscribe({
          next: (data)=>{

            alert("Success Transfer Operations");
            this.operationsFormGroup.reset();

            this.handleSearchAccount();
          },error:(err)=>{

            console.log(err);
          }

        });
      }

  }
}
