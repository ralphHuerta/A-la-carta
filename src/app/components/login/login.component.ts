import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
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
  @Input() textSend: string
  public textNone: boolean= false
  public loging:string;
  public password:string;
  public loading= false;
  public dataLogin: any
  public tocken: any
  constructor(private router:Router,
    private _FoodServices: FoodService,
    private store: Store) { 
    this.loging= "";
    this.password="";
    this.textSend="Invalid password and/or email"
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
          this.loading=false
          localStorage.setItem("dataLoging",JSON.stringify( autentication))
          this.router.navigate(['/home']);


        }else{
          this.loading=false;
        }


      },error=>{
        console.log(<any> error)
        this.loading=false;
        this.textNone=true
      });

  }
  comprobateLogin(){
   if(!this.dataLogin){
     this.router.navigate(['/home'])
   }
  }

  closeModalText(event: any){
    this.textNone= event
  }

  
}
