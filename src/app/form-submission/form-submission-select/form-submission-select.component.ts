import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-submission-select',
  templateUrl: './form-submission-select.component.html',
  styleUrls: ['./form-submission-select.component.scss']
})
export class FormSubmissionSelectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onRouterOutletActivate(folderSelectFolders) {
    this.selectFoldersDataTable = folderSelectFolders.selectFolderDataTable;
    this.folderSelectFolders = folderSelectFolders;
  }

}
