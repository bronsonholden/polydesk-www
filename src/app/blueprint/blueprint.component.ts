import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlueprintApiService } from '../blueprint-api.service';
import { PrefabApiService } from '../prefab-api.service';

import { get, set, isArray } from 'lodash';

@Component({
  selector: 'app-blueprint',
  templateUrl: './blueprint.component.html',
  styleUrls: ['./blueprint.component.scss'],
  providers: [PrefabApiService]
})
export class BlueprintComponent implements OnInit {

  query: any = {};
  scope: any = {};
  data: any = {};
  source: any = null;
  selection = [];

  constructor(public location: Location,
              private activatedRoute: ActivatedRoute,
              private prefabApi: PrefabApiService,
              private blueprintApi: BlueprintApiService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.blueprintApi.getBlueprintByNamespace(params.namespace).subscribe((res: any) => {
        this.data = res.data[0].attributes['list-view'];

        // Set filter query parameter
        const expr = `prop('namespace') == '${params.namespace}'`;

        let filter = get(this.query, 'filter');
        if (isArray(filter)) {
          filter.push(expr);
        } else {
          set(this.query, 'filter', [expr]);
        }

        // Set generate query parameter
        set(this.query, 'generate', this.data.generate);

        this.prefabApi.namespace = params.namespace;
        this.source = this.prefabApi;
      });
    });
  }

  back() {
    this.location.back();
  }

}
