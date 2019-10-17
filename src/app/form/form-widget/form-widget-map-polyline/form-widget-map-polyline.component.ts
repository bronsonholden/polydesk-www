import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { debounceTime } from 'rxjs/operators';

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
    defaultValue: {}
  };

  mode = 'view';
  path: Array<Point> = [];

  @ViewChild(AgmPolyline) polyline;

  private polylineFormControl: FormControl;
  private viewportFormControl: FormControl;

  private _lastPolylineLength = 0;

  constructor() {
    super();
  }

  ngOnInit() {
    for (let group of this.field.fieldGroup) {
      switch (group.key) {
        case 'viewport':
          this.viewportFormControl = group.formControl;
          break;
        case 'polyline':
          this.polylineFormControl = group.formControl;
          break;
        default:
          ;
      }
    }

    // TODO: Warn of missing polyline/viewport form controls
    // TODO (on API end): Validate schema always includes polyline/viewport form controls
    // TODO: Provide a $ref schema for convenience

    // ngx-formly spits out a lot of value changes. Just get the last.
    this.polylineFormControl.valueChanges.pipe(debounceTime(100)).subscribe(newVal => {
      // Reconstruct path on map if we're removing points
      if (newVal.length < this._lastPolylineLength) {
        this.path = this.model.polyline.map(p => Object.assign({}, p));
      }
      this._lastPolylineLength = newVal.length;
    });

    // Construct initial path
    const value = this.model.polyline || [];
    this._lastPolylineLength = value.length;
    this.path = value.map(p => Object.assign({}, p));
  }

  canEdit(): boolean {
    return this.mode === 'draw' && !this.formState.disabled;
  }

  onMapClick(event) {
    if (this.mode === 'draw') {
      this.add(this.path.length, {
        lat: event.coords.lat,
        lng: event.coords.lng
      });
    }
  }

  // This works around the annoying lack of two way binding for
  // polyline points.
  onLineMouseUp(event) {
    if (this.mode !== 'draw') {
      return;
    }

    this.polyline.getPath().then(path => {
      this.path = [];
      this.model.polyline.value = [];
      let i = 0;
      for (let p of path) {
        this.add(i++, {
          lat: p.lat(),
          lng: p.lng()
        });
      }
    });
  }

  add(i?: number, model?: Point) {
    this.path.splice(i, 0, model);
    // Mimicking ngx-formly FieldArrayType methods
    this.model.polyline.splice(i, 0, model);
    this.polylineFormControl.markAsDirty();
    (<any>this.options)._buildForm(true);
  }

  remove(i?: number) {
    this.path.splice(i, 1);
    // Mimicking ngx-formly FieldArrayType methods
    this.model.polyline.splice(i, 0);
    this.polylineFormControl.markAsDirty();
    (<any>this.options)._buildForm(true);
  }

  clearPolyline() {
    if (!this.formState.disabled) {
      this.path = [];
      // Mimicking ngx-formly FieldArrayType methods
      this.model.polyline = [];
      this.polylineFormControl.markAsDirty();
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
