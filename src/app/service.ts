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
  //拿到deals数据
  getDeals(): Observable<Deals> {
    return this.http.get(this.getCityUrl)
        .map(this.extractData).catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    let list: any = {deals:body.deals,distances:body.distances,open:body.open,mealTime:body.mealTime,BASE_URL:body.BASE_URL,media:body.media};
    return list;
  }
  //拿取detailPromos页面数据
  getDetailPromos(url): Observable<Deals>{
    return this.http.get(url)
        .map(this.extractDetailPromosData).catch(this.handleError);
  }
  private extractDetailPromosData(res: Response){
    let body = res.json();
    let list: any = {medias:body.medias,moreDeals:body.moreDeals,BASE_URL:body.BASE_URL};
    return list;
  }

  //获取promos页面导航菜单的数据
  getCategoryDeals(category): Observable<Deals> {
    return this.http.get(this.getCategoryUrl+category)
        .map(this.extractData).catch(this.handleError);
  }
  //获取Blog页面的数据
  getBlogs(url):Observable<Deals> {
    return this.http.get(url)
        .map(this.extractBlogData).catch(this.handleError);
  }
  private extractBlogData(res: Response) {
    let body = res.json();
    return body.foods;
  }
  //获取Blog的detail数据
  getDetailBlog(url):Observable<Deals> {
    return this.http.get(url)
        .map(this.extractBlogDetail).catch(this.handleError);
  }
  private extractBlogDetail(res: Response) {
    let body = res.json();
    let list:any  =  {food:body.food,BASE_URL:body.BASE_URL};
    return list;
  }
  //获取Resturants页面数据
  getResturants(url){
    return this.http.get(url)
        .map(this.extractResturants).catch(this.handleError);
  }
  private extractResturants(res: Response){
    let body = res.json();
    let list: any  = {company:body.company,BASE_URL:body.BASE_URL,open:body.open,deals:body.deals};
    return list;
  }
  //获取resturnats-media 的 Gallery
  getResturantGallery(url){
    return this.http.get(url)
        .map(this.extractResturantGallery).catch(this.handleError);
  }
  private extractResturantGallery(res: Response){
    let body = res.json();
    let list: any  = {company:body.company,BASE_URL:body.BASE_URL,medias:body.medias};
    return list;
  }
  //获取places页面的数据
  getPlaces(PlacesUrl): Observable<Deals> {
    return this.http.get(PlacesUrl)
        .map(this.placesData).catch(this.handleError);
  }
  private placesData(res: Response){
    let body = res.json();
    let list:any  =  {companies:body.companies,distances:body.distances,open:body.open,BASE_URL:body.BASE_URL};
    return list;
  }
  //获取places页面导航菜单数据
  getCategoryPlaces(url): Observable<Deals> {
    return this.http.get(url)
        .map(this.placesData).catch(this.handleError);
  }
  //获取Resturants页面menu的数据
  getResturantsMenu(url): Observable<Deals> {
    return this.http.get(url)
        .map(this.extractResturantsMenu).catch(this.handleError);
  }
  private extractResturantsMenu(res:Response){
    let body = res.json();
    let list:any = {menus:body.menus,BASE_URL:body.BASE_URL,deals:body.deals};
    return list;
  }
  //处理错误信息的Function
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
