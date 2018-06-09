import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = 'Votación Anticorrupción App';
  menu = 'Menu';

  constructor(private _router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this._router.navigate(['main/home']);
  }

  onSignOut() {
    this.authService.logout();
    this._router.navigate(['']);
   }

}
