import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AgmPolyline } from '@agm/core';

@Component({
  selector: 'app-form-widget-map-polyline-wrapper',
  templateUrl: './form-widget-map-polyline-wrapper.component.html',
  styleUrls: ['./form-widget-map-polyline-wrapper.component.scss']
})
export class FormWidgetMapPolylineWrapperComponent implements OnInit {

  @Input() polyline;
  @Output() polylineChange = new EventEmitter<any>();

  @ViewChild(AgmPolyline) polylineRef: AgmPolyline;

  constructor() { }

  ngOnInit() {
  }

  onLineMouseUp(event) {
    this.polylineRef.getPath().then(path => {
      this.polyline.points.splice(0, this.polyline.points.length);
      let i = 0;
      for (let p of path) {
        this.polyline.points.push({
          location: {
            lat: p.lat(),
            lng: p.lng()
          }
        });
      }
      this.polylineChange.emit(this.polyline.points.map(p => Object.assign({}, p)));
    });
  }

}
