import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UploaderPage } from './Uploader.page';
import { UploaderPageRoutingModule } from './uploader-routing.module';
import { Camera } from '@ionic-native/camera/ngx';
import { IOSFilePicker} from '@ionic-native/file-picker/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploaderPageRoutingModule
  ],
  providers: [
    Camera,
    IOSFilePicker
  ],
  exports: [
    UploaderPage
  ],
  declarations: [UploaderPage]
})
export class UploaderPageModule {}
