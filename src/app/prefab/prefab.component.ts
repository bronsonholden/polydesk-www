import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PrefabApiService } from '../prefab-api.service';

@Component({
  selector: 'app-prefab',
  templateUrl: './prefab.component.html',
  styleUrls: ['./prefab.component.scss']
})
export class PrefabComponent implements OnInit {

  model: any = {};
  view: any = {};
  schema: any = {};

  constructor(private location: Location,
              private activatedRoute: ActivatedRoute,
              private prefabApi: PrefabApiService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      const { namespace, tag } = params;

      this.prefabApi.getPrefabByUid(namespace, tag).subscribe((res: any) => {
        this.model = res.data[0].attributes.data;
        this.view = res.data[0].attributes.view;
        this.schema = res.data[0].attributes.schema;
      }, (res: any) => {
        console.error(res);
      })
    });
  }

}
