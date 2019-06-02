import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AccountCreateComponent } from '../account-create/account-create.component';
import { AccountService } from '../../account.service';
import { AccountModel } from '../account.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  public accounts: AccountModel[] = [];

  constructor(public dialog: MatDialog,
              private httpClient: HttpClient,
              private accountService: AccountService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.accountService.account = null;
    this.httpClient.get('accounts').subscribe(result => {
      this.accounts = result.data.map(account => new AccountModel(account.attributes.name, account.attributes.identifier));
    });
  }

  openAccountCreateDialog() {
    const dialogRef = this.dialog.open(AccountCreateComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.httpClient.post('accounts', {
        data: {
          type: 'accounts',
          attributes: {
            name: result.name,
            identifier: result.identifier
          }
        }
      }).subscribe(result => {
        const account = result.data;
        this.accounts.push(new AccountModel(account.attributes.name, account.attributes.identifier));
      }, result => {
        this.snackBar.open(result.error.errors[0].title, 'OK', {
          duration: 3000
        });
      });
    });
  }

  selectAccount(account) {
    this.accountService.account = account.identifier;
    this.router.navigateByUrl(`/${account.identifier}/dashboard`);
  }

}
