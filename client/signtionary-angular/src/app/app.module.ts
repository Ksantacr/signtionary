import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { ListarPaisesComponent } from './listar-paises/listar-paises.component';
import { HttpClientModule } from '@angular/common/http';

import { PaisesService } from "./services/paises.service";
import { BuscadorComponent } from './buscador/buscador.component';
import { BuscadorFirebaseService } from './services/buscador-firebase.service';
import { AngularFireDatabase,
  AngularFireList } from 'angularfire2/database';
@NgModule({
  declarations: [
    AppComponent,
    ListarPaisesComponent,
    BuscadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [PaisesService, BuscadorFirebaseService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
