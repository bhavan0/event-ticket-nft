import { Injectable } from '@angular/core';
const Web3 = require('web3');

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private account: any = null;
  private web3Provider: any = null;
  constructor() {
    
  }

  private connectToMetaMask() {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    window.web3 = new Web3(this.web3Provider);
  }

  getAccountInfo() {
    if (this.account == null) {
      this.connectToMetaMask();
      this.account = window.web3.currentProvider.selectedAddress;
    }
    console.log(this.account);
    return this.account;
  }
}