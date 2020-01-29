import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blueprint-edit',
  templateUrl: './blueprint-edit.component.html',
  styleUrls: ['./blueprint-edit.component.scss']
})
export class BlueprintEditComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

}
