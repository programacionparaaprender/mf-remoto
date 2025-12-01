import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div class="card">
      <h4>Componente Hijo</h4>
      <p>Mensaje recibido: {{ message() }}</p>

      <button (click)="notifyParent()">Notificar al padre</button>
    </div>
  `,
})
export class ChildComponent {

  // 👉 Input usando señales
  message = input<string>();

  // 👉 Output usando señales
  onNotify = output<string>();

  notifyParent() {
    this.onNotify.emit('Mensaje desde el hijo!');
  }
}
