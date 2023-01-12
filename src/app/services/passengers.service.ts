import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Passenger } from '../Models/PassengerModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PassengerSex } from '../Models/passengerSex';
import { PassengerClass } from '../Models/passengerClass';
import { PassengerAge } from '../Models/passengerAge';
import { PassengerAgeStat } from '../Models/passengerAgeStat';
import { PassengerClassStat } from '../Models/passengerClassStat';
 
@Injectable({
  providedIn: 'root'
})
export class PassengersService {

  private passengerUrl = 'passengers/';
  private baseUrl = environment.api;
  private apiUrl = encodeURI(this.baseUrl + this.passengerUrl)

  constructor(private http: HttpClient) { }

  getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.apiUrl)
  }

  search(name: string): Observable<Passenger[]> {
    // let pastries = this.getPastries();
    return this.http.get<Passenger[]>(this.apiUrl + 'search/' + name)
  }

  getAlivePassengersSex(): Observable<PassengerSex> {
    return this.http.get<PassengerSex>(this.apiUrl + 'sex')
  }

  getAlivePassengersAge(): Observable<PassengerAge> {
    return this.http.get<PassengerAge>(this.apiUrl + 'age')
  }

  getAlivePassengersClass(): Observable<PassengerClass> {
    return this.http.get<PassengerClass>(this.apiUrl + 'class')
  }

  getAlivePassengersAgeStat(): Observable<PassengerAgeStat> {
    return this.http.get<PassengerAgeStat>(this.apiUrl + 'agestat')
  }

  getAlivePassengersClassStat(): Observable<PassengerClassStat> {
    return this.http.get<PassengerClassStat>(this.apiUrl + 'classstat')
  }
}
