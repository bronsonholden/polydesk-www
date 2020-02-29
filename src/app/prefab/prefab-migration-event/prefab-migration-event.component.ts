import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-prefab-migration-event',
  templateUrl: './prefab-migration-event.component.html',
  styleUrls: ['./prefab-migration-event.component.scss']
})
export class PrefabMigrationEventComponent implements OnInit {

  constructor(public location: Location) { }

  ngOnInit() {
  }

}
