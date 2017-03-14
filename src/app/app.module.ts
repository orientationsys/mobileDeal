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
import { Service } from './service'
import { HttpModule } from '@angular/http'

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
    MePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
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
    MePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Service]
})
export class AppModule {}
