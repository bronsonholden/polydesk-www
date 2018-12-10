import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-browser',
  templateUrl: './document-browser.component.html',
  styleUrls: ['./document-browser.component.scss']
})
export class DocumentBrowserComponent implements OnInit {

  documentList = [];

  displayedColumns: String = [
    'name'
  ];

  constructor() {
    for (var i = 0; i < 100; ++i) {
      this.documentList.push({ name: `Document #${i + 1}.pdf` });
    }
  }

  ngOnInit() {
  }

}
