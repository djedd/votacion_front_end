import { Component, OnInit } from '@angular/core';
import { IUsuario } from './usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usuario;
  pageTitle = 'Lista de Usuarios';
  showImage = false;
  _listFilter: string;
  errorMessage: string;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUsuarios = this.listFilter ? this.performFilter(this.listFilter) : this.listUsuarios;
  }

  filteredUsuarios: IUsuario[];
  listUsuarios: IUsuario[] = [];

  performFilter(filterBy: string): IUsuario[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.listUsuarios.filter((product: IUsuario) =>
      product.nombre.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      product.apellido.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      product.tipo.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarios()
      .subscribe(listUsuarios => {
        this.listUsuarios = listUsuarios;
        this.filteredUsuarios = this.listUsuarios;
      },
        error => this.errorMessage = <any>error);
  }

  getUsuario(id) {
    this.usuarioService.getUsuario(id).subscribe(
      data => { this.usuario = data; },
      err => console.error(err),
      () => console.log('jugador loaded')
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
