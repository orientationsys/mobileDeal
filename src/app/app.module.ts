import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { PlacesPage } from '../pages/Places/Places';
import { InsightsPage } from '../pages/Insights/Insights';
import { PromosPage } from '../pages/Promos/Promos';
import { MePage } from '../pages/me/me';
import { TabsPage } from '../pages/tabs/tabs';
import { Service } from './service';
import { HttpModule } from '@angular/http';
import { InsightsDetailPage } from '../pages/insights-detail/insights-detail';
import { MapPage } from '../pages/map/map';
import { PromosDetailPage } from '../pages/promos-detail/promos-detail';
import { RestaurantsPage } from '../pages/restaurants/restaurants';
import { RestaurantMediaPage } from '../pages/restaurant-media/restaurant-media';
import { MediaPreviewPage } from '../pages/media-preview/media-preview';
import { PromosPreviewPage } from '../pages/promos-preview/promos-preview';
import { ResturantMenuPage } from '../pages/resturant-menu/resturant-menu';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    PlacesPage,
    InsightsPage,
    PromosPage,
    TabsPage,
    MePage,
    InsightsDetailPage,
    MapPage,
    PromosDetailPage,
    RestaurantsPage,
    RestaurantMediaPage,
    MediaPreviewPage,
    PromosPreviewPage,
    ResturantMenuPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    PlacesPage,
    InsightsPage,
    PromosPage,
    TabsPage,
    MePage,
    InsightsDetailPage,
    MapPage,
    PromosDetailPage,
    RestaurantsPage,
    RestaurantMediaPage,
    MediaPreviewPage,
    PromosPreviewPage,
    ResturantMenuPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Service]
})
export class AppModule {}
