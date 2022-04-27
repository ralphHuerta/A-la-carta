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
 @Input() information=[{
    id: String,
    image: String,
    sourceName: String,
    vegan:Boolean,
    title: String,
    vegetarian: Boolean,
    gaps: String,
    healthScore: Number,
    pricePerServing: Number,
    readyInMinutes: Number,
    servings: Number,

  }]
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
          var informatitionRecived={
            id: response.id,
            image: response.image,
            sourceName: response.sourceName,
            vegan:response.vegan,
            title: response.title,
            vegetarian: response.vegetarian,
            gaps: response.graps,
            healthScore: response.healthScore,
            pricePerServing: response.pricePerServing, 
            readyInMinutes: response.readyInMinutes,
            servings: response.servings,
           }

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
    const arrayPlatos=new Array()
    var menuFood
    if(menu){
      var deleteMenu= JSON.parse(menu)
     deleteMenu.forEach( function(object: any){
      menuFood= {
        dieta: object.dieta,
        id: object.id
      }
         if(object.id !== id){
          arrayPlatos.push(menuFood)  
          indexdelete= cont;
         }
         cont++;
      });

      localStorage.setItem("menuFood",JSON.stringify( arrayPlatos))
      this.indexDelete=indexdelete;
    }
    this,this.information.splice(0,3)
    this.priceTotalService=0
    this.menuPlates()
    this.isDelete=false
  }

  plateAdd(event: any){
    this.idAdd.emit(event)
  }
}
