import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject, Observable } from 'rxjs';
import { combineLatest } from 'rxjs';

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

  constructor(private afs: AngularFirestore) {

    /*this.afs.collection('palabras').add({
      "descripcion": "Feelings",
      "url": "https://www.youtube.com/watch?v=suz7pWi1mOs"
    })*/

  }

  ngOnInit() {
    this.getallclubs().subscribe((clubs) => {
      this.allclubs = clubs;
    })

    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((clubs) => {
        this.clubs = clubs;
      })
    })
  }

  search($event) {
    let q = $event.target.value;
    if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
      this.clubs = this.allclubs;
    }
  }

  firequery(start, end) {
    return this.afs.collection('palabras', ref => ref.limit(10).orderBy('descripcion').startAt(start).endAt(end)).valueChanges();
  }

  getallclubs() {

    
    return this.afs.collection('palabras', ref => ref.orderBy('descripcion')).valueChanges();
  }


}