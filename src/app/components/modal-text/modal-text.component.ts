import { Component, DoCheck, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-modal-text',
  templateUrl: './modal-text.component.html',
  styleUrls: ['./modal-text.component.css']
})
export class ModalTextComponent implements OnInit, DoCheck {

    @Input() cartText: string
    @Output() successfull= new EventEmitter
  constructor() {
    this.cartText=""
    this.successfull.emit(false)
   }

  ngOnInit(): void {

  }
  ngDoCheck(): void {
    
  }
  successOk(){
    this.successfull.emit(false)
  }
}
