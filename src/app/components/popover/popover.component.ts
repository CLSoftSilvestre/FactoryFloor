import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, public popoverController: PopoverController) { }

  ngOnInit() {}

  signOut() {
    this.authService.signOut().then(() => {
      // Esperar pela resolução da promisse para navegar para a página de login
      this.popoverController.dismiss();
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
}
