import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent, SafePipe } from './app.component';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';

//AngularFireStuff
import { AngularFireModule} from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore';

import { PaisesService } from "./services/paises.service";
import { BuscadorComponent } from './buscador/buscador.component';
import { BuscadorFirebaseService } from './services/buscador-firebase.service';
import { AngularFireDatabase,
  AngularFireList } from 'angularfire2/database';
@NgModule({
  declarations: [
    AppComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [PaisesService, BuscadorFirebaseService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }