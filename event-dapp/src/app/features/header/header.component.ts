import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navItems: MenuItem[] = [];
  activeRoute = -1;

  constructor(
    private router: Router
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url.indexOf('buses') !== -1) {
          this.activeRoute = 0;
        } else if (event.url.indexOf('stops') !== -1) {
          this.activeRoute = 1;
        }
        this.setUpMenu();
      });
  }

  ngOnInit(): void {
  }

  setUpMenu() {
    this.navItems = [
      {
        label: 'Crypto Event Pass',
        icon: 'ei ei-cart',
        routerLink: './buy-ticket',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 0) ? 'ui-state-active' : ''
      },
      {
        label: 'My Tickets',
        icon: 'ei ei-cart',
        routerLink: './my-ticket',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 1) ? 'ui-state-active' : ''
      }
    ];
  }

}
