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
  //Private property on http:Http, to make http available to the whole component
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
  this.http;
  }

  //Data store
  private today = new Date().toJSON().split('T')[0];
  private graphData = [];
  private graphDataNames = [];
  private graphDataDonut = {};

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

        if (this.graphDataDonut[data.calendar[i].source] != null ){
          this.graphDataDonut[data.calendar[i].source].push(data.calendar[i].gbp_price);
        }
        else if( data.calendar[i].source != null && data.calendar[i].gbp != null){
          this.graphDataDonut[data.calendar[i].source] = [];
          this.graphDataDonut[data.calendar[i].source].push(data.calendar[i].gbp_price);
        }

        if(this.graphDataNames.indexOf(data.calendar[i].source) === -1){
          this.graphDataNames.push(data.calendar[i].source);
        }
      }
      console.log(this.graphData);
      console.log(this.graphDataDonut);
    });
  };

ionViewDidLoad() {
  let dashboardLineArea = this.dashboardLine.nativeElement;
  let dashboardDonutArea = this.dashboardDonut.nativeElement;

  //Line Chart
   var line = c3.generate({
    bindto: dashboardLineArea,
    data: {
      json: this.graphData,
      keys: {
        x: 'date',
        value:['gbp_price']
      }
    },
     axis: {
      x: {
       type: 'line'
      }
   }
  });

  //Donut Chart
    var donut = c3.generate({
        bindto: dashboardDonutArea,
        data: {
            type: 'donut',
            json: this.graphData,
            keys: {
              value: this.graphDataNames,
            }
        },
        donut: {
            title: (100).toString()
        }
    });
}
}
