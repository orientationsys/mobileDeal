import { Component } from '@angular/core';
import { NavController, NavParams,ViewController} from 'ionic-angular';
import { seacrhPage } from '../searchPage/searchPage';

/*
  Generated class for the Filter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage {
  Tags:any = ['Pickup','Chicken','Mexican','Alcohol','Delivery','Chinese','Italian','Wings','Indian','Healthy','Burgers','Ethepion','Beer'];
  Types:any = ['Breakfast','Lunch','Dinner','Late Night'];
  selectTags:any = [];
  selectTypes:any = [];
  selectSort:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,  public viewCtrl: ViewController) {

  }
  closeModel(){
    this.navCtrl.push(seacrhPage,{tags:this.selectTags, types:this.selectTypes, sort:this.selectSort, searchType:'filter'});
    this.viewCtrl.dismiss();
  }
  addTags(tag) {
    if (this.selectTags.indexOf(tag) < 0) {
      this.selectTags.push(tag);
    } else {
      this.selectTags.splice(this.selectTags.indexOf(tag), 1);
    }
  }
  addTypes(type){
    if (this.selectTypes.indexOf(type) < 0) {
      this.selectTypes.push(type);
    } else {
      this.selectTypes.splice(this.selectTypes.indexOf(type), 1);
    }
  }
  getSort(sort) {
    this.selectSort = sort;
  }
  clealFilter(){
    this.selectTypes = [];
    this.selectSort = "";
    this.selectTags = [];
  }
}
