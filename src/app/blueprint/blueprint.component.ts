import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlueprintApiService } from '../blueprint-api.service';
import { PrefabApiService } from '../prefab-api.service';

@Component({
  selector: 'app-blueprint',
  templateUrl: './blueprint.component.html',
  styleUrls: ['./blueprint.component.scss']
})
export class BlueprintComponent implements OnInit {

  scope: any = {};
  data: any = {};
  source: any = null;

  constructor(private location: Location,
              private activatedRoute: ActivatedRoute,
              private prefabApi: PrefabApiService,
              private blueprintApi: BlueprintApiService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.blueprintApi.getBlueprintByNamespace(params.namespace).subscribe((res: any) => {
        this.data = res.data[0].attributes['list-view'];
        this.scope.namespace = params.namespace;
        this.source = this.prefabApi;
      })
    });
  }

  back() {
    this.location.back();
  }

}
