import { Passenger } from '../Models/PassengerModel';
import { PassengersService } from '../services/passengers.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public passengers : Passenger[] = [];

  barChartData = {
    labels: [""],
    datasets: [
      {
        data: [0],
        label: '',
        backgroundColor: [
          'rgba(55, 200 , 125, 0.7)',
           'rgba(0, 200 , 225, 0.7)'
         ]
      }
    ]
  }

  constructor(private passengersService : PassengersService) { 
  }

  ngOnInit(): void {
    this.getPassenger();
  }

  getPassenger() {
    this.passengersService.getPassengers().subscribe({
      next: (passengers) => {
        this.passengers = passengers

      // this.filterPassengersClassStat();

      },
      error: (e) => {
        console.log(e);  
      }
    });
  }


  search(form : any) {
    this.passengersService.search(form).subscribe({
      next: (passengers) => {
        this.passengers = passengers;
      },
      error: (e) => {
        console.log(e.message);
      }
    })
  }

  filterChartBySex(){
    this.passengersService.getAlivePassengersSex().subscribe({
      next: (passengers) => {

        let labels = ['Male', 'Female']
        let datasetMale = +passengers.male;
        let datasetFemale = +passengers.female;

        let dataset = [datasetMale, datasetFemale];

        this.barChartData = {
          labels,
          datasets: [{
          data: dataset, 
          label: 'Survivants par sexe', 
          backgroundColor: [
            'rgba(44, 165, 199, 0.7)',
              'rgba(255, 8, 201, 0.7)'
            ]
          }],
        } 
      },

      error: (e) => {
        console.log(e);  
      }
    });
  }
  

  filterChartByAge(){
    this.passengersService.getAlivePassengersAge().subscribe({
      next: (passengers) => {

        let labels = ['0-10 ans', '11-20 ans', '21-30 ans', '31-40 ans', '41-50 ans', '51-60 ans', '61-70 ans', '71-80 ans', '81-90 ans', '91-100 ans']
        let dataset10 = +passengers.p10;
        let dataset20 = +passengers.p20;
        let dataset30 = +passengers.p30;
        let dataset40 = +passengers.p40;
        let dataset50 = +passengers.p50;
        let dataset60 = +passengers.p60;
        let dataset70 = +passengers.p70;
        let dataset80 = +passengers.p80;
        let dataset90 = +passengers.p90;
        let dataset100 = +passengers.p100;

        let dataset = [dataset10, dataset20, dataset30, dataset40, dataset50, dataset60, dataset70, dataset80, dataset90, dataset100];

        this.barChartData = {
          labels,
          datasets: [{
          data: dataset, 
          label: 'Survivants par age', 
          backgroundColor: [
            'rgba(44, 165, 199, 0.7)'
            ]
          }],
        } 
      },

      error: (e) => {
        console.log(e);  
      }
    });
  }

  filterChartByClass(){
    this.passengersService.getAlivePassengersClass().subscribe({
      next: (passengers) => {

        let labels = ['Classe 1', 'Classe 2', 'Classe 3']
        let datasetC1 = +passengers.c1;
        let datasetC2 = +passengers.c2;
        let datasetC3 = +passengers.c3;

        let dataset = [datasetC1, datasetC2, datasetC3];

        this.barChartData = {
          labels,
          datasets: [{
          data: dataset, 
          label: 'Survivants par classe', 
          backgroundColor: [
            'rgba(255, 200, 0, 0.7)',
              'rgba(128, 120, 115, 0.7)',
              'rgba(189, 115, 58, 0.7)'
            ]
          }],
        } 
      },
      error: (e) => {
        console.log(e);  
      }
    });
  }


  filterPassengersAgeStat(){
    this.passengersService.getAlivePassengersAgeStat().subscribe({
      next: (passengers) => {

        let menAgeArray: number[] =[];
        let womenAgeArray: number[] =[]

        passengers.menAge.forEach((men: any) => {
          menAgeArray.push(+men.Age)

        });

        passengers.womenAge.forEach((women: any) => {
          
          womenAgeArray.push(+women.Age)

        });

        let menAgeAverage = Math.round(menAgeArray.reduce((a, b) => a + b, 0) / menAgeArray.length);
        let womenAgeAverage = Math.round(womenAgeArray.reduce((a, b) => a + b, 0) / womenAgeArray.length);

        let menAgeDeviation = Math.round(Math.sqrt(menAgeAverage));
        let womenAgeDeviation = Math.round(Math.sqrt(womenAgeAverage));


        let labels = ['Moyenne Age Hommes', 'Moyenne Age Femmes', 'Ecart-type Age Hommes', 'Ecart-type Age Femmes']
        let datasetMH = menAgeAverage;
        let datasetMF = womenAgeAverage;
        let datasetECH = menAgeDeviation;
        let datasetECF = womenAgeDeviation;

        let dataset = [datasetMH, datasetMF, datasetECH, datasetECF];

        this.barChartData = {
          labels,
          datasets: [{
          data: dataset, 
          label: 'Survivants par classe', 
          backgroundColor: [
            'rgba(44, 165, 199, 0.7)',
              'rgba(255, 8, 201, 0.7)',
              'rgba(44, 165, 199, 0.7)',
              'rgba(255, 8, 201, 0.7)'
            ]
          }],
        } 
      },

      error: (e) => {
        console.log(e);  
      }
    });
  }

  filterPassengersClassStat(){
    this.passengersService.getAlivePassengersClassStat().subscribe({
      next: (passengers) => {

        let class1Array: number[] =[];
        let class2Array: number[] =[];
        let class3Array: number[] =[];

        passengers.class1.forEach((passenger: any) => {

          class1Array.push(+passenger.Age)

        });

        passengers.class2.forEach((passenger: any) => {

          class2Array.push(+passenger.Age)

        });

        passengers.class3.forEach((passenger: any) => {

          class3Array.push(+passenger.Age)

        });


        let class1Average = Math.round(class1Array.reduce((a, b) => a + b, 0) / class1Array.length);
        let class2Average = Math.round(class2Array.reduce((a, b) => a + b, 0) / class2Array.length);
        let class3Average = Math.round(class3Array.reduce((a, b) => a + b, 0) / class3Array.length);


        let class1Deviation = Math.round(Math.sqrt(class1Average));
        let class2Deviation = Math.round(Math.sqrt(class2Average));
        let class3Deviation = Math.round(Math.sqrt(class3Average));
        

        let labels = ['Moyenne Age Classe1', 'Moyenne Age Classe2', 'Moyenne Age Classe3', 'Ecart-type Age Classe1', 'Ecart-type Age Classe2', 'Ecart-type Age Classe3']
        let datasetMC1 = class1Average;
        let datasetMC2 = class2Average;
        let datasetMC3 = class3Average;
        let datasetECC1 = class1Deviation;
        let datasetECC2 = class2Deviation;
        let datasetECC3 = class3Deviation;

        let dataset = [datasetMC1, datasetMC2, datasetMC3, datasetECC1, datasetECC2, datasetECC3];

        this.barChartData = {
          labels,
          datasets: [{
          data: dataset, 
          label: 'Survivants par classe', 
          backgroundColor: [
            'rgba(255, 200, 0, 0.7)',
              'rgba(128, 120, 115, 0.7)',
              'rgba(189, 115, 58, 0.7)',
              'rgba(255, 200, 0, 0.7)',
              'rgba(128, 120, 115, 0.7)',
              'rgba(189, 115, 58, 0.7)'
            ]
          }],
        } 
      },

      error: (e) => {
        console.log(e);  
      }
    });
  }

}
