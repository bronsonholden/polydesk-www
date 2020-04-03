import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { AccountCreateComponent } from '../account-create/account-create.component';
import { AccountService } from '../../account.service';
import { AccountApiService } from '../../account-api.service';
import { DataTableRouteBindingComponent } from '../../data-table/data-table-route-binding/data-table-route-binding.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  @ViewChild(DataTableRouteBindingComponent) dataTable;

  data: any = {
    select: 'multiple',
    columns: {
      accountName: {
        title: 'Account Name',
        display: 'link',
        type: 'concat',
        value: {
          separator: '/',
          parts: [
            {
              type: 'literal',
              value: 'accounts'
            },
            {
              type: 'attribute',
              value: 'identifier'
            },
            {
              type: 'literal',
              value: 'desk'
            }
          ]
        },
        link: {
          display: 'text',
          type: 'attribute',
          value: 'name',
          absolute: true
        }
      }
    },
    display: [
      {
        name: 'accountName',
        width: 150,
        resizeable: true,
        sortable: true
      }
    ]
  };
  scope: any = {};
  selection: any = {};


  constructor(public dialog: MatDialog,
              private accountService: AccountService,
              public accountApi: AccountApiService,
              private httpClient: HttpClient,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.accountService.account = null;
  }

  openAccountCreateDialog() {
    const dialogRef = this.dialog.open(AccountCreateComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
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
      }).subscribe((result: any) => {
        const account = result.data;
        this.dataTable.reload();
      }, result => {
        this.snackBar.open(result.error.errors[0].title, 'OK', {
          duration: 3000
        });
      });
    });
  }

}
