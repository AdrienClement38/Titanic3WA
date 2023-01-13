import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error! : string

  constructor(private router: Router, private authService : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

    this.authService.subscribe(form.value.email, form.value.password).subscribe({
      next:  (user) => {
        console.log(user);
        
        this.router.navigate(['login'])
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
