import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated();
  }

  ngDoCheck(): void {
    this.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }

  isAuthenticated(){
    this.isLoggedIn = this.authService.isAuthenticated();
  }

}