import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private file: File,
              private iab: InAppBrowser,
              private router: Router) {}

  private get url(): string {
    return `${this.file.applicationDirectory}/public/assets/something.html`;
  }

  open() {
    this.iab.create(this.url, '_blank').show();
  }

  async navigateUploader() {
    await this.router.navigate(['uploader']);
  }
}
