import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";




@Injectable({
  providedIn: 'root'
})


export class UsersApiService {

  constructor(private http: HttpClient) { }

  api: string = "http://localhost:8080/api/users"


  getAll(): Observable<any> {
    return this.http.get(this.api);
  }

  getByID(id: string): Observable<any> {
    return this.http.get(this.api+"/"+id);
  }

  getByEmail(email: string): Observable<any> {
    return this.http.get(this.api+"/email/"+email);
  }


  post(user:User):  Observable<any> {
    console.log("The sent user is:" + user);
    console.log("The sent user name is:" + user.name);
    return this.http.post(this.api, user);
  }

  update(param: string, user:User): Observable<any> {
    return this.http.put(this.api+"/"+param, user);
  }

  deleteByID(param: string):  Observable<any> {
    return this.http.delete(this.api+"/"+param);
  }

}
