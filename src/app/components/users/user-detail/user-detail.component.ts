import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  pageTitle = 'Detalle del Usuario';
  usuario: IUsuario;
  errorMessage: string;
  userTypes = [
    { 'name': 'Basico' },
    { 'name': 'Administrador' }
  ];
  usuarioForm: FormGroup;
  validMessage: string;


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService) { }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getUsuario(id);
    }
    this.initializeUserFormObject();
    this.setDefaultValue(+param);
  }

  async setDefaultValue(id) {
    await this._usuarioService.getUsuario(id).toPromise();
    this.usuarioForm.get('id_usuario').setValue(this.usuario.id_usuario);
    this.usuarioForm.get('nombre').setValue(this.usuario.nombre);
    this.usuarioForm.get('apellido').setValue(this.usuario.apellido);
    this.usuarioForm.get('identificacion').setValue(this.usuario.identificacion);
    this.usuarioForm.get('contrasena').setValue(this.usuario.contrasena);
    this.usuarioForm.get('tipo').setValue(this.usuario.tipo);
    this.usuarioForm.get('fecha_registro').setValue(this.usuario.fecha_registro);
  }

  onBack(): void {
    this._router.navigate(['main/users']);
  }

  getUsuario(id: number): void {
    this._usuarioService.getUsuario(+`${id}`)
      .subscribe(
        usuario => this.usuario = usuario,
        error => this.errorMessage = <any>error
      );
  }

  initializeUserFormObject() {
    this.usuarioForm = new FormGroup({
      id_usuario: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      identificacion: new FormControl('', Validators.required),
      contrasena: new FormControl(),
      tipo: new FormControl('', Validators.required),
      fecha_registro: new FormControl('', Validators.required)
    });
  }

  submitRegistration() {
    if (this.usuarioForm.valid) {
      this.validMessage = 'Usuario actualizado correctamente. Gracias!';
      this._usuarioService.updateUsuario(this.usuarioForm.value).subscribe(
        data => {
          // this.usuarioForm.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      );
    } else {
      this.validMessage = 'Ups! hubo un error al actualizar, por favor revise todos los campos';
    }
  }

}
