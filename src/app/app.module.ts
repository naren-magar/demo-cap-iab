import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    File,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    FileChooser,
    FilePath,
    WebView,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
