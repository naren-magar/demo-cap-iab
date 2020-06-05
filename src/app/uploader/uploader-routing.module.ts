import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploaderPage } from './Uploader.page';

const routes: Routes = [
  {
    path: '',
    component: UploaderPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploaderPageRoutingModule {}
