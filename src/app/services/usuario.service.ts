import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario } from '../components/users/usuario';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>('/server/api/v1/usuario');
  }

  getUsuario(id: number): Observable<IUsuario> {
    return this.http.get<IUsuario>('/server/api/v1/usuario/' + id);
  }

  createUsuario(usuario) {
    const body = JSON.stringify(usuario);
    return this.http.post('/server/api/v1/usuario/save', body, httpOptions);
  }

  updateUsuario(usuario): Observable<IUsuario> {
    const body = JSON.stringify(usuario);
    return this.http.put<IUsuario>('/server/api/v1/usuario/update', body, httpOptions);
  }

}
