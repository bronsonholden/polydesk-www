import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FieldType } from '@ngx-formly/core';
import { FormWidgetMapNewLayerComponent } from './form-widget-map-new-layer/form-widget-map-new-layer.component';
import { AgmPolyline } from '@agm/core';

import { get, isNil } from 'lodash';

class Location {
  constructor(public lat: number, public lng: number) { }
}

class Marker {
  constructor(public location: Location) { }
};

enum MapMode {
  View = 0,
  Select,
  AddMarker,
  AddPolyline,
  AddPolygon
};

@Component({
  selector: 'app-form-widget-map',
  templateUrl: './form-widget-map.component.html',
  styleUrls: ['./form-widget-map.component.scss']
})
export class FormWidgetMapComponent extends FieldType implements OnInit {
  MapMode = MapMode;

  defaultOptions = {
    defaultValue: {
      viewport: {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 1
      },
      layers: []
    }
  };

  // Input for AgmMap
  viewport = {
    lat: 0,
    lng: 0,
    zoom: 1
  };

  // Track current viewport (two-way binding not supported)
  private modifiedViewport = {
    lat: 0,
    lng: 0,
    zoom: 1
  };

  mode: MapMode = MapMode.View;
  currentLayer: number | null;
  currentPolyline: number | null;

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.viewport = {
      lat: get(this.model, 'viewport.center.lat', 0),
      lng: get(this.model, 'viewport.center.lng', 0),
      zoom: get(this.model, 'viewport.zoom', 1)
    };
  }

  modeName(mode) {
    switch (mode) {
      case MapMode.View:
        return 'View';
      case MapMode.AddMarker:
        return 'Add Marker';
      case MapMode.AddPolyline:
        return 'Add Polyline';
      case MapMode.AddPolygon:
        return 'Add Polygon';
      case MapMode.Select:
        return 'Selection';
      default:
        return '';
    }
  }

  validCurrentLayer(): boolean {
    return !isNaN(this.currentLayer);
  }

  layerButtonLabel(): string {
    if (this.validCurrentLayer()) {
      return this.layerTitle(this.currentLayer);
    } else if (this.model.layers.length === 0) {
      return 'No Layers';
    } else {
      return 'No Layer Selected';
    }
  }

  layerTitle(layerIndex) {
    const layer = this.model.layers[layerIndex];

    if (!layer) {
      return '';
    }

    if (!isNil(layer.name)) {
      return layer.name;
    } else {
      return `Layer ${layerIndex + 1}`;
    }
  }

  layerButtonColor(): string {
    if (this.validCurrentLayer() || this.model.layers.length !== 0) {
      return '';
    } else {
      return 'warn';
    }
  }

  addNewLayer() {
    const dialogRef = this.dialog.open(FormWidgetMapNewLayerComponent, {
      data: {
        defaultLayerName: `Layer ${this.model.layers.length + 1}`
      }
    });

    dialogRef.afterClosed().subscribe(layerName => {
      this.model.layers.push({
        name: layerName,
        markers: [],
        polylines: [],
        polygons: []
      });
      if (isNaN(this.currentLayer)) {
        this.currentLayer = 0;
      }
      this.updateForm();
    });
  }

  activateLayer(layerIndex) {
    const layer = this.model.layers[layerIndex];

    if (!layer) {
      return this.layerError(layerIndex);
    }

    this.currentLayer = layerIndex;
  }

  updateForm() {
    (<any>this.options)._buildForm(true);
    this.formControl.markAsDirty();
  }

  onMapClick(event) {
    const location = new Location(event.coords.lat, event.coords.lng);
    switch (this.mode) {
      case MapMode.AddMarker:
        this.addMarker(this.currentLayer, location);
        break;
      case MapMode.AddPolyline:
        const layer = this.model.layers[this.currentLayer];
        let polyline;
        if (!isNil(this.currentPolyline)) {
          polyline = layer.polylines[this.currentPolyline];
          polyline.points.push({ location });
        } else {
          this.currentPolyline = layer.polylines.length;
          this.addPolyline(this.currentLayer, [ { location }]);
        }
        break;
      default:
        ;
    }
    this.updateForm();
  }

  onZoomChange(zoom) {
    this.modifiedViewport.zoom = zoom;
  }

  onCenterChange({ lat, lng }) {
    this.modifiedViewport.lat = lat;
    this.modifiedViewport.lng = lng;
  }

  onPolylineChange(event) {
    this.formControl.markAsDirty();
    (<any>this.options)._buildForm(true);
  }

  saveViewport() {
    this.model.viewport = {
      center: {
        lat: this.modifiedViewport.lat,
        lng: this.modifiedViewport.lng
      },
      zoom: this.modifiedViewport.zoom
    };
    this.updateForm();
  }

  layerError(layerIndex) {
    if (this.model.layers.length === 0) {
      this.snackBar.open('Map has no layers', 'OK', {
        duration: 5000
      });
    } else {
      this.snackBar.open(`Map layer at index ${layerIndex} does not exist`, 'OK', {
        duration: 5000
      });
    }
  }

  addMarker(layerIndex, location: Location) {
    let layer = this.model.layers[layerIndex];

    if (!layer) {
      return this.layerError(layerIndex);
    }

    layer.markers.push(new Marker(location));
    this.updateForm();
  }

  viewMode() {
    this.mode = MapMode.View;
    this.currentPolyline = null;
  }

  addMarkerMode() {
    this.mode = MapMode.AddMarker;
  }

  addPolylineMode() {
    this.mode = MapMode.AddPolyline;
  }

  addPolygonMode() {
    this.mode = MapMode.AddPolygon;
  }

  addPolyline(layerIndex, points) {
    let layer = this.model.layers[layerIndex];

    if (!layer) {
      return this.layerError(layerIndex);
    }

    layer.polylines.push({ points });
  }

  addPolygon(layerIndex, points) {

  }

  updateMarker(layerIndex, markerIndex, point) {

  }

  updatePolyline(layerIndex, polylineIndex, points) {

  }

  updatePolygon(layerIndex, polygonIndex, points) {

  }

  removeMarker(layerIndex, markerIndex) {

  }

  removePolyline(layerIndex, polylineIndex) {

  }

  removePolygon(layerIndex, polygonIndex) {

  }

  clearLayer() {
    let layer = this.model.layers[this.currentLayer];

    if (!layer) {
      return this.layerError(this.currentLayer);
    }

    layer.markers.splice(0, layer.markers.length);
    layer.polylines.splice(0, layer.polylines.length);
    layer.polygons.splice(0, layer.polygons,length);

    this.updateForm();
  }

}
