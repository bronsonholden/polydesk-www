import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-blueprint-composer-json-editor',
  templateUrl: './blueprint-composer-json-editor.component.html',
  styleUrls: ['./blueprint-composer-json-editor.component.scss']
})
export class BlueprintComposerJsonEditorComponent implements OnInit {

  @Input() text: string = '';
  @Output() textChange = new EventEmitter<any>();
  @ViewChild('editor') editor: any;

  constructor() { }

  ngOnInit() {
  }

  resizeEditor(resizeEvent: ResizedEvent) {
    this.editor.getEditor().resize();
  }

}
