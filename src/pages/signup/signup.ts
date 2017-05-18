import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Service } from '../../app/service';
/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit{
  storage:any;
  callback:any;
  name:any;
  email:any;
  password:any;
  address:any;
  city:any;
  result:any = false;
  token:any;
  confPassword:any;
  error:any = false;
  cityStates:any;
  nameError:any = false;
  emailError:any = false;
  emailFormError:any = false;
  passwordError:any = false;
  confPasswordError:any = false;
  addressError:any = false;
  cityError:any = false;
  flag:any = true;
  regexp:any;
  url:any = "http://mobiledeals.sooperior.com/customer/signup?";
  cityUrl:any = "http://mobiledeals.sooperior.com/home/getAllCities";
  constructor(private service: Service,public navCtrl: NavController, public navParams: NavParams,storage: Storage) {
    this.storage = storage;
    this.callback = this.navParams.get("callback");
  }
  sigUp(){
    let regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    this.flag = true;
    if (!this.name) {
      this.nameError = true;
      this.flag = false;
    } else {
      this.nameError = false;
    }
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
    if (this.confPassword != this.password) {
      this.confPasswordError = true;
      this.flag = false;
    } else {
      this.confPasswordError = false;
    }
    if (!this.address) {
        this.addressError = true;
        this.flag = false;
    } else {
      this.addressError = false;
    }
    if (!this.city) {
      this.cityError = true;
      this.flag = false;
    } else {
      this.cityError = false;
    }
    if (this.flag) {
      this.service.signUp(this.url+"email="+this.email+"&password="+this.password+"&name="+this.name+"&address="+this.address+"&city="+this.city)
          .subscribe(
              data => {
                this.token = data.token;
                this.result = data.result;
                this.checkResult();
              });
    }

  }
  ngOnInit(): void {
    this.service.getCities(this.cityUrl)
        .subscribe(
            data => {
              this.cityStates = data.cities;
            });
  }
  checkResult(){
    if (this.result) {
      this.storage.set('token', this.token);
      this.storage.set('email', this.email);
      this.callback(true,this.email, this.token).then(()=>{
        this.navCtrl.pop();
      });
    } else {
      this.error = true;
      this.email = "";
      this.password = "";
    }
  }
}
