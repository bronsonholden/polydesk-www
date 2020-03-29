import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ResourceApi } from './resource-api';

@Injectable({
  providedIn: 'root'
})
export class BlueprintApiService extends ResourceApi {

  resourceName(): string {
    return 'blueprints';
  }

  getBlueprint(id) {
    return this.httpClient.get(`blueprints/${id}`);
  }

  getBlueprintByNamespace(namespace) {
    return this.httpClient.get(`blueprints?filter[]=prop('namespace')=='${namespace}'`);
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
