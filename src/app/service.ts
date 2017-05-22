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
  constructor(private http: Http) { }

  data:Deals;
  //拿到deals数据
  getDeals(url): Observable<Deals> {
    return this.http.get(url)
        .map(this.extractData).catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    let list: any = {deals:body.deals,distances:body.distances,open:body.open,BASE_URL:body.BASE_URL,media:body.media,mealTime:body.mealTime,result:body.result};
    return list;
  }
  //get restaurant deals
  getRestaurantDeals(url):Observable<Deals> {
  return this.http.get(url)
      .map(this.extractResDeals).catch(this.handleError);
}
  private extractResDeals(res: Response) {
    let body = res.json();
    let list: any = {deals:body.deals,distances:body.distances,open:body.open,BASE_URL:body.BASE_URL,media:body.media};
    return list;
  }
  //拿取detailPromos页面数据
  getDetailPromos(url): Observable<Deals>{
    return this.http.get(url)
        .map(this.extractDetailPromosData).catch(this.handleError);
  }
  private extractDetailPromosData(res: Response){
    let body = res.json();
    let list: any = {medias:body.medias,moreDeals:body.moreDeals,BASE_URL:body.BASE_URL,likeFlag:body.likeFlag,isLogin:body.isLogin,favFlag:body.favFlag};
    return list;
  }
  likeDetailPromos(url):Observable<Deals>{
    return this.http.get(url)
        .map(this.extractLikeDetailPromos).catch(this.handleError);
  }
  private extractLikeDetailPromos(res: Response){
    let body = res.json();
    let list: any = {likeFlag:body.likeFlag};
    return list;
  }
  //获取promos页面导航菜单的数据
  getCategoryDeals(url): Observable<Deals> {
    return this.http.get(url)
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
    let list: any  = {company:body.company,BASE_URL:body.BASE_URL,open:body.open,deals:body.deals,likeFlag:body.likeFlag,isLogin:body.isLogin,favFlag:body.favFlag};
    return list;
  }
  likeResturants(url) {
    return this.http.get(url)
        .map(this.extractLikeResturants).catch(this.handleError);
  }
  private extractLikeResturants(res: Response){
    let body = res.json();
    let list: any  = {likeFlag:body.likeFlag};
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
    let list:any  =  {companies:body.companies,distances:body.distances,open:body.open,BASE_URL:body.BASE_URL,result:body.result};
    return list;
  }
  getSearchPlaces(PlacesUrl): Observable<Deals> {
    return this.http.get(PlacesUrl)
        .map(this.searchPlacesData).catch(this.handleError);
  }
  private searchPlacesData(res: Response){
    let body = res.json();
    let list:any  =  {companies:body.companies,distances:body.distances,open:body.open,BASE_URL:body.BASE_URL};
    return list;
  }
  //获取places页面导航菜单数据
  getCategoryPlaces(url): Observable<Deals> {
    return this.http.get(url)
        .map(this.placesData).catch(this.handleError);
  }
  //搜索模块-list->list
  getSearchList(url): Observable<Deals> {
    return this.http.get(url)
      .map(this.extractSearchList).catch(this.handleError);
  }
  private extractSearchList(res:Response){
    let body = res.json();
    let list = {deals:body.deals,distances:body.distances,mealTime:body.mealTime,BASE_URL:body.BASE_URL,open:body.open,media:body.media};
    return list;
  }
  // filter 模块
  getFilterList(url): Observable<Deals> {
    return this.http.get(url)
        .map(this.extractFilterList).catch(this.handleError);
  }
  private extractFilterList(res:Response){
    let body = res.json();
    let list = {deals:body.deals,distances:body.distances,mealTime:body.mealTime,BASE_URL:body.BASE_URL,open:body.open,media:body.media};
    return list;
  }
  getFilterRestaurantList(url): Observable<Deals> {
    return this.http.get(url)
        .map(this.extractFilterRestaurantList).catch(this.handleError);
  }
  private extractFilterRestaurantList(res:Response){
    let body = res.json();
    let list = {companies:body.companies,open:body.open,distances:body.distances,BASE_URL:body.BASE_URL};
    return list;
  }
  //搜索模块->list
  getSearch(url): Observable<Deals> {
    return this.http.get(url)
      .map(this.extractSearch).catch(this.handleError);
    }
    private extractSearch(res: Response){
      let body = res.json();
      return body;
    }
  getRestaurantSearch(url): Observable<Deals> {
    return this.http.get(url)
        .map(this.extractRestaurantSearch).catch(this.handleError);
  }
  private extractRestaurantSearch(res: Response){
    let body = res.json();
    return body;
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
    //登录
  getLogin(url):Observable<Deals> {
    return this.http.get(url)
        .map(this.extractLogin).catch(this.handleError);
  }
  private extractLogin(res:Response){
    let body = res.json();
    let list:any = {token:body.token,result:body.result,favFlag:body.favFlag,deals:body.deals,companies:body.companies,BASE_URL:body.BASE_URL};
    return list;
  }
  //注册
  signUp(url):Observable<Deals> {
    return this.http.get(url)
        .map(this.extractSignUp).catch(this.handleError);
  }
  private extractSignUp(res:Response){
    let body = res.json();
    let list:any = {token:body.token,result:body.result};
    return list;
  }
  //fav deal
  favPromos(url):Observable<Deals> {
    return this.http.get(url)
        .map(this.extractFavDeal).catch(this.handleError);
  }
  private extractFavDeal(res:Response){
    let body = res.json();
    let list:any = {favFlag:body.favFlag};
    return list;
  }
  //fav restaurant
  favRestaurant(url):Observable<Deals> {
    return this.http.get(url)
        .map(this.extractFavRes).catch(this.handleError);
  }
  private extractFavRes(res:Response){
    let body = res.json();
    let list:any = {favFlag:body.favFlag};
    return list;
  }
  //check login
  checkLogin(url):Observable<Deals> {
    return this.http.get(url)
        .map(this.extractCheckLogin).catch(this.handleError);
  }
  private extractCheckLogin(res:Response){
    let body = res.json();
    let list:any = {isLogin:body.isLogin,deals:body.deals,companies:body.companies,BASE_URL:body.BASE_URL};
    return list;
  }
  //get city and state
  getCities(url):Observable<Deals> {
    return this.http.get(url)
        .map(this.extractCities).catch(this.handleError);
  }
  private extractCities(res:Response){
    let body = res.json();
    let list:any = {cities:body.cities};
    return list;
  }
  //forgot password
  forgotPassword(url):Observable<Deals> {
    return this.http.get(url)
        .map(this.extractForgot).catch(this.handleError);
  }
  private extractForgot(res:Response){
    let body = res.json();
    let list:any = {result:body.result, errorMsg:body.msg};
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
