import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-prefab-migration-history',
  templateUrl: './prefab-migration-history.component.html',
  styleUrls: ['./prefab-migration-history.component.scss']
})
export class PrefabMigrationHistoryComponent implements OnInit {

  constructor(public location: Location) { }

  ngOnInit() {
  }

}
