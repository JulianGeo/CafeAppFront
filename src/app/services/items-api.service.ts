import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../models/item.model";




@Injectable({
  providedIn: 'root'
})


export class ItemsApiService {

  constructor(private http: HttpClient) { }

  api: string = "http://localhost:8080/api/items"


  getAll(): Observable<any> {
    return this.http.get(this.api);
  }

  getByID(param: string): Observable<any> {
    return this.http.get(this.api+"/"+param);
  }

  getByName(name: string): Observable<any> {
    return this.http.get(this.api+"/email/"+name);
  }

  post(item:Item):  Observable<any> {
    return this.http.post(this.api, item);
  }

  update(param: string, item:Item): Observable<any> {
    return this.http.put(this.api+"/"+param, item);
  }

  deleteByID(param: string):  Observable<any> {
    return this.http.delete(this.api+"/"+param);
  }

}
