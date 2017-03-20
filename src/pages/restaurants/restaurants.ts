import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Service } from '../../app/service';

@Component({
  selector: 'page-restaurants',
  templateUrl: 'restaurants.html'
})
export class RestaurantsPage  implements OnInit{
  data:any;
  id_company:any;
  url:any = 'http://mobiledeals.sooperior.com/place/detail?id_company=';
  BASE_URL:any;
  open:any;
  company:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private Service:Service) {
    this.id_company =   navParams.get('id_company');
  }
  getRes(){
    this.Service.getResturants(this.url+this.id_company)
      .subscribe(
        data=>{
          this.data = data;
          this.company = data.company;
          this.BASE_URL = data.BASE_URL;
          this.open = data.open;
          console.log(data.company.name);
        }
      )
  }
  ngOnInit(){
    this.getRes();
  }
}