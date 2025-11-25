import { Component} from '@angular/core';
import { Link } from '../../../commons/models/link';


@Component({
  selector: 'app-legs',
  standalone:true,
  imports:[],
  templateUrl: './legs.component.html',
  styleUrls: ['./legs.component.css']
})
export class LegsComponent {
  title = '';
  descripcion = '';
  partesentrenar = '';
  links:Link[] = [];
  constructor(){
    this.title = 'Piernas perfectas';
    this.descripcion = 'Los ejercicios de pierna y cardio son muy importantes, nos permiten mejorar en los demás ejercicios, ya que nos permiten mantener esa agilidad y velocidad al realizar los movimientos, nos permiten estar más atentos.';
    this.partesentrenar = 'Tenemos para entrenar las piernas los ejercicios de tobillo, cuadriceps, bicep posterior y gluteos.';
    this.links = [{
      id: 1,
      url: "https://www.tiktok.com/@programacionparaaprender/video/7242141230161841413",
      name:"ejercicio de tobillos"
    },{
      id: 2,
      url: "https://www.tiktok.com/@programacionparaaprender/video/7244740077459459334",
      name:"ejercicio de piernas"
    }];
  }
}
