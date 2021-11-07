import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/core/data.service';
import { TicketMeta } from 'src/app/shared/ticket-meta.model';
import { TransferService } from '../../core/transfer.service';

declare const window: any;

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.scss'],
  providers: [TransferService]
})
export class BuyTicketComponent implements OnInit {

  window: any;
  ticketMeta!: TicketMeta;
  totalTickets = '';
  ticketsLeft = '';
  ticketsCost = '';
  imageToShow: any;
  isImageLoading = true;
  ownedByUser = '';
  accountId = ''
  eventName = '';
  eventSymbol = '';

  constructor(private transferService: TransferService,
    private dataService: DataService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getTicketMetaData();
    this.getTotalTickets();
    this.getTicketCost();
    this.getTicketsLeft();
    this.getAccount();
    this.getTicketsOwnedByUser();
    this.getEventName();
    this.getEventSymbol();
  }

  getAccount() {
    this.accountId = this.transferService.getAccountInfo();
    console.log(this.accountId)
  }

  buyTicket() {
    this.dataService.buyTicket(this.accountId).subscribe(data => {
      console.log('Bought Ticket');
      console.log(data);
      this.getTicketsLeft();
      this.getTicketsOwnedByUser();
    })
  }

  getTicketMetaData() {
    this.dataService.getTicketMeta().subscribe(url => {
      this.dataService.getTicketMetaDataFromSite(url).subscribe(metaData => {
        this.ticketMeta = metaData;
        this.getImage();
      });
    });
  }

  getTotalTickets() {
    this.dataService.getTotalTickets().subscribe(data => {
      this.totalTickets = data;
    });
  }

  getTicketCost() {
    this.dataService.getTicketCost().subscribe(data => {
      this.ticketsCost = String(+data / 1000000000000000000);
    });
  }

  getTicketsLeft() {
    this.dataService.getTicketsLeft().subscribe(data => {
      this.ticketsLeft = data;
    });
  }

  getTicketsOwnedByUser() {
    this.dataService.getTicketsOwnedByUser(this.accountId).subscribe(data => {
      this.ownedByUser = data;
    });
  }

  getEventName() {
    this.dataService.getEventName().subscribe(data => {
      this.eventName = data;
    });
  }

  getEventSymbol() {
    this.dataService.getEventSymbol().subscribe(data => {
      this.eventSymbol = data;
    });
  }

  getImage() {
    console.log(this.ticketMeta.image);
    this.dataService.getImage(this.ticketMeta.image).subscribe(image => {
      let objectURL = URL.createObjectURL(image);
      this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.isImageLoading = false;
    });
  }

  disableSave() {
    return +this.ticketsLeft === 0;
  }

  eventHeader(){
    return this.eventName + ' | ' + this.eventSymbol;
  }

}
