import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPostModalPage } from './new-post-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewPostModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPostModalPageRoutingModule {}
