import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-prefab-view',
  templateUrl: './prefab-view.component.html',
  styleUrls: ['./prefab-view.component.scss']
})
export class PrefabViewComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }

}
