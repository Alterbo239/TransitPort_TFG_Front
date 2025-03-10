import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';
import { DataTablesModule  } from 'angular-datatables';
import { OrdenService } from '../../../services/orden.service';

@Component({
  selector: 'app-realizar-auditoria',
  imports: [CommonModule, DataTablesModule],
  templateUrl: './realizar-auditoria.component.html',
  styleUrl: './realizar-auditoria.component.css'
})

export class RealizarAuditoriaComponent {

}