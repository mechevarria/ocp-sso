import {Routes} from '@angular/router';
import {CardComponent} from './card/card.component';
import {HomeComponent} from './home/home.component';
import {TableComponent} from './table/table.component';

export const AppRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumbs: true,
      text: 'Home'
    },
    children: [
      {
        path: 'card',
        component: CardComponent,
        data: {
          breadcrumbs: true,
          text: 'Card'
        }
      },
      {
        path: 'table',
        component: TableComponent,
        data: {
          breadcrumbs: true,
          text: 'Table'
        }
      }
    ]
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];
