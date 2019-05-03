import { Component, OnInit } from '@angular/core';
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

  files: Array<FileUpload> = [];

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private tokenService: AngularTokenService) { }

  ngOnInit() {
  }

  selectFiles(event) {
    this.files = [];

    for (let i = 0; i < event.target.files.length; ++i) {
      let file = event.target.files[i];

      this.files.push({
        data: file,
        progress: 0,
        name: file.name
      });
    }
  }

  uploadFiles() {
    const base = this.tokenService.tokenOptions.apiBase;
    const accountIdentifier = this.route.snapshot.root.children[0].params.account;

    let file = this.files[0];
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
