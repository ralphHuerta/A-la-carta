import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-loading.component.html',
  styleUrls: ['./modal-loading.component.css']
})
export class ModalLoadingComponent implements OnInit, DoCheck {

  @Input() loadinActive: boolean
  constructor() { 
    this.loadinActive=false
  }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
   console.log(" estoy en el modal  "+ this.loadinActive);
  }

}
