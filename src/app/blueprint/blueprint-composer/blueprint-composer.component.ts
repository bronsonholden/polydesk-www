import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-blueprint-composer',
  templateUrl: './blueprint-composer.component.html',
  styleUrls: ['./blueprint-composer.component.scss']
})
export class BlueprintComposerComponent implements OnInit {

  part = 'schema';
  @Input() schema: string = '';
  @Input() view: string = '';
  @Input() constructionView: string = '';
  @Input() listView: string = '';
  @Output() schemaChange = new EventEmitter<any>();
  @Output() viewChange = new EventEmitter<any>();
  @Output() constructionViewChange = new EventEmitter<any>();
  @Output() listViewChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  get partText() {
    switch (this.part) {
      case 'schema':
        return this.schema;
      case 'view':
        return this.view;
      case 'constructionView':
        return this.constructionView;
      case 'listView':
        return this.listView;
      default:
        return '';
    }
  }

  partTextChange(text) {
    switch (this.part) {
      case 'schema':
        this.schemaChange.emit(text);
        break;
      case 'view':
        this.viewChange.emit(text);
        break;
      case 'constructionView':
        this.constructionViewChange.emit(text);
        break
      case 'listView':
        this.listViewChange.emit(text);
        break;
      default:
        break;
    }
  }

}
