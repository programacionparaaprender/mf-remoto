import { Component } from '@angular/core';
import { ServicioPrueba } from '../../shared/services/servicio-prueba';

@Component({
  selector: 'app-remoto',
  standalone: true,
  imports: [],
  providers:[ServicioPrueba],
  templateUrl: './remoto.component.html',
  styleUrl: './remoto.component.css'
})
export class RemotoComponent {
  datos:string;
  constructor(private servicio: ServicioPrueba){
    this.datos = servicio.modificado;
  }
}
