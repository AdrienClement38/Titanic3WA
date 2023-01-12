import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error! : string

  constructor(private router: Router, private authService : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

    this.authService.auth(form.value.email, form.value.password).subscribe({
      next:  (user) => {
        console.log(user);
        sessionStorage.setItem('user', JSON.stringify(user.email))
    
        this.router.navigate(['home'])
      },

      error: (e) => {
        console.log(e.error);
        this.error = e.error;
        
      },

      complete: () => {

      }
    })
  }

}
