import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CardComponent} from './card/card.component';
import {TableComponent} from './table/table.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'card', component: CardComponent},
  {path: 'table', component: TableComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule {
}
