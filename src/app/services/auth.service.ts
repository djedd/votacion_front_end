import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IUser } from '../components/login/user';
import { IUsuario } from '../components/users/usuario';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUSer = {} as IUser;
  logged: IUser;
  redirectUrl: String;
  usuario: IUsuario;
  errorMessage: string;

  constructor(private http: HttpClient,
    private router: Router) { }

  isLoggedIn(): boolean {
    return !!this.logged; // pregunta si el objeto es nulo
  }

  // Pregunta al servidor utilizando el servicio login
  requestLogin(login: IUser): Observable<IUsuario> {
    const body = JSON.stringify(login);
    return this.http.post<IUsuario>('/server/api/v1/login/', body, httpOptions);
  }

  loginVerification(usuario: IUsuario) {
    if (!!this.usuario) { // si el servidor no devuelve null se hace el usuario
      this.currentUSer.identificacion = usuario.identificacion;
      this.currentUSer.contrasena = usuario.contrasena;
      this.currentUSer.isAdmin = (usuario.tipo === 'Administrador');
      this.logged = this.currentUSer;
      alert(`Usuario: ${this.currentUSer.identificacion} ha iniciado sesión correctamente!`);
      this.router.navigate(['/main']);
    } else {
      alert(`Nombre de usuario/contraseña incorrectos!`);
    }
  }

  doLogin(user: IUser) {
    if (!user.identificacion || !user.contrasena) {
      alert('Por favor debes llenar los campos identificacion y contraseña');
      return;
    }
    this.requestLogin(user)
      .subscribe(usuario => {
        this.usuario = usuario;
      },
        error => this.errorMessage = <any>error,
        () => {
          this.loginVerification(this.usuario);
        }
      );
  }

  logout(): void {
    this.logged = null;
  }
}
