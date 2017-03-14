import { Component } from '@angular/core';

import { PromosPage } from '../Promos/Promos';
import { PlacesPage } from '../Places/Places';
import { InsightsPage } from '../Insights/Insights';
import { MePage } from '../me/me';
@Component({
  templateUrl: 'tabs.html',
  // styleUrls : ['tabs.css'],
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = PromosPage;
  tab2Root: any = PlacesPage;
  tab3Root: any = InsightsPage;
  tab4Root: any = MePage;
  constructor() {

  }
}
