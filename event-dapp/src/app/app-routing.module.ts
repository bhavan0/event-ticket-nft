import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyTicketComponent } from './features/buy-ticket/buy-ticket.component';
import { MyTicketsComponent } from './features/my-tickets/my-tickets.component';

const routes: Routes = [
  {
    path: 'buy-ticket',
    component: BuyTicketComponent
  },
  {
    path: 'my-ticket',
    component: MyTicketsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
