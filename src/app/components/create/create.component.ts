import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { FoodService } from 'src/api/service';
import { debounceTime } from "rxjs/operators";
import { debounce, ObjectUnsubscribedError } from 'rxjs';
import { interval } from 'rxjs';
import { SaveFood } from 'src/api/saveFood';
import { Store} from '@ngxs/store';
import { AddPost } from 'src/app/store/post/posts.actions';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [FoodService],
})
export class CreateComponent implements OnInit, DoCheck{
  @Input() food: any;
  public namePlato: string;
  public addPlato: SaveFood[]
  public vegan: boolean
  public filter: string
  public loadin: boolean
  @Input() textSend: string
  @Input() seeHome: boolean= true
  public textNone: boolean
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  constructor(
    private _FoodServices: FoodService,
    private store: Store) {
    this.namePlato= "";
    this.addPlato=[]
    this.vegan= false
    this.filter= ''
    this.loadin= false
    this.textSend=""
    this.textNone= false
   }

  ngOnInit(): void {
    this.getPlatos()
  }
  ngDoCheck(): void {
    
  }
  searhsPlatos(form: any){
    
    this.food= <any>
    console.log("-------")
   
  }

  saveMenuFood( id: string){
    
    var contDietaVegan=0;
    var contNoDieta=0
    var lengArrayMenu=0
    this._FoodServices.getInfotmation(id).subscribe(
      
      response =>{
      this.textNone= true;

        if(response){
          this.vegan= response.vegan
        }
      
      const menu = localStorage.getItem('menuFood')
      let menuFood= [{
        dieta: this.vegan,
        id: id

      }]
      if(menu)
      {
        var aux= JSON.parse(menu)
        aux.forEach( function(object: any){
          lengArrayMenu++
          if(object.dieta== true){
            contDietaVegan++
          }else{
            contNoDieta++
          }
        });
        if(lengArrayMenu< 4){
          if(contDietaVegan >= 2 && menuFood[0].dieta== true){
            this.textSend="No more vegan foods can be added"
            return 
          }
          if(contNoDieta >= 2 && menuFood[0].dieta== false){
            this.textSend=" Dish not added, please add vegan food"
            return 
          }
        }
        aux.forEach( function(object: any){
          menuFood.push(object)
        });
      }
      if(lengArrayMenu<4){
        this.textSend=" Added successfully" 
        localStorage.setItem("menuFood",JSON.stringify( menuFood))
        
      }else{
        this.textSend="No more dishes can be added "
      }
    },error=>{
      console.log(<any> error)
    }
  )

  }
  closeModalText(event: any){
    this.textNone= event
  }
  getfilter(isFilter: string){
    this.filter= isFilter
    this.getPlatos()
  }
  validSearh(){
    if(this.namePlato.length>2){
      this.getPlatos()
    }
  }
  getPlatos(){
    this.loadin=true
    this.food= null

    var search= "&query="+this.namePlato+"&number=200";
    if(this.filter.length>1){
      search="&diet=vegan&number=200"
    }
    this.filter= " "
    
    this._FoodServices.getPlatos(search).subscribe(
      response =>{
        
        if(response){
          if(!this.food){
           this.food = response.results
           
          }else{
            for(let i in response.results)
            this.food.push(response.results[i])
          }
        }
        this.loadin=false
      },error=>{
        console.log(<any> error)
        this.loadin=false
      }
      
    )
  }

}
