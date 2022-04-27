import { Component, OnInit,Input, Output, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit, DoCheck {
  @Input() Status:string
  @Input() URLactual: string
  public dataLogin: any
  constructor(private router: Router) { 
    this.Status="failed"
    this.URLactual= ''
    this.dataLogin=[]
    
  }
  ngOnInit(): void {
    this.dataLogin= localStorage.getItem("dataLoging")

  }
  ngDoCheck(): void {
    this.dataLogin= localStorage.getItem("dataLoging")
    
  }
  

  remove(){
    localStorage.removeItem("dataLoging")
  }
}
