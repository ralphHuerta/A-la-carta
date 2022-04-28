import { Component, DoCheck, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FoodService } from 'src/api/service';
import { Store, Select } from '@ngxs/store';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FoodService],
})
export class HomeComponent implements OnInit, OnChanges, DoCheck {
  
 @Input() loadinActive: boolean;
 public namePlate: string
 public isDelete: boolean
 public idGlobal: string
 public indexDelete: any
 public priceTotalService: number
 public closeModal: boolean= false
 @Input() seeHome: boolean
 @Input() information=new Array()
  @Output() idAdd= new EventEmitter
  @Input() buttomAdd: boolean
   
  constructor(
    private _FoodServoce: FoodService,
    private store: Store 
  ) { 
    this.loadinActive=false
    this.namePlate= ""
    this.isDelete=false
    this.idGlobal=""
    this.buttomAdd= false
    this.priceTotalService=0
    this.seeHome=false
  }

  ngOnInit(): void {
   if(!this.buttomAdd){
      this.menuPlates()
    }

  }

  ngOnChanges(): void {
   const menu = localStorage.getItem('menuFood')
  }
  ngDoCheck(): void {
    const menu = localStorage.getItem('menuFood')
  }

  menuPlates(){
    const menu = localStorage.getItem('menuFood')
    const arrayPlatos=new Array()

    if(menu){
      this.seeHome=true;
      var aux= JSON.parse(menu)
      aux.forEach( function(object: any){
         arrayPlatos.push(object.id)     
      });
      for(let i=0; i< arrayPlatos.length;i++){
        this.getPlatosInformation(arrayPlatos[i])
      }
      this.information.splice(0,1)
    }
  }

   

   getPlatosInformation(id: string){
     this.loadinActive=true
    this._FoodServoce.getInfotmation(id).subscribe(
      response =>{
        if(response){
          var informatitionRecived=response

           this.priceTotalService+= response.pricePerServing
           
         this.information.push(informatitionRecived )
           this.loadinActive=false
        }
        this.priceTotalService.toFixed(2)
      },error=>{
        console.log(<any> error)
        this.loadinActive=false
      }
    )
    this.loadinActive=false
  }
  confirmarDelete(id: any, name:any){
    this.isDelete=true
    this.namePlate=name
    this.idGlobal=id
  }
  deleteSuccesful(){
    this.isDelete=false
  }
  putDelete(id: any){
    var menu = localStorage.getItem('menuFood')
    var indexdelete;
    var cont=0;
    var iguales=0
    const arrayPlatos=new Array()
    var menuFood
    if(menu){
      if(menu.length==1){
        this.seeHome=false
         console.log("mi array es de"+ menu.length)}
      var deleteMenu= JSON.parse(menu)
     deleteMenu.forEach( function(object: any){
      menuFood= {
        dieta: object.dieta,
        id: object.id
      }
         if(object.id !== id){
          arrayPlatos.push(menuFood)  
          indexdelete= cont;
         }else{ iguales++}
         if((object.id == id) && (iguales >= 2)){
          arrayPlatos.push(menuFood)  
          indexdelete= cont;
         }
         cont++;
      });
      if(cont==1){
        this.seeHome=false
        localStorage.removeItem("menuFood")
         console.log("mi contador es de"+ cont)
        }

      localStorage.setItem("menuFood",JSON.stringify( arrayPlatos))
      this.indexDelete=indexdelete;
    }
    this,this.information.splice(0,3)
    this.priceTotalService=0
    if(cont>1){
      this.menuPlates()
      }else{
        localStorage.removeItem("menuFood")
      }
    
    this.isDelete=false
  }

  plateAdd(event: any){
    this.idAdd.emit(event)
  }
  closeModalDetail(event: any){
    this.closeModal= event
  }
}
