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
  private getCategoryUrl = 'http://mobiledeals.sooperior.com/deal/getDealsByFilter?city=Windsor&start=0&address=3160 wildwood&state=Ontario&category=';
  constructor(private http: Http) { }

  data:Deals;
  getDeals(): Observable<Deals> {
    return this.http.get(this.getCityUrl)
      .map(this.extractData).catch(this.handleError);
  }
  getCategoryDeals(category): Observable<Deals> {
    return this.http.get(this.getCategoryUrl+category)
        .map(this.extractData).catch(this.handleError);
  }

  getBlogs(url):Observable<Deals> {
    return this.http.get(url)
        .map(this.extractBlogData).catch(this.handleError);
  }
  getDetailBlog(url):Observable<Deals> {
    return this.http.get(url)
        .map(this.extractBlogDetail).catch(this.handleError);
  }
  private extractBlogDetail(res: Response) {
    let body = res.json();
    let list:any  =  {food:body.food,BASE_URL:body.BASE_URL};
    return list;
  }
  private extractBlogData(res: Response) {
    let body = res.json();
    return body.foods;
  }
  getPlaces(PlacesUrl): Observable<Deals> {
    return this.http.get(PlacesUrl)
      .map(this.placesData).catch(this.handleError);
  }
  private placesData(res: Response){
    let body = res.json();
    let list:any  =  {companies:body.companies,distances:body.distances,open:body.open,BASE_URL:body.BASE_URL};
    return list;
  }
  private extractData(res: Response) {
    let body = res.json();
    let list: any = {deals:body.deals,distances:body.distances,open:body.open,mealTime:body.mealTime,BASE_URL:body.BASE_URL,media:body.media};
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

