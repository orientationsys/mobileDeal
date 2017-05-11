import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

/*
  Generated class for the RestaurantFilter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-restaurant-filter',
  templateUrl: 'restaurant-filter.html'
})
export class RestaurantFilterPage {
  Tags:any = ['Pickup','Chicken','Mexican','Alcohol','Delivery','Chinese','Italian','Wings','Indian','Healthy','Burgers','Ethepion','Beer'];
  selectTags:any = [];
  selectSort:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {

  }
  closeModel(){

    this.viewCtrl.dismiss({
      tags:this.selectTags,
      sort:this.selectSort,
    });
  }
  addTags(tag) {
    if (this.selectTags.indexOf(tag) < 0) {
      this.selectTags.push(tag);
    } else {
      this.selectTags.splice(this.selectTags.indexOf(tag), 1);
    }
  }
  getSort(sort) {
    this.selectSort = sort;
  }
  clealFilter(){
    this.selectSort = "";
    this.selectTags = [];
  }
  dismiss() {
    this.viewCtrl.dismiss();

  }

}
