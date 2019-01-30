import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { MessageItem } from '../message/message-item';
import { IconDefinition, faLock, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { MessageHistoryService } from '../message/message-history.service';
import { KeycloakService } from '../keycloak.service';
import { interval } from 'rxjs/internal/observable/interval';

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
  logoutUrl: string;
  accountUrl: string;

  constructor(private messageHistoryService: MessageHistoryService, private renderer: Renderer2, private keycloakService: KeycloakService) {
    this.logoutIcon = faLock;
    this.accountIcon = faShieldAlt;
    this.sidebarVisible = true;
    this.messages = new Array();
    this.username = '';

    // hide sidebar by default on mobile
    this.checkForMobile();
  }

  doLogout(): void {
    window.location.href = this.logoutUrl;
  }

  doAccount(): void {
    window.open(this.accountUrl, '_blank');
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

    const auth = this.keycloakService.getAuth();

    if (auth.isLoggedIn) {
      this.username = auth.profile.username;
      this.logoutUrl = auth.logoutUrl;
      this.accountUrl = auth.accountUrl;
    }
  }
}
