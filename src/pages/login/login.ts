import { Component } from '@angular/core';
import { Service } from '../../app/service';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email:any;
  password:any;
  token:any;
  result:any;
  storage:any;
  error:any = false;
  callback:any;
  id_deal:any;
  favFlag:any;
  url:any = "http://mobiledeals.sooperior.com/customer/doLogin?"
  constructor(private service: Service, public navCtrl: NavController, public navParams: NavParams, storage: Storage) {
      this.storage = storage;
      this.callback = this.navParams.get("callback");
      this.id_deal = this.navParams.get("id_deal")
  }
  sigIn(){
    this.service.getLogin(this.url+"email="+this.email+"&password="+this.password+"&id_deal="+this.id_deal)
        .subscribe(
            data => {
              this.token = data.token;
              this.result = data.result;
              this.favFlag = data.favFlag;
                this.checkResult();
            });
    }
    checkResult(){
        if (this.result) {
            this.storage.set('token', this.token);
            this.storage.set('email', this.email);

            this.callback(true,this.favFlag,this.email, this.token).then(()=>{
                this.navCtrl.pop();
            });
        } else {
            this.error = true;
            this.email = "";
            this.password = "";
        }
    }
}
