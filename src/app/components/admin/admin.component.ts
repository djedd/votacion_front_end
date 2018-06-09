import { Component, OnInit } from '@angular/core';
import { IVoto } from './voto';
import { IMandato } from './mandato';
import { MandatoService } from '../../services/mandato.service';
import { VotoService } from '../../services/voto.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  mandato;
  pageTitle = 'Lista de Mandatos';
  showImage = false;
  _listFilter: string;
  errorMessage: string;
  statusCode: number;
  voto: IVoto;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredMandatos = this.listFilter ? this.performFilter(this.listFilter) : this.listMandatos
    ;
  }

  listVotos: IVoto[] = [];
  filteredMandatos: IMandato[];
  listMandatos: IMandato[] = [];

  // filtra por abrevacion y descripcion
  performFilter(filterBy: string): IMandato[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.listMandatos.filter((mandato: IMandato) =>
      mandato.abreviacion.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      mandato.descripcion.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  constructor(private mandatoService: MandatoService,
    private votoService: VotoService) { }

  ngOnInit() {
    this.fetchData();
  }

  getMandato(id) {
    this.mandatoService.getMandato(id).subscribe(
      data => { this.mandato = data; },
      err => console.error(err),
      () => console.log('mandato loaded')
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  deleteMandato(id) {
    this.mandatoService.deleteMandato(id).subscribe(successCode => {
      this.statusCode = 204;
      this.fetchData();
    },
      errorCode => this.statusCode = errorCode
    );
  }

  fetchData() {

    this.mandatoService.getMandatos()
      .subscribe(listMandatos => {
        this.listMandatos = listMandatos;
        this.filteredMandatos = this.listMandatos;
      },
        error => this.errorMessage = <any>error,
        () => {
          this.getAllVotos();
        }
      );
  }

  getVotos(id: number) {
    this.votoService.getVotos(id)
      .subscribe(data => {
      },
        error => this.errorMessage = <any>error
      );
  }

  getAllVotos() {
    this.votoService.getAllVotos()
      .subscribe(data => {
        this.listVotos = data;
      },
        error => this.errorMessage = <any>error,
        () => {
          this.setVotos();
          // console.log(this.listMandatos);
        }
      );
  }

  setVotos() {

    this.listMandatos.forEach((item, index) => {
      item.cantidad = 0;
    }
    );
    for (let i = 0; i < this.listMandatos.length; i++) {
      for (let j = 0; j < this.listVotos.length; j++) {
        if (this.listMandatos[i].id_mandato === this.listVotos[j].mandato.id_mandato) {
          this.listMandatos[i].cantidad = this.listMandatos[i].cantidad + 1;
        }
      }
    }
  }


}
