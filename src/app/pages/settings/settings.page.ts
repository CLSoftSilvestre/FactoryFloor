import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  currentUser;

  constructor( private authService: AuthService) {

  }

  ngOnInit() {
    this.currentUser = this.authService.getUserProfile();

    console.log('Current passed user: ', this.currentUser);

  }

}
