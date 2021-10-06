import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  apiUrl = environment.apiUrl_v2;

  constructor(private http: HttpClient) {

  }

  public retrieveAllInspector(): Observable<any>{
    return this.http.get<Admin>(this.apiUrl + '/retrieveAllRegistration');
  }
}
