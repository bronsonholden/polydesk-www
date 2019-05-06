import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { AngularTokenService } from 'angular-token';
import { ActivatedRoute } from '@angular/router';
import { map } from  'rxjs/operators';

export class FileUpload {
  data: File;
  progress: number;
  status: string;
};

enum FileUploadStatus {
  Pending = 1,
  InProgress,
  Success,
  Failure
};

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.scss']
})
export class DocumentCreateComponent implements OnInit {

  @ViewChild('fileUploader') fileUploader: ElementRef;
  public queuedFiles: Array<FileUpload> = [];
  public processQueue = false;
  private uploadingIndex = 0;

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private tokenService: AngularTokenService) { }

  ngOnInit() {
  }

  openSelectFiles() {
    this.fileUploader.nativeElement.click();
  }

  clearFiles() {
    this.queuedFiles = [];
    this.uploadingIndex = 0;
  }

  selectFiles(event) {
    this.clearFiles();

    for (let i = 0; i < event.target.files.length; ++i) {
      let file = event.target.files[i];

      this.queuedFiles.push({
        data: file,
        progress: 0,
        name: file.name,
        status: FileUploadStatus.Pending
      });
    }
  }

  getNextFile() {
    if (!this.processQueue || this.uploadingIndex >= this.queuedFiles.length) {
      return null;
    }

    let file = this.queuedFiles[this.uploadingIndex];

    this.uploadingIndex += 1;

    return file;
  }

  startUploads() {
    this.processQueue = true;
    this.uploadingIndex = 0;

    this.uploadNextFile();
  }

  stopUploads() {
    this.processQueue = false;
  }

  uploadNextFile() {
    let file = this.getNextFile();

    if (file) {
      file.status = FileUploadStatus.InProgress;

      this.uploadFile(file).subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          let progress = Math.round(100 * event.loaded / event.total);
          file.progress = progress;
        } else if (event instanceof HttpResponse) {
          console.log(event);
          file.status = FileUploadStatus.Success;
          this.uploadNextFile();
        }
      }, result => {
        console.log(result);
        file.status = FileUploadStatus.Failure;
      });
    }
  }

  uploadFile(file) {
    const base = this.tokenService.tokenOptions.apiBase;
    const accountIdentifier = this.route.snapshot.root.children[0].params.account;

    let formData = new FormData();

    formData.append('content', file.data);
    formData.append('name', file.name);

    return this.httpClient.post(`${base}/${accountIdentifier}/documents`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
