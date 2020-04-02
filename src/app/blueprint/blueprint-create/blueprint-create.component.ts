import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AccountService } from '../../account.service';
import { BlueprintApiService } from '../../blueprint-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blueprint-create',
  templateUrl: './blueprint-create.component.html',
  styleUrls: ['./blueprint-create.component.scss']
})
export class BlueprintCreateComponent implements OnInit {

  schema = '';
  view = ''
  constructionView = '';
  listView = '';
  name = '';
  namespace = '';

  constructor(public location: Location,
              private blueprintApi: BlueprintApiService,
              private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
  }

  create() {
    this.blueprintApi.createBlueprint(this.name, this.namespace, JSON.parse(this.schema), JSON.parse(this.view), JSON.parse(this.constructionView), JSON.parse(this.listView)).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl(`/accounts/${this.accountService.account}/desk`);
    }, res => {
      console.error(res);
    });
  }

}
