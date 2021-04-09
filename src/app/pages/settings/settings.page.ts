import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  loadingData: Boolean = true;
  currentUser: User;

  constructor( private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.getUserProfile().subscribe((profile: User) => {
      this.currentUser = profile;
      console.log('Current passed user: ', profile);
      this.loadingData = false;
    });

  }

}
