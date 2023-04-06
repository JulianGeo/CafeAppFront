import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../models/order.model";




@Injectable({
  providedIn: 'root'
})


export class OrdersApiService {

  constructor(private http: HttpClient) { }

  api: string = "http://localhost:8080/api/orders"


  getAll(): Observable<any> {
    return this.http.get(this.api);
  }

  getByID(param: string): Observable<any> {
    return this.http.get(this.api+"/"+param);
  }

  post(order:Order):  Observable<any> {
    return this.http.post(this.api, order);
  }

  update(param: string, order:Order): Observable<any> {
    return this.http.put(this.api+"/"+param, order);
  }

  deleteByID(param: string):  Observable<any> {
    return this.http.delete(this.api+"/"+param);
  }

}
