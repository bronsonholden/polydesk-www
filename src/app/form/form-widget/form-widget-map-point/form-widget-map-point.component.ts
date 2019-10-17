import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'app-form-widget-map-point',
  templateUrl: './form-widget-map-point.component.html',
  styleUrls: ['./form-widget-map-point.component.scss']
})
export class FormWidgetMapPointComponent extends FieldType implements OnInit {
  defaultOptions = {
    defaultValue: {
      viewport: {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 1
      }
    }
  };

  viewport = {
    lat: 0,
    lng: 0,
    zoom: 1
  };

  private modifiedViewport = {
    lat: 0,
    lng: 0,
    zoom: 1
  }

  get lat(): number {
    return this.model.marker.lat;
  }

  get lng(): number {
    return this.model.marker.lng;
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.viewport.lat = this.model.viewport.center.lat;
    this.viewport.lng = this.model.viewport.center.lng;
    this.viewport.zoom = this.model.viewport.zoom;
  }

  onMapClick(event) {
    this.model.marker.lat = event.coords.lat;
    this.model.marker.lng = event.coords.lng;
    this.formControl.markAsDirty();
    (<any>this.options)._buildForm(true);
  }

  onZoomChange(zoom) {
    this.modifiedViewport.zoom = zoom;
  }

  onCenterChange({ lat, lng }) {
    this.modifiedViewport.lat = lat;
    this.modifiedViewport.lng = lng;
  }

  saveViewport() {
    this.model.viewport.center.lat = this.modifiedViewport.lat;
    this.model.viewport.center.lng = this.modifiedViewport.lng;
    this.model.viewport.zoom = this.modifiedViewport.zoom;
    this.formControl.markAsDirty();
    (<any>this.options)._buildForm(true);
  }

  dropMarker() {

  }

  clearMarker() {

  }

  toggleView() {

  }

}
