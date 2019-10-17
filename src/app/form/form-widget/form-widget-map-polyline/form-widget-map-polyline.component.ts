import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

import { AgmPolyline } from '@agm/core';

interface Point {
  lat: number,
  lng: number
};

@Component({
  selector: 'app-form-widget-map-polyline',
  templateUrl: './form-widget-map-polyline.component.html',
  styleUrls: ['./form-widget-map-polyline.component.scss']
})
export class FormWidgetMapPolylineComponent extends FieldType implements OnInit {
  defaultOptions = {
    defaultValue: {
      polyline: [],
      viewport: {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 1
      }
    }
  };

  mode = 'view';

  @ViewChild(AgmPolyline) polyline;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  canEdit(): boolean {
    return this.mode === 'draw' && !this.formState.disabled;
  }

  onMapClick(event) {
    if (this.mode === 'draw') {
      this.model.polyline.push({
        lat: event.coords.lat,
        lng: event.coords.lng
      });
      this.formControl.markAsDirty();
      (<any>this.options)._buildForm(true);
    }
  }

  // This works around the annoying lack of two way binding for
  // polyline points.
  onLineMouseUp(event) {
    if (this.mode !== 'draw') {
      return;
    }

    this.polyline.getPath().then(path => {
      this.model.polyline = [];
      let i = 0;
      for (let p of path) {
        this.model.polyline.push({
          lat: p.lat(),
          lng: p.lng()
        });
      }
      this.formControl.markAsDirty();
      (<any>this.options)._buildForm(true);
    });
  }

  clearPolyline() {
    if (!this.formState.disabled) {
      this.model.polyline = [];
      this.formControl.markAsDirty();
      (<any>this.options)._buildForm(true);
    }
  }

  toggleView() {
    this.mode = 'view';
  }

  toggleDraw() {
    if (!this.formState.disabled) {
      this.mode = 'draw';
    }
  }

  toggleDelete() {
    if (!this.formState.disabled) {
      this.mode = 'delete';
    }
  }

  saveViewport() {
  }

}
