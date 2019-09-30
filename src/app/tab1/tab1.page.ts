import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page {

  constructor(
    public media: Media,
    public file: File
  ) { }

  record() {

    this.file.createFile(this.file.tempDirectory, 'record.m4a', true).then(() => {
      const mediaObject = this.media.create(this.file.tempDirectory.replace(/^file:\/\//, '') + 'record.m4a');
      mediaObject.startRecord();
      mediaObject.onStatusUpdate.subscribe(status => console.log(status));
      window.setTimeout(() => {
        mediaObject.stopRecord();
        mediaObject.release();
        /** Do something with the record file and then delete */
        this.file.removeFile(this.file.tempDirectory, 'record.m4a');
      }, 10000);
    });
  }
}
