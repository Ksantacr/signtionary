import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  urlApi:string = "http://www.modoayuda.com/api/";

  constructor(private http:HttpClient) {
  }

  getPaises(): Observable<Array<any>> {
    let url = this.urlApi+ "country";
    return this.http.get<Array<any>>(url)
  }

  postPais(pais:any): Observable<any> {
    let url = this.urlApi+ "country";
    return this.http.post<any>(url, pais);
  }
}
