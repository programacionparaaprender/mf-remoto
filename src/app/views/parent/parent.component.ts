import { Component, signal } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone:true,
  imports: [ChildComponent],
  template: `
    <div class="card">
      <h3>Componente Padre</h3>
      <p><strong>Mensaje recibido:</strong> {{ receivedMessage() }}</p>
      <!-- 👉 Mandamos mensaje al hijo -->
      <app-child
        [message]="parentMessage()"
        (onNotify)="handleNotify($event)"
      ></app-child>
      <button (click)="changeMessage()">Cambiar mensaje al hijo</button>
    </div>
  `,
})
export class ParentComponent {

  parentMessage = signal('Hola hijo 👋');
  receivedMessage = signal('');

  changeMessage() {
    this.parentMessage.set('Nuevo mensaje desde el padre');
  }

  handleNotify(event: string) {
    this.receivedMessage.set(event);
  }
}
