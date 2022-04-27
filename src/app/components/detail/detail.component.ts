import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FoodService } from 'src/api/service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [FoodService],
})
export class DetailComponent implements OnInit, DoCheck {
  public idFood: string
  public plateInfo:any
  public infoSuccesful= false
  @Input()  loadinActive: boolean
  constructor(
    private _FoodService: FoodService,
    ) {
    this.idFood=""
    this.plateInfo=[]
    this.loadinActive=false
   }


  ngOnInit(): void {
    this.getUrl();
  }
  ngDoCheck(): void {
  }
  getUrl(){
    var actual = window.location+'';
    var split = actual.split("/");
     this.idFood = split[split.length-1];
    this.getPlatosInformation(this.idFood)
  }

  getPlatosInformation(id: string){
    this.loadinActive=true
    this._FoodService.getInfotmation(id).subscribe(
      response =>{
        if(response){
          this.plateInfo= response
          this.infoSuccesful= true
          this.loadinActive= false
        }
      },error=>{
        this.loadinActive= false
      }
    )
  }
}
