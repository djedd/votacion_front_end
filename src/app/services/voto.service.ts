import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVoto } from '../components/admin/voto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class VotoService {

  constructor(private http: HttpClient) { }

  getVotos(id: number) {
    return this.http.get<Number>('/server/api/v1/voto' + id);
  }

  getAllVotos(): Observable<IVoto[]> {
    return this.http.get<IVoto[]>('/server/api/v1/voto');
  }
}
