import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BlueprintApiService } from '../../blueprint-api.service';

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

  constructor(public location: Location,
              private blueprintApi: BlueprintApiService) { }

  ngOnInit() {
  }

  create() {
    this.blueprintApi.createBlueprint('Employees', 'employees', JSON.parse(this.schema), JSON.parse(this.view), JSON.parse(this.constructionView)).subscribe(res => {
      console.log(res);
    }, res => {
      console.error(res);
    });
  }

}
