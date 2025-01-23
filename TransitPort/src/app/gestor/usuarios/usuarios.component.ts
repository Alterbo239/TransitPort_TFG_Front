import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  dtOptions: Config = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }


}
