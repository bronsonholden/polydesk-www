import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-blueprint-composer',
  templateUrl: './blueprint-composer.component.html',
  styleUrls: ['./blueprint-composer.component.scss']
})
export class BlueprintComposerComponent implements OnInit {

  @Input() name: string = '';
  @Input() namespace: string = '';
  @Input() schema: string = '';
  @Input() view: string = '';
  @Input() constructionView: string = '';
  @Input() listView: string = '';
  @Output() nameChange = new EventEmitter<any>();
  @Output() namespaceChange = new EventEmitter<any>();
  @Output() schemaChange = new EventEmitter<any>();
  @Output() viewChange = new EventEmitter<any>();
  @Output() constructionViewChange = new EventEmitter<any>();
  @Output() listViewChange = new EventEmitter<any>();

  jsonSections = [
    {
      key: 'schema',
      title: 'Schema',
      text: this.schema,
      textChange: this.schemaChange
    },
    {
      key: 'view',
      title: 'View',
      text: this.view,
      textChange: this.viewChange
    },
    {
      key: 'constructionView',
      title: 'Construction View',
      text: this.constructionView,
      textChange: this.constructionViewChange
    },
    {
      key: 'listView',
      title: 'List View',
      text: this.listView,
      textChange: this.listViewChange
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    for (let part in changes) {
      const value = changes[part];
      if (!value.firstChange) {
        this.jsonSections.filter(section => section.key === part).forEach(section => {
          section.text = value.currentValue;
        });
      }
    }
  }

}
