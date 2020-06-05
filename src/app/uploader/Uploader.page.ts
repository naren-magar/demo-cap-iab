import { Component } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@Component({
    selector: 'app-uploader',
    templateUrl: './uploader.page.html',
    styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage {
    documentURI: any;
    docType: any;
    private fileContent: any;
    private isAndroid: boolean;

    constructor(private camera: Camera,
                private file: File,
                private filePicker: IOSFilePicker,
                private fileChooser: FileChooser,
                private filePath: FilePath,
                private platform: Platform,
                private webview: WebView,
                public actionSheetController: ActionSheetController) {
        this.isAndroid = this.platform.is('android');
    }

    async selectImage() {
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
                text: 'Choose from photo Library...',
                handler: () => {
                    this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
                    console.log('Choose from Library');
                }
            },
                {
                    text: 'Take Photo...',
                    handler: () => {
                        this.getImage(this.camera.PictureSourceType.CAMERA);
                        console.log('Take Photo');
                    }
                },
                {
                    text: 'Choose from Documents...',
                    handler: () => {
                        this.pickDocument();
                        console.log('Choose from Documents');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

    getImage(sourceType) {
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType
        };
        this.camera.getPicture(options).then((imageData) => {
            const base64Image = 'data:image/jpeg;base64,' + imageData;
            this.fileContent = imageData;
            const smallImage = document.getElementById('smallImage');
            this.documentURI = this.fileContent;
            smallImage.style.display = 'block';
            smallImage.setAttribute('src', base64Image);
            this.docType = 'jpeg';
        }, (err) => {
            if (err !== 'No Image Selected') {
                alert('Please select an image' + err);
                console.log('Failed because: ' + err);
            }
        });

    }

    pickDocument() {
        if (this.isAndroid) {
            this.fileChooser.open()
                .then(fileUri => {
                    console.log(fileUri);
                    this.filePath.resolveNativePath(fileUri).then((uri) => {
                        const lastIndex = uri.lastIndexOf('/');
                        const filename = uri.substring(uri.lastIndexOf('/') + 1);
                        let fileExtention;
                        let fileWOExtension;
                        if (filename.indexOf('.') > 0) {
                            fileWOExtension = filename.substring(0, filename.lastIndexOf('.'));
                            fileExtention = filename.substring(filename.lastIndexOf('.'));
                        } else {
                            fileWOExtension = filename;
                        }
                        const dirPath = uri.substring(0, lastIndex);
                        console.log(filename);
                        console.log(dirPath);
                        if (fileExtention === '.pdf') {
                            this.file.readAsDataURL(dirPath, filename).then(file64 => {
                                this.fileContent = file64.split(',')[1];
                                const fileLocation = this.webview.convertFileSrc(uri);
                                this.documentURI = this.fileContent;
                                this.docType = 'pdf';
                                const smallImage = document.getElementById('smallImage');
                                smallImage.style.display = 'block';
                                smallImage.setAttribute('src', file64);
                            });
                        } else {
                            throw Error;
                        }
                    });
                })
                .catch(
                    err => {
                        if (err !== 'canceled') {
                            alert('Something went wrong. Please select a pdf document : ' + err);
                            console.log('Error', err);
                        }
                    });
        } else {
            this.filePicker.pickFile()
                .then(uri => {
                    console.log(uri);
                    const lastIndex = uri.lastIndexOf('/');
                    const filename = uri.substring(uri.lastIndexOf('/') + 1);
                    let fileExtention;
                    let fileWOExtension;
                    if (filename.indexOf('.') > 0) {
                        fileWOExtension = filename.substring(0, filename.lastIndexOf('.'));
                        fileExtention = filename.substring(filename.lastIndexOf('.'));
                    } else {
                        fileWOExtension = filename;
                    }
                    const dirPath = uri.substring(0, lastIndex);
                    console.log(filename);
                    console.log(dirPath);
                    if (fileExtention === '.pdf') {
                        this.file.readAsDataURL('file:/' + dirPath, filename).then(file64 => {
                            this.fileContent = file64.split(',')[1];
                            this.documentURI = this.fileContent;
                            this.docType = 'pdf';
                            const smallImage = document.getElementById('smallImage');
                            smallImage.style.display = 'block';
                            smallImage.setAttribute('src', file64);
                        });
                    } else {
                        throw Error;
                    }
                })
                .catch(
                    err => {
                        if (err !== 'canceled') {
                            alert('Something went wrong. Please select a pdf document : ' + err);
                            console.log('Error', err);
                        }
                    });
        }

    }
}
