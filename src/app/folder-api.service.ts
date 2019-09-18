import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderApiService {
  constructor(private httpClient: HttpClient) {
  }

  index(offset, limit, sort, filter) {
    let params = new HttpParams().set('page[offset]', offset).set('page[limit]', limit);

    if (sort) {
      params = params.set('sort', sort);
    }

    for (let f in filter) {
      params = params.set(`filter[${f}]`, filter[f]);
    }

    return this.httpClient.get('folders', { params });
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
