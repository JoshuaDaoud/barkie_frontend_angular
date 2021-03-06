import { Component, OnInit } from '@angular/core';
import { CredentialsFormData } from './CredentialsFormData';
import { NgForm } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formData = new CredentialsFormData('', '');

  invalidLogin : boolean = false

  constructor(
    private router : Router, 
    private authService : AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm) {
    this.authService.authenticate(loginForm.value.username, loginForm.value.password)
      .subscribe((resp : HttpResponse<any>) => {
        if (resp.status == 200) {
          alert("U bent succesvol ingelogd");
          sessionStorage.setItem("Authorization", resp.headers.get("Authorization"));
          this.invalidLogin = false;
          this.router.navigate([''])
        }
      },
        error => {
          this.invalidLogin = true;
        });
  }

}