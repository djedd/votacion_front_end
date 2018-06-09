import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMandato } from '../components/admin/mandato';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class MandatoService {

  constructor(private http: HttpClient) { }

  getMandatos(): Observable<IMandato[]> {
    return this.http.get<IMandato[]>('/server/api/v1/mandato');
  }

  getMandato(id: number): Observable<IMandato> {
    return this.http.get<IMandato>('/server/api/v1/mandato/' + id);
  }

  createMandato(mandato) {
    const body = JSON.stringify(mandato);
    return this.http.post('/server/api/v1/mandato/save', body, httpOptions);
  }

  updateMandato(mandato): Observable<IMandato> {
    const body = JSON.stringify(mandato);
    return this.http.put<IMandato>('/server/api/v1/mandato/update', body, httpOptions);
  }

  deleteMandato(id: number) {
    return this.http.delete('/server/api/v1/mandato/delete/' + id);
  }
}
