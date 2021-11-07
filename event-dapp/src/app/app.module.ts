import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyTicketComponent } from './features/buy-ticket/buy-ticket.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from './features/header/header.component';
import { PageHeaderComponent } from './features/page-header/page-header.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ButtonModule, MenubarModule } from 'primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyTicketsComponent } from './features/my-tickets/my-tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    BuyTicketComponent,
    HeaderComponent,
    PageHeaderComponent,
    MyTicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CardModule,
    ScrollingModule,
    ButtonModule,
    MenubarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
