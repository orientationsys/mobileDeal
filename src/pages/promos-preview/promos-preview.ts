import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

/*
  Generated class for the PromosPreview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-promos-preview',
  templateUrl: 'promos-preview.html'
})
export class PromosPreviewPage {
  name:any;
  photo:any = {};
  BASE_URL:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.name = navParams.get('name');
    this.photo = navParams.get('photo');
    this.BASE_URL = navParams.get('BASE_URL');
  }
  closeModel(){
    this.viewCtrl.dismiss();
  }

}
