import { Injectable } from '@angular/core';

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

  // TODO
}
