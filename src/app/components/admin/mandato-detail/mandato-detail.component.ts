import { Component, OnInit } from '@angular/core';
import { IMandato } from '../mandato';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MandatoService } from '../../../services/mandato.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mandato-detail',
  templateUrl: './mandato-detail.component.html',
  styleUrls: ['./mandato-detail.component.css']
})
export class MandatoDetailComponent implements OnInit {

  pageTitle = 'Detalle del Mandato';
  mandato: IMandato;
  errorMessage: string;
  validMessage: string;
  mandatoForm: FormGroup;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _mandatoService: MandatoService) { }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getMandato(id);
    }
    this.initializeUserFormObject();
    this.setDefaultValue(+param);
  }

  async setDefaultValue(id) {
    await this._mandatoService.getMandato(id).toPromise();
    this.mandatoForm.get('id_mandato').setValue(this.mandato.id_mandato);
    this.mandatoForm.get('abreviacion').setValue(this.mandato.abreviacion);
    this.mandatoForm.get('descripcion').setValue(this.mandato.descripcion);
    this.mandatoForm.get('fecha_creacion').setValue(this.mandato.fecha_creacion);
  }

  onBack(): void {
    this._router.navigate(['main/admin']);
  }

  getMandato(id: number): void {
    this._mandatoService.getMandato(+`${id}`)
      .subscribe(
        mandato => this.mandato = mandato,
        error => this.errorMessage = <any>error
      );
  }

  initializeUserFormObject() {
    this.mandatoForm = new FormGroup({
      id_mandato: new FormControl('', Validators.required),
      abreviacion: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      fecha_creacion: new FormControl('', Validators.required),
    });
  }

  submitRegistration() {
    if (this.mandatoForm.valid) {
      this.validMessage = 'Mandato actualizado correctamente. Gracias!';
      this._mandatoService.updateMandato(this.mandatoForm.value).subscribe(
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
