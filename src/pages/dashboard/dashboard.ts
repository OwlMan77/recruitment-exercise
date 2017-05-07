import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as c3 from 'c3';
/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})

export class Dashboard {
  @ViewChild('dashboardChart') dashboardChart: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

ionViewDidLoad() {

  //Here's a nice little dummy pie chart to get you started. More details about how to use C3 charts can be found here: http://c3js.org/examples.html. Good luck and have fun!
    let dashboardChartArea = this.dashboardChart.nativeElement;
    c3.generate({
        bindto: dashboardChartArea,
        data: {
            type: 'donut',
            columns: [
                ['Something Blueish', 12],
                ['Something Orange', 12],
                ['Something Green', 12],
            ]
        },
        donut: {
            title: "Example Pie Chart"
        }
    });


}
}
