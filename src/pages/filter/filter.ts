import { Component } from '@angular/core';
import { NavController, NavParams,ViewController} from 'ionic-angular';
import { PromosPage } from '../../pages/Promos/Promos';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,  public viewCtrl: ViewController) {

  }
  closeModel(){
    this.navCtrl.push(PromosPage);
    this.viewCtrl.dismiss();
  }

}
