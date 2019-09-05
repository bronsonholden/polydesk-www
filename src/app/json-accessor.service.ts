import { Injectable } from '@angular/core';
import { get, isArray, isNil } from 'lodash';

/**
 * A helper class for retrieving data from a JSON using a mix of lodash.get
 * and array mapping. Specifically, this extends lodash.get to support
 * returning an array of values if an array field is retrieved without
 * an index, e.g. toDoList.name will return an array of names, whereas
 * toDoList[0].name will just return the first item's name.
 */
@Injectable({
  providedIn: 'root'
})
export class JsonAccessorService {
  constructor() { }

  access(obj, keys, defaultValue) {
    if (typeof keys === 'string') {
      keys = keys.split('.');
    }

    let res = keys.reduce((result, key) => {
      if (isArray(result)) {
        return result.map(val => get(val, key)).filter(val => !isNil(val));
      } else {
        return get(result, key);
      }
    }, obj);

    if (isNil(res) || isArray(res) && res.length === 0) {
      return defaultValue;
    } else {
      return res;
    }
  }
}
