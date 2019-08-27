import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderApiService {
  constructor(private httpClient: HttpClient) {
  }

  getFolder(id) {
    return this.httpClient.get(`folders/${id}`);
  }

  getParentFolder(id) {
    let subject = new Subject();

    this.httpClient.get(`folders/${id}/folder`).subscribe((result: any) => {
      subject.next(result);
    }, err => {
      subject.error(err);
    });

    return subject;
  }
}
