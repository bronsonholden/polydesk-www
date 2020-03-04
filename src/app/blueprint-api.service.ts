import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlueprintApiService {

  constructor(private httpClient: HttpClient) { }

  index(offset, limit, sort, filter) {
    let params = new HttpParams().set('page[offset]', offset).set('page[limit]', limit);

    if (sort && sort.length > 0) {
      params = params.set('sort', sort);
    }

    for (let f in filter) {
      params = params.set(`filter[${f}]`, filter[f]);
    }

    return this.httpClient.get('blueprints', { params });
  }

  getBlueprint(id) {
    return this.httpClient.get(`blueprints/${id}`);
  }

  getBlueprintByNamespace(namespace) {
    return this.httpClient.get(`blueprints?filter[namespace]=${namespace}`);
  }

  createBlueprint(name, namespace, schema, view, constructionView, listView) {
    return this.httpClient.post('blueprints', {
      data: {
        type: 'blueprints',
        attributes: {
          name: name,
          namespace: namespace,
          schema: schema,
          view: view,
          'construction-view': constructionView,
          'list-view': listView
        }
      }
    });
  }

  updateBlueprint(id, attributes) {
    return this.httpClient.patch(`blueprints/${id}`, {
      data: {
        id: id,
        type: 'blueprints',
        attributes: attributes
      }
    });
  }

  constructBlueprint(id, data) {
    return this.httpClient.post('prefabs', {
      data: {
        type: 'prefabs',
        attributes: {
          data: data
        },
        relationships: {
          blueprint: {
            data: {
              type: 'blueprints',
              id: id
            }
          }
        }
      }
    });
  }
}
