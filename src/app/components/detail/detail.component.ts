import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FoodService } from 'src/api/service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [FoodService],
})
export class DetailComponent implements OnInit, DoCheck {
  public idFood: string
  @Input() plateInfo:any
  @Output()  closeModal= new EventEmitter
  public infoSuccesful= false

  @Input()  loadinActive: boolean
  constructor(
    private _FoodService: FoodService,
    ) {
    this.idFood=""
    this.plateInfo=[]
    this.loadinActive=false
   }

   closeModalDetails(){
     this.closeModal.emit(false)
   }


  ngOnInit(): void {
    //this.getUrl();
  }
  ngDoCheck(): void {
  }

}
