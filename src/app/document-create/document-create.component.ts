import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularTokenService } from 'angular-token';
import { ActivatedRoute } from '@angular/router';

export class FileUpload {
  data: File;
  progress: number;
};

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.scss']
})
export class DocumentCreateComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader: ElementRef;
  public selectedFiles: Array<FileUpload> = [];

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private tokenService: AngularTokenService) { }

  ngOnInit() {
  }

  openSelectFiles() {
    this.fileUploader.nativeElement.click();
  }

  clearFiles() {
    this.selectedFiles = [];
  }

  selectFiles(event) {
    this.clearFiles();

    for (let i = 0; i < event.target.files.length; ++i) {
      let file = event.target.files[i];

      this.selectedFiles.push({
        data: file,
        progress: 0,
        name: file.name
      });
    }
  }

  uploadFiles() {
    const base = this.tokenService.tokenOptions.apiBase;
    const accountIdentifier = this.route.snapshot.root.children[0].params.account;

    let file = this.selectedFiles[0];
    let formData = new FormData();

    formData.append('content', file.data);
    formData.append('name', file.name);

    this.httpClient.post(`${base}/${accountIdentifier}/documents`, formData).subscribe(result => {
      console.log(result);
    }, result => {
      console.log(result);
    });
  }

}
