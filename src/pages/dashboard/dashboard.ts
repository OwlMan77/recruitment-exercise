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
line: any;
donut: any
graphDataDonut: any;
graphDataNames: any;
graphData: any;
  @ViewChild('dashboardDonut') dashboardDonut: ElementRef;
  //added child selector line graph
  @ViewChild('dashboardLine') dashboardLine: ElementRef;
  //Private property on http:Http, to make http available to the whole component
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.http;
    this.line;
    this.donut;
    this.graphDataDonut;
    this.graphDataNames;
    this.graphData;
  }


  //API call function
  getInfo(){

    //gets the values from the two date fields then maps them to be
    let Date1 = (<HTMLInputElement>document.getElementById("startDate")).value;
    let Date2 = (<HTMLInputElement>document.getElementById("endDate")).value;
    this.graphDataDonut = {};
    this.graphDataNames = [];
    this.graphData      = {Unavailable:0};
    this.http.get(`https://test-calendar.herokuapp.com/?from=${Date1}&to=${Date2}`).map(res => res.json())
      .subscribe(data => {
        //display raw data to show it is working
      //loops through the data based off the number of it's subkeys and pushes it into an array
      for (let i = 0; i < data.calendar.length; i++){
        this.dataAssign(data.calendar[i]);
        this.dataNameAssign(data.calendar[i]);
      }
          })


      //console.log(this.graphData);
      //console.log(this.graphDataDonut);
      //console.log(this.graphDataNames);
    });
  };

  dataAssign(data){
      if (this.graphData[data.source] == null && data.source != null){
        this.graphData[data.source] = data.nights;
      }
      else if( data.source != null && data.nights != null){
        this.graphData[data.source] += data.nights;
      }
      else if( data.source == null && data.nights != null ){
      console.log(this.graphData['Unavailable']);
        this.graphData['Unavailable'] += data.nights;
      }
  }

  dataNameAssign(data){
    if (this.graphDataNames.indexOf(data.source) === -1 && data.source != null){
    this.graphDataNames.push(data.source);
    }
    else if (this.graphDataNames.indexOf('Unavailable') === -1){
      this.graphDataNames.push('Unavailable');
    }
  }


    //buildLineGraph(){
      //let dashboardLineArea = this.dashboardLine.nativeElement;
      //this.line = c3.generate({
      //bindto: dashboardLineArea,
      //data: {
      //json: this.graphData,
      //keys: {
      //          x: 'date',
      //          value:['gbp_price']
      //          }
      //        },
      //         axis: {
      //          x: {
      //           type: 'line'
      //          }
      //        }
      //      });
    //}


ionViewWillEnter() {
  //console.log(this.graphData);
  //Line Chart
  //this.buildLineGraph();
  //Donut Chart
  e§
}

}
