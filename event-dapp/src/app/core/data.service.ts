import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { TicketMeta } from "../shared/ticket-meta.model";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    apiBaseUrl = 'http://localhost:3000/';

    constructor(private httpClient: HttpClient) {
    }

    getTicketMeta(): Observable<any> {
        const url = 'get-ticket-meta';
        return this.getString(url);
    }

    getTicketMetaDataFromSite(url: string): Observable<TicketMeta> {
        return this.httpClient.get<TicketMeta>(url);
    }

    getTotalTickets(): Observable<any> {
        const url = 'get-total-tickets';
        return this.getData<any>(url);
    }

    getTicketsLeft(): Observable<any> {
        const url = 'get-tickets-left';
        return this.getData<any>(url);
    }

    getTicketCost(): Observable<any> {
        const url = 'get-ticket-cost';
        return this.getData<any>(url);
    }

    getEventName(): Observable<any> {
        const url = 'get-event-name';
        return this.getString(url);
    }

    getEventSymbol(): Observable<any> {
        const url = 'get-event-symbol';
        return this.getString(url);
    }

    buyTicket(account: string): Observable<any> {
        const body = {
            account: account
        };
        const url = this.apiBaseUrl + 'buy-ticket'
        return this.httpClient.post(url, body);
    }

    getTicketsOwnedByUser(account: string): Observable<any> {
        const body = {
            account: account
        };
        const url = this.apiBaseUrl + 'balance-of'
        return this.httpClient.post(url, body);
    }

    getImage(imageUrl: string): Observable<Blob> {
        return this.httpClient.get(imageUrl, { responseType: 'blob' });
    }

    transferMoney(account: string): Observable<any> {
        const body = {
            account: account
        };
        const url = this.apiBaseUrl + 'pay-random'
        return this.httpClient.post(url, body);
    }

    private getData<T>(apiUrl: string): Observable<T> {
        const url = this.apiBaseUrl + apiUrl;
        return this.httpClient.get<T>(url);
    }

    private getString(apiUrl: string): Observable<any> {
        const url = this.apiBaseUrl + apiUrl;
        return this.httpClient.get(url, { responseType: 'text' as const });
    }
}