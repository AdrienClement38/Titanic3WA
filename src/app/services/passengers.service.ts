import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Passenger } from '../Models/PassengerModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassengersService {

  private passengerUrl = 'passengers';
  private baseUrl = environment.api;
  private apiUrl = encodeURI(this.baseUrl + this.passengerUrl)

  constructor(private http: HttpClient) { }

  getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.apiUrl)
  }
}
