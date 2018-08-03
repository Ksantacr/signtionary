import { Injectable } from '@angular/core';
import { AngularFireDatabase,
  AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class BuscadorFirebaseService {

  constructor(private db: AngularFireDatabase) {
  }

  getItems(start): AngularFireList<Array<any>> {


    console.log("asd")
    //console.log(this.db.list('/items', ref=> ref.orderByChild('name')).valueChanges())
    return this.db.list('/items', ref => ref.orderByChild('size').startAt(start));

    /**
    
    afs.collection('items', ref => {
      let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      if (size) { query = query.where('size', '==', size) };
      if (color) { query = query.where('color', '==', color) };
      return query;

      */

    //return this.db.list('/items', ref=> ref.orderByChild('name').startAt(start).endAt(end));

    /*return this.db.list('/movies', {
      query: {
        orderByChild: 'Title',
        limitToFirst: 10,
        startAt: start,
        endAt: end
      }
    });*/
  }
}
