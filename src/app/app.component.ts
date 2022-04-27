import { Component, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  public access:string;
  public title;
  @Output() URLactual: string
  constructor(private route: Router){
    this.access=""
    this.title=""
    this.URLactual= '/'
    
  }
  ngOnInit(){
  }
  
  
  recivedStatus(event: string){
    console.log(event)
    this.access=event
    
  }

  
}
