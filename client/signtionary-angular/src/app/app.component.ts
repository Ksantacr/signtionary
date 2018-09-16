import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject, Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import {Pipe, PipeTransform, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  
  transform(value: any, url: any): any {
      if (value && !url) {
          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          let match = value.match(regExp);
          if (match && match[2].length == 11) {
              console.log(match[2]);
              let sepratedID = match[2];
              let embedUrl = '//www.youtube.com/embed/' + sepratedID;
              return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
          }
       }
     }
  }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  searchterm: string;

  startAt = new Subject();
  endAt = new Subject();

  clubs;
  allclubs;

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  constructor(private afs: AngularFirestore, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.getallclubs().subscribe((clubs) => {
      this.allclubs = clubs;
      //console.log(this.allclubs)
      this.allclubs.forEach(c => {

        //console.log(c.url)
        c.url_ = this.parseVideo(c.url);
        //c.url_ = "https://www.youtube.com/embed/"+ c.url_.id;
        //c.filUrl = "https://www.youtube.com/embed/"+ c.url_.id;
        //c.url2 =this.sanitizer.bypassSecurityTrustResourceUrl(c.url);
        //console.log(c.url2);

        //this.myUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.topic.video.url);


        //console.log(asd)
      });
      
    })

    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((clubs) => {
        this.clubs = clubs;
        this.allclubs = clubs;
      })
    })
  }

  search($event) {
    let q = $event.target.value;
    //console.log(q)
    //if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    //}
    //else {
    //  this.clubs = this.allclubs;
    //}
  }

  firequery(start, end) {
    return this.afs.collection('palabras', ref => ref.limit(10).orderBy('descripcion').startAt(start).endAt(end)).valueChanges();
  }

  getallclubs() {
    
    return this.afs.collection('palabras', ref => ref.limit(10).orderBy('descripcion')).valueChanges();
  }

  parseVideo (url) {
    // - Supported YouTube URL formats:
    //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
    //   - http://youtu.be/My2FRPA3Gf8
    //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
    // - Supported Vimeo URL formats:
    //   - http://vimeo.com/25451551
    //   - http://player.vimeo.com/video/25451551
    // - Also supports relative URLs:
    //   - //player.vimeo.com/video/25451551

    url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

    if (RegExp.$3.indexOf('youtu') > -1) {
        var type = 'youtube';
    } else if (RegExp.$3.indexOf('vimeo') > -1) {
        var type = 'vimeo';
    }

    return {
        type: type,
        id: RegExp.$6
    };
  }


}