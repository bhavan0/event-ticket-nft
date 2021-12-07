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

  contractAddress: string = '0xa5062Cf6Bb65a41e036414141346a6De0d2F9f56';

  constructor() {

  }

  private async connectToMetaMask() {
    // if (typeof window.web3 !== 'undefined') {
    //   this.web3Provider = window.web3.currentProvider;
    // } else {
    //   this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    // }
    // window.web3 = new Web3(this.web3Provider);

    window.web3 = await this.test();
    // const deployedContract = new window.web3.eth.Contract(eventNft, this.contractAddress);
  }

  async test() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        return web3;
      } catch (error) {
        console.error(error);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3 = window.web3;
      console.log('Injected web3 detected.');
      return web3;
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      const web3 = new Web3(provider);
      console.log('No web3 instance injected, using Local web3.');
      return web3;
    }
  }

  async getAccountInfo() {
    if (this.account == null) {
      await this.connectToMetaMask();
      this.account = window.web3.currentProvider.selectedAddress;
    }
    console.log(this.account);
    return this.account;
  }
}