import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms'
import { PassengersService } from '../services/passengers.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
  
})
export class SearchComponent implements OnInit {

  passengersService!: PassengersService;

  @Output() searchedResult : EventEmitter<undefined | any> = new EventEmitter()


  constructor(passengersService: PassengersService) { 
    this.passengersService = passengersService
  }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm) {
    this.searchedResult.emit(form.value['word'])
  }
}
