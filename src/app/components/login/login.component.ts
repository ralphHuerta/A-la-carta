import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { FoodService } from 'src/api/service';

import { Store} from '@ngxs/store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FoodService]
})
export class LoginComponent implements OnInit {
  @Output() getStatus = new EventEmitter;
  public loging:string;
  public password:string;
  public status:string;
  public loading= false;
  public dataLogin: any
  public tocken: any
  constructor(private router:Router,
    private _FoodServices: FoodService,
    private store: Store) { 
    this.loging= "";
    this.password="";
    this.status="";
  }

  ngOnInit(): void {
    this.dataLogin= localStorage.getItem("dataLoging")
  }
 

  entrar(form:any){

   
    this.loading=true;
    let dataLoging={
      email : this.loging,
      password: this.password

    }
    
    this._FoodServices.getLoadin(dataLoging).subscribe(
      response =>{
        
        var autentication =response
        
        if(autentication){
          form.reset()
          this.status="true"
          this.loading=false
          localStorage.setItem("dataLoging",JSON.stringify( autentication))
          this.router.navigate(['/home']);


        }else{
          this.status="failed";
          this.loading=false;
        }


      },error=>{
        console.log(<any> error)
        this.loading=false;
      });

  }
  comprobateLogin(){
   if(!this.dataLogin){
     this.router.navigate(['/home'])
   }
  }

  
}
