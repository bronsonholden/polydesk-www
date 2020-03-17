import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlueprintApiService } from '../../blueprint-api.service';

@Component({
  selector: 'app-blueprint-edit',
  templateUrl: './blueprint-edit.component.html',
  styleUrls: ['./blueprint-edit.component.scss']
})
export class BlueprintEditComponent implements OnInit {

  schema: any;
  view: any;
  constructionView: any;
  listView: any;
  name: any;
  namespace: any;
  blueprintId: string | null;

  constructor(public location: Location,
              private activatedRoute: ActivatedRoute,
              private blueprintApi: BlueprintApiService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.blueprintApi.getBlueprintByNamespace(params.namespace).subscribe((res: any) => {
        const blueprint = res.data[0];

        this.blueprintId = blueprint.id;
        this.name = blueprint.attributes.name;
        this.namespace = blueprint.attributes.namespace;
        this.schema = JSON.stringify(blueprint.attributes.schema, null, '    ');
        this.view = JSON.stringify(blueprint.attributes.view, null, '    ');
        this.constructionView = JSON.stringify(blueprint.attributes['construction-view'], null, '    ');
        this.listView = JSON.stringify(blueprint.attributes['list-view'], null, '    ');
      }, (res: any) => {
        console.error(res);
      });
    });
  }

updateBlueprint() {
  this.blueprintApi.updateBlueprint(this.blueprintId, {
    schema: JSON.parse(this.schema),
    view: JSON.parse(this.view),
    'construction-view': JSON.parse(this.constructionView),
    'list-view': JSON.parse(this.listView)
  }).subscribe((res: any) => {
    console.log(res);
  }, (res: any) => {
    console.error(res);
  });
}

}
