import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  itemTypes = [
    'Documents',
    'Reports',
    'Forms'
  ];

  showAll = false;
  showTypes = new FormControl(this.itemTypes);

  constructor() { }

  ngOnInit() {
    this.showAll = this.allTypesSelected();
  }

  getVisibleTypes() {
    return this.showTypes.value.join(', ');
  }

  toggleAll() {
    if (this.showAll || this.allTypesSelected()) {
      this.showAll = false;
      this.showTypes.setValue([]);
    } else {
      this.showAll = true;
      this.showTypes.setValue(this.itemTypes.slice());
    }
  }

  allTypesSelected() {
    if (this.itemTypes.length !== this.showTypes.value.length) {
      return false;
    }

    for (let i = 0; i < this.itemTypes.length; ++i) {
      if (this.showTypes.value.indexOf(this.itemTypes[i]) < 0) {
        return false;
      }
    }

    return true;
  }

  toggleTypeSelected() {
    if (this.allTypesSelected()) {
      this.showAll = true;
    } else {
      this.showAll = false;
    }
  }

  noTypesSelected() {
    return this.showTypes.value.length === 0;
  }

}
