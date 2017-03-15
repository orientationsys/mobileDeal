import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-Insights-detail',
  templateUrl: 'Insights-detail.html'
})
export class InsightsDetailPage{

  selectBlog:any;
  constructor(public navCtrl: NavController,public navParams: NavParams) {

    this.selectBlog = navParams.get('blog');
  }

}
