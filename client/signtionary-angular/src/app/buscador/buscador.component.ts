import { Component, OnInit } from '@angular/core';
import { BuscadorFirebaseService } from '../services/buscador-firebase.service';

import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  items$:Observable<Array<any[]>>;
  //endAt= new BehaviorSubject<string>(null);
  //startAt = new BehaviorSubject<string>(null);

  endAt:string = "";
  startAt:string = "";


  constructor(private buscadorService:BuscadorFirebaseService) {

  }

  ngOnInit() {
    this.items$  = this.buscadorService.getItems(this.startAt).valueChanges();
    /*.subscribe(  (data)=> {

      console.log(data)
      = data;
      
    });*/
    //this.items = this.buscadorService.getItems("", "").valueChanges();
    //getMovies(this.startAt, this.endAt)
                 // .subscribe(movies => this.movies = movies)
  }

  search($event) {
    let q = $event.target.value;

    this.startAt = q;
    this.endAt = q;

    this.items$  = this.buscadorService.getItems(this.startAt).valueChanges();
   /* console.dir(this.startAt.next(`${q}`))
    console.dir(this.endAt.next(q+"\uf8ff"))

    console.log($event)
    this.startAt.next(q)
    this.endAt.next(q+"\uf8ff")*/

    
    //console.dir("end:"+ this.endAt)

}

}
