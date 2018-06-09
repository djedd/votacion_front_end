import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { MandatoDetailComponent } from './components/admin/mandato-detail/mandato-detail.component';
import { MandatoCreateComponent } from './components/admin/mandato-create/mandato-create.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { UserGuardService } from './services/guards/user-guard.service';
import { MandatoGuardService } from './services/guards/mandato-guard.service';
import { AdminGuardService } from './services/guards/admin-guard.service';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AdminGuardService],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'admin', component: AdminComponent },
      {
        path: 'users/:id',
        component: UserDetailComponent,
        canActivate: [UserGuardService]
      },
      {
        path: 'admin/mandato/:id',
        component: MandatoDetailComponent,
        canActivate: [MandatoGuardService]
      },
      { path: 'admin/create-mandato', component: MandatoCreateComponent}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
