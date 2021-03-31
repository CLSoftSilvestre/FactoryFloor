import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPostModalPageRoutingModule } from './new-post-modal-routing.module';

import { NewPostModalPage } from './new-post-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPostModalPageRoutingModule
  ],
  declarations: [NewPostModalPage]
})
export class NewPostModalPageModule {}
