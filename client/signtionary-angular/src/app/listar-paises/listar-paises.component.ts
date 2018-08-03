import { Component, OnInit } from '@angular/core';
import { PaisesService } from "../services/paises.service";



@Component({
  selector: 'app-listar-paises',
  templateUrl: './listar-paises.component.html',
  styleUrls: ['./listar-paises.component.css'],
})
export class ListarPaisesComponent implements OnInit {

  paises:Array<any>

  constructor(private paisesService:PaisesService) { }

  ngOnInit() {

    console.log("listar")

    this.paisesService.getPaises().subscribe( (data)=> {

      this.paises = data;

    });
  }

  agregarPais($event) {

    var input = (<HTMLInputElement>document.getElementById("pais"));
    
    let pais = {name: input.value };
    this.paisesService.postPais(pais).subscribe( (data)=> {

      //console.log(data)
      this.paisesService.getPaises().subscribe( (data)=> {

        this.paises = data;
        input.value = "";
  
      });
    })
  }

}
