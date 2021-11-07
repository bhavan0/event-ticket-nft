import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/core/data.service';
import { TransferService } from 'src/app/core/transfer.service';
import { TicketMeta } from 'src/app/shared/ticket-meta.model';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent implements OnInit {

  ticketMeta!: TicketMeta;
  imageToShow: any;
  isImageLoading = true;
  ownedByUser = '';
  accountId = '';
  eventName = '';
  eventSymbol = '';

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private transferService: TransferService) {
    this.getAccount();
    this.getTicketMetaData();
    this.getTicketsOwnedByUser();
    this.getEventName();
    this.getEventSymbol();
  }

  ngOnInit(): void {
  }

  getAccount() {
    this.accountId = this.transferService.getAccountInfo();
    console.log(this.accountId)
  }

  getTicketMetaData() {
    this.dataService.getTicketMeta().subscribe(url => {
      this.dataService.getTicketMetaDataFromSite(url).subscribe(metaData => {
        this.ticketMeta = metaData;
        this.getImage();
      });
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

  getTicketsOwnedByUser() {
    this.dataService.getTicketsOwnedByUser(this.accountId).subscribe(data => {
      this.ownedByUser = data;
    });
  }

  eventHeader(){
    return this.eventName + ' | ' + this.eventSymbol;
  }

  counter() {
    return new Array(+this.ownedByUser)
  }

}
