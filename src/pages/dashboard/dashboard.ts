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
//setting up properties and  and constructor
line: any;
donut: any
graphDataDonut: any;
graphDataLine: any;
graphDataNames: any;
graphData: any;
Date1: any;
Date2: any;
Months: any;
moneyList:any;
  @ViewChild('dashboardDonut') dashboardDonut: ElementRef;
  //added child selector line graph
  @ViewChild('dashboardLine') dashboardLine: ElementRef;
  //Private property on http:Http, to make http available to the whole component
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.http;
    this.line;
    this.donut;
    this.graphDataDonut = {Unavailable:0};
    this.graphDataLine  = {};
    this.graphDataNames = [];
    this.moneyList      = [];
    this.Months         = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  }


  //API call function
  getInfo(){
    //gets the values from the two date fields then maps them to be
      //laggs by one result because not live data
    let Date1 = (<HTMLInputElement>document.getElementById("startDate")).value;
    let Date2 = (<HTMLInputElement>document.getElementById("endDate")).value;

    // if both dates are date values before
    if(Date.parse(Date1) != null && Date.parse(Date2) != null){
    this.http.get(`https://test-calendar.herokuapp.com/?from=${Date1}&to=${Date2}`).map(res => res.json())
      .subscribe(data => {
        //display raw data to show it is working
      //loops through the data based off the number of it's subkeys and pushes it into our callbacks
      for (let i = 0; i < data.calendar.length; i++){
        this.dataDonutAssign(data.calendar[i]);
        this.dataLineAssign(data.calendar[i]);
        this.dataNameAssign(data.calendar[i]);
        this.dataMoneyList(data.calendar[i]);
      }
          })

            //Creates our Line Chart
            let dashboardLineArea = this.dashboardLine.nativeElement;
            this.line = c3.generate({
            bindto: dashboardLineArea,
            data: {
            //information pulled from the call back in the earlier loop
            json: this.graphDataLine,
            type: 'line'
                }

            });

            //Creates our Donut Chart
            let dashboardDonutArea = this.dashboardDonut.nativeElement;
             this.donut = c3.generate({
                 bindto: dashboardDonutArea,
                 data: {
                      type: 'donut',
                      //information pulled from the call back in the earlier loop
                     json: [this.graphDataDonut],
                      keys: {
                        value: this.graphDataNames
                      },
                  },
                  donut: {
                      title: 'Percentage here'
                  }
                })
      //resets properties for next call
      this.graphDataDonut = {Unavailable:0};
      this.graphDataLine = [];
      this.graphDataNames = [];
      }

  };

  dataDonutAssign(data){
  //creates a key based off company name
      if (this.graphDataDonut[data.source] == null && data.source != null){
        this.graphDataDonut[data.source] = data.nights;

    //if that company exists add number of nights to that key value
      }
      else if( data.source != null && data.nights != null){
        this.graphDataDonut[data.source] += data.nights;
    // if no name is provided add it to Unavailable
      }
      else if( data.source == null && data.nights != null ){
        this.graphDataDonut['Unavailable'] += data.nights;
      }
  }

  dataLineAssign(data){
  //similar to above but instead adding price together and not including unavailable times
      if (this.graphDataLine[data.source] == null && data.gbp_price != null){
        this.graphDataLine[data.source] = [data.gbp_price];

      }
      else if( data.source != null && data.gbp_price != null){
        this.graphDataLine[data.source].push(data.gbp_price);
      }
  }

  dataNameAssign(data){
  //checks if company name is there (as not repeat it) and that names are not undefined
    if (this.graphDataNames.indexOf(data.source) === -1 && data.source != null){
    this.graphDataNames.push(data.source);
    }
    else if (this.graphDataNames.indexOf('Unavailable') === -1){
      this.graphDataNames.push('Unavailable');
    }
  }

  dataMoneyList(data){
  //makes a array of key values to record the total wealth of each company from the api call
    if(this.moneyList.indexOf(data.source) === -1 && data.source != null){
      this.moneyList[data.source] = data.gbp_price;
    }
    else if(this.moneyList[data.source] != null && data.source != null){
      this.moneyList[data.source] += data.gbp_price;
    }

  }



ionViewDidLoad() {
}

}
