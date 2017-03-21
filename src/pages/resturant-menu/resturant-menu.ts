import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Service } from '../../app/service';

/*
  Generated class for the ResturantMenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resturant-menu',
  templateUrl: 'resturant-menu.html'
})
export class ResturantMenuPage implements OnInit {
  id_company:any;
  url:any = 'http://mobiledeals.sooperior.com/place/getMenu?id_company=';
  Sandwiches:any = {};
  data:any = {};
  menus:Array<any>;
  obj:any = [];
  BASE_URL:any;
  menData:any;
  logo:any;
  deals:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:Service) {
    this.id_company = navParams.get('id');
    this.logo = navParams.get('logo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResturantMenuPage');
  }
  //get data
  getResMenu(){
    this.service.getResturantsMenu(this.url+this.id_company)
      .subscribe(
        data=>{
          this.data = data;
          this.menus = data.menus;
          this.deals = data.deals;
          console.log(this.menus);
          this.BASE_URL = data.BASE_URL;
        }
      )
  }
  //OnInit
  ngOnInit(){
    this.getResMenu();
  }
}
