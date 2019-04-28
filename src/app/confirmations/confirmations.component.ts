import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularTokenService } from 'angular-token';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-confirmations',
  templateUrl: './confirmations.component.html',
  styleUrls: ['./confirmations.component.scss']
})
export class ConfirmationsComponent implements OnInit {

  private data = {
    password: '',
    passwordConfirmation: ''
  };

  constructor(private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private tokenService: AngularTokenService,
              private http: HttpClient) { }

  ngOnInit() {
    this.confirmationToken = this.route.snapshot.params['confirmationToken'];
  }

  submitPassword() {
    const base = this.tokenService.tokenOptions.apiBase;
    const token = this.confirmationToken;

    this.http.post(`${base}/confirmations/${token}`, {
      password: this.data.password,
      password_confirmation: this.data.passwordConfirmation
    }).subscribe(result => {}, result => {
      for (let error of result.error.errors) {
        console.log(error);
        this.snackBar.open(error.title, 'OK', {
          duration: 5000
        });
      }
    })
  }

}
