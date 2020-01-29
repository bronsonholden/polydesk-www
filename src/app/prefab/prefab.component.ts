import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-prefab',
  templateUrl: './prefab.component.html',
  styleUrls: ['./prefab.component.scss']
})
export class PrefabComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

}
