import { Component} from '@angular/core';


@Component({
  selector: 'app-arms',
  standalone:true,
  templateUrl: './arms.component.html',
  styleUrls: ['./arms.component.css']
})
export class ArmsComponent {
  title = '';
  descripcion = '';
  constructor(){
    this.title = 'Brazos perfectos';
    this.descripcion = 'Los ejercicios para los brazos son muy importantes.';
  }
}
