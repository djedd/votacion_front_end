import { Component, OnInit } from '@angular/core';
import { IMandato } from '../mandato';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MandatoService } from '../../../services/mandato.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mandato-create',
  templateUrl: './mandato-create.component.html',
  styleUrls: ['./mandato-create.component.css']
})
export class MandatoCreateComponent implements OnInit {

  pageTitle = 'Crea un mandato';
  mandato: IMandato;
  erroMessage: string;
  validMessage: string;
  mandatoForm: FormGroup;
  currentTime = new Date();
  pipe = new DatePipe('en-US');

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _mandatoService: MandatoService,
  ) { }

  ngOnInit() {
    this.initializeUserFormObject();
    this.setDefaultValue();
  }

  onBack(): void {
    this._router.navigate(['main/admin']);
  }

  initializeUserFormObject() {
    this.mandatoForm = new FormGroup({
      id_mandato: new FormControl(''),
      abreviacion: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      fecha_creacion: new FormControl('', Validators.required)
    });
  }

  setDefaultValue() {

    const formatedDate = this.pipe.transform(this.currentTime, 'MM-dd-yyyy HH:mm:ss');
    this.mandatoForm.get('fecha_creacion')
      .setValue(formatedDate);
  }

  submitRegistration() {
    if (this.mandatoForm.valid) {
      this.validMessage = 'Mandato creado correctamente. Gracias!';
      console.log(this.mandatoForm.get('fecha_creacion').value);
      this._mandatoService.createMandato(this.mandatoForm.value)
        .subscribe(data => {
          return true;
        },
          error => {
            return Observable.throw(error);
          }
        );
    } else {
      this.validMessage = 'Ups! hubo un error al crear el mandato, por favor revise los campos';
    }
  }

}
