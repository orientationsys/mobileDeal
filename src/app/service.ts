/**
 * Created by wengjincheng on 2017/3/13.
 */
import { Injectable }    from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Deals } from './deals';

@Injectable()
export class Service {


  private getCityUrl = 'http://mobiledeals.sooperior.com/searchDeal?city=Windsor&start=0&address=3160 wildwood&state=Ontario';  // URL to web api
  constructor(private http: Http) { }

  getDeals(): Observable<Deals[]> {
    return this.http.get(this.getCityUrl)
      .map(this.extractData).catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    let list: Array<any> = [body.deals,body.distances,body.open,body.mealTime,body.BASE_URL,body.media];
    return list;
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

