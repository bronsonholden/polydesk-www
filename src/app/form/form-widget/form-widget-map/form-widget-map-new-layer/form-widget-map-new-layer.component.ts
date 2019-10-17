import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { get } from 'lodash';

@Component({
  selector: 'app-form-widget-map-new-layer',
  templateUrl: './form-widget-map-new-layer.component.html',
  styleUrls: ['./form-widget-map-new-layer.component.scss']
})
export class FormWidgetMapNewLayerComponent implements OnInit {

  data: any = {};

  constructor(private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<FormWidgetMapNewLayerComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit() {
    this.data.layerName = get(this.dialogData, 'defaultLayerName');
  }

  createNewLayer() {
    if (this.data.layerName === '') {
      return this.snackBar.open('Please enter a layer name', 'OK', {
        duration: 3000
      });
    }

    this.dialogRef.close(this.data.layerName);
  }

}
