import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarVisible = true;

  routes = [
    { path: '/', label: 'Dashboard', icon: 'pi-home' },
    { path: '/login', label: 'Login', icon: 'pi-sign-in' },
    { path: '/register', label: 'Register', icon: 'pi-user-plus' },
    { path: '/query', label: 'Query', icon: 'pi-search' },
    { path: '/users', label: 'Users', icon: 'pi-users' },
    { path: '/dynamic', label: 'Dynamic Card', icon: 'pi-id-card' },
    { path: '/map', label: 'Map ', icon: 'pi-map-marker' },
    { path: '/task', label: 'Tasks', icon: 'pi-list-check' },
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeCallback() {
    this.sidebarVisible = false;
  }
}
