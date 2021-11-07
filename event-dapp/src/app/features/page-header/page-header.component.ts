import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/core/transfer.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  accountId = '';

  constructor(private transferService: TransferService) { }

  ngOnInit(): void {
    this.accountId = this.transferService.getAccountInfo();
  }

}
