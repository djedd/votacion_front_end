import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { MandatoDetailComponent } from './components/admin/mandato-detail/mandato-detail.component';
import { MandatoCreateComponent } from './components/admin/mandato-create/mandato-create.component';
import { AuthService } from './services/auth.service';
import { MandatoService } from './services/mandato.service';
import { UsuarioService } from './services/usuario.service';
import { VotoService } from './services/voto.service';
import { AdminGuardService } from './services/guards/admin-guard.service';
import { UserGuardService } from './services/guards/user-guard.service';
import { MandatoGuardService } from './services/guards/mandato-guard.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    UsersComponent,
    UserDetailComponent,
    MandatoDetailComponent,
    MandatoCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [DatePipe, AuthService, MandatoService, UsuarioService, VotoService, AdminGuardService, UserGuardService, MandatoGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
