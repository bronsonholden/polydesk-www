import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountModel } from '../account.component';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {
  name: string = '';
  identifier: string = '';

  constructor(
    public dialogRef: MatDialogRef<AccountCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient) { }

  ngOnInit() {
  }

  createAccount() {
    this.dialogRef.close(new AccountModel(this.name, this.identifier));
  }

  createButtonEnabled() {
    return this.name !== '' && this.identifier !== '';
  }

}
