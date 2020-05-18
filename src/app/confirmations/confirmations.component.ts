import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularTokenService } from 'angular-token';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmations',
  templateUrl: './confirmations.component.html',
  styleUrls: ['./confirmations.component.scss']
})
export class ConfirmationsComponent implements OnInit {

  private confirmationToken: string;
  private allowSelectPassword = false;
  public confirmationSuccess = false;

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

    this.http.get(`confirmations/${this.confirmationToken}`).subscribe((result: any) => {
      this.allowSelectPassword = result.data.attributes['password-required'];

      if (!this.allowSelectPassword) {
        this.submitConfirmation(null);
      }
    }, result => {
      for (let error of result.error.errors) {
        this.snackBar.open(error.title, 'OK', {
          duration: 5000
        });
      }
    });
  }

  selectPassword() {
    if (this.allowSelectPassword) {
      this.submitConfirmation(this.data);
    }
  }

  submitConfirmation(credentials: any) {
    const token = this.confirmationToken;

    this.http.post(`confirmations/${token}`, credentials).subscribe(result => {
      this.confirmationSuccess = true;
    }, result => {
      for (let error of result.error.errors) {
        this.snackBar.open(error.title, 'OK', {
          duration: 5000
        });
      }
    });
  }
}
