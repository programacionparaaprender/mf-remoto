import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AppState } from '../../store/app.state';
import { selectSomeValue } from '../../store/example/example.selectors';
import { selectCounterValue } from '../../store/counter/counter.selectors';
import { decrement, increment, reset } from '../../store/counter/counter.actions';
import { resetAction, someAction } from '../../store/example/example.actions';


@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [],
  //templateUrl: './my-component.component.html',
  template: `
    <div style="text-align:center">
      <div>
        <h1>{{ someValue }}</h1>
        <button (click)="updateValue()">Update Value</button>
        <button (click)="resetValue()">Reset Value</button>
      </div>
      <h1>
        Contador: {{ counterValue }}
      </h1>
      <button (click)="increment()">Incrementar</button>
      <button (click)="decrement()">Decrementar</button>
      <button (click)="reset()">Resetear</button>
    </div>
  `,
  styleUrl: './my-component.component.scss'
})
export class MyComponentComponent implements OnInit {
  title = 'angular-persistente';

  someValue: string = '';
  counterValue: number = 0;
  constructor(private store: Store<AppState>) {
  }
  async ngOnInit() {
    this.someValue = await firstValueFrom(this.store.select(selectSomeValue));
    this.counterValue = await firstValueFrom(this.store.select(selectCounterValue));
  }

  async updateValue() {
    this.store.dispatch(someAction({ payload: 'New Value' }));
    this.someValue = await firstValueFrom(this.store.select(selectSomeValue));
  }

  async resetValue() {
    this.store.dispatch(resetAction());
    this.someValue = await firstValueFrom(this.store.select(selectSomeValue));
  }

  async increment() {
    this.store.dispatch(increment());
    this.counterValue = await firstValueFrom(this.store.select(selectCounterValue));
  }

  async decrement() {
    this.store.dispatch(decrement());
    this.counterValue = await firstValueFrom(this.store.select(selectCounterValue));
  }

  async reset() {
    this.store.dispatch(reset());
    this.counterValue = await firstValueFrom(this.store.select(selectCounterValue));
  }
}
