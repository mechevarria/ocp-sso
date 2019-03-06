import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { MessageItem } from '../message/message-item';
import { IconDefinition, faLock, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { MessageHistoryService } from '../message/message-history.service';
import { interval } from 'rxjs/internal/observable/interval';
import { KeycloakService } from 'keycloak-angular';

@Component({
  styleUrls: ['./header.component.css'],
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  eraseIcon: IconDefinition;
  logoutIcon: IconDefinition;
  accountIcon: IconDefinition;
  formIcon: IconDefinition;
  sidebarVisible: boolean;
  username: string;
  messages: MessageItem[];
  accountUrl: string;
  isLoggedIn: boolean;

  constructor(private messageHistoryService: MessageHistoryService, private renderer: Renderer2, private keycloak: KeycloakService) {
    this.logoutIcon = faLock;
    this.accountIcon = faShieldAlt;
    this.sidebarVisible = true;
    this.messages = new Array();
    this.username = '';
    this.isLoggedIn = false;

    // hide sidebar by default on mobile
    this.checkForMobile();
  }

  doLogout(): void {
    if (this.isLoggedIn) {
      this.keycloak.logout();
    }
  }

  doAccount(): void {
    if (this.isLoggedIn) {
      window.open(this.accountUrl, '_blank');
    }
  }

  clear() {
    this.messageHistoryService.clear();
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    if (this.sidebarVisible === false) {
      this.renderer.removeClass(document.body, 'sidebar-show');
    } else {
      this.renderer.addClass(document.body, 'sidebar-show');
    }

    // triggering this event so that the mapbox api will auto resize the map
    interval(500).subscribe(() => {
      // triggering on small display will cause infinite loop
      if (window.innerWidth > 640) {
        window.dispatchEvent(new Event('resize'));
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  checkForMobile(event?) {
    if (window.innerWidth < 640) {
      this.toggleSidebar();
    }
  }

  ngOnInit(): void {
    this.messages = this.messageHistoryService.getHistory();

    this.keycloak.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        this.isLoggedIn = true;
        this.username = this.keycloak.getUsername();

        const instance = this.keycloak.getKeycloakInstance();
        this.accountUrl = `${instance.authServerUrl}/realms/${instance.realm}/account`;
      }
    });
  }
}
