import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-prefab-edit',
  templateUrl: './prefab-edit.component.html',
  styleUrls: ['./prefab-edit.component.scss']
})
export class PrefabEditComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

}
