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
  id_company:any;
  type:any;
    emailError:any = false;
    emailFormError:any = false;
    passwordError:any = false;
    flag:any = true;
  url:any = "http://mobiledeals.sooperior.com/customer/doLogin?";
  constructor(private service: Service, public navCtrl: NavController, public navParams: NavParams, storage: Storage) {
      this.storage = storage;
      this.callback = this.navParams.get("callback");
      this.id_deal = this.navParams.get("id_deal");
      this.id_company = this.navParams.get("id_company");
      this.type = this.navParams.get("type");
  }
  sigIn(){
      let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      this.flag = true;
      if (!this.email) {
          this.emailError = true;
          this.emailFormError = false;
          this.flag = false;
      } else if(!regExp.test(this.email))  {
          this.emailFormError = true;
          this.emailError = false;
          this.flag = false;
      } else {
          this.emailError = false;
          this.emailFormError = false;
      }
      if (!this.password) {
          this.passwordError = true;
          this.flag = false;
      } else {
          this.passwordError = false;
      }
      if(this.flag) {
          this.service.getLogin(this.url+"email="+this.email+"&password="+this.password+"&id_deal="+this.id_deal+"&type="+this.type+"&id_company="+this.id_company)
              .subscribe(
                  data => {
                      this.token = data.token;
                      this.result = data.result;
                      this.favFlag = data.favFlag;
                      this.checkResult();
                  });
      }

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
