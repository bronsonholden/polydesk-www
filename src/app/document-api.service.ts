import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentApiService {
  constructor(private httpClient: HttpClient) {
  }

  getDocument(id) {
    return this.httpClient.get(`documents/${id}`);
  }

  getParentFolder(id) {
    let subject = new Subject();

    this.httpClient.get(`documents/${id}/folder`).subscribe((result: any) => {
      subject.next(result.data.relationships.folder);
    }, err => {
      subject.error(err);
    });

    return subject;
  }
}
