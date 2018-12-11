import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { ResizeEvent } from 'angular-resizable-element';

export interface DocumentElement {
  name: string;
}

@Component({
  selector: 'app-document-browser',
  templateUrl: './document-browser.component.html',
  styleUrls: ['./document-browser.component.scss']
})
export class DocumentBrowserComponent implements OnInit {
  @ViewChild('documentBrowserSidenav') documentBrowserSidenav: ElementRef;
  @ViewChild('documentBrowserContent') documentBrowserContent: ElementRef;

  documentList = new MatTableDataSource<DocumentElement>();
  selection = new SelectionModel<DocumentElement>(true, []);

  displayedColumns = [
    'select',
    'name'
  ];

  constructor() {
    for (var i = 0; i < 100; ++i) {
      this.documentList.data.push({ name: `Document #${i + 1}.pdf` });
    }
  }

  ngOnInit() {
  }

  /* Check if all rows in the document list are selected */
  isAllSelected() {
    return this.selection.selected.length === this.documentList.data.length;
  }

  selectAll() {
    this.documentList.data.forEach(row => this.selection.select(row));
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.selectAll();
  }

  onResizeEnd(event: ResizeEvent) {
    console.log(this.documentBrowserContent);
    let sidenav = this.documentBrowserSidenav._elementRef.nativeElement;
    let content = this.documentBrowserContent.elementRef.nativeElement;
    let width = sidenav.clientWidth + event.edges.right;
    let margin = parseInt(content.style['margin-left']) + event.edges.right;

    width = Math.max(Math.min(width, 800), 300);
    margin = Math.max(Math.min(margin, 800), 300);

    sidenav.style.width = `${width}px`;
    content.style['margin-left'] = `${margin}px`;
  }

}
