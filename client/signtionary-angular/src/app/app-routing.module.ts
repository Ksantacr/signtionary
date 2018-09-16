import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ListarPaisesComponent } from './listar-paises/listar-paises.component';
import { BuscadorComponent } from './buscador/buscador.component';

const routes: Routes = [
  { path: '', component:  BuscadorComponent},
  { path: 'listar-paises', component: ListarPaisesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
