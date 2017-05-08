import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import * as c3 from 'c3';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})

export class Dashboard {
  @ViewChild('dashboardDonut') dashboardDonut: ElementRef;
  //added child selector line graph
  @ViewChild('dashboardLine') dashboardLine: ElementRef;
  //Private prorperty on http:Http, to make http available to the whole component
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
  this.http;
  }
  private graphData = [];
  //API call function
  getInfo(){
    let Date1 = (<HTMLInputElement>document.getElementById("startDate")).value;
    let Date2 = (<HTMLInputElement>document.getElementById("endDate")).value;
    //gets the values from the two date fields then maps them to be

    this.http.get(`https://test-calendar.herokuapp.com/?from=${Date1}&to=${Date2}`).map(res => res.json())
      .subscribe(data => {
      // display raw data to show it is working

      //loops through the data based off the number of it's subkeys and pushes it into an array
      for (let i = 0; i < Object("data").length; i++){
        this.graphData.push(data.calendar[i]);
      }
      console.log(this.graphData);
    });
  };

ionViewDidLoad() {

  //Line Chart
  let dashboardLineArea = this.dashboardLine.nativeElement;
  c3.generate({
    bindto: dashboardLineArea,
    data: {
    columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    },
  });


  //Donut Chart
    let dashboardDonutArea = this.dashboardDonut.nativeElement;
    c3.generate({
        bindto: dashboardDonutArea,
        data: {
            type: 'donut',
            columns: [
                ['Something Blueish', 12],
                ['Something Orange', 12],
                ['Something Green', 12],
            ]
        },
        donut: {
            title: (100).toString()
        }
    });
}
}
