import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-blueprint-composer-json-editor',
  templateUrl: './blueprint-composer-json-editor.component.html',
  styleUrls: ['./blueprint-composer-json-editor.component.scss']
})
export class BlueprintComposerJsonEditorComponent implements OnInit {

  @Input() text: string = '';
  @Output() textChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
