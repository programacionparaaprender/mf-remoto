import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectCounterValue } from "./counter.selectors";
import { firstValueFrom } from "rxjs";
import { decrement, increment, reset } from "./counter.actions";

@Injectable({
  providedIn: 'root',
})
export class CounterFacade {
  private store = inject(Store);

  counter$ = this.store.select(selectCounterValue);

  async increment() {
    this.store.dispatch(increment());
    return await firstValueFrom(this.store.select(selectCounterValue));
  }

  async decrement() {
    this.store.dispatch(decrement());
    return await firstValueFrom(this.store.select(selectCounterValue));
  }

  async reset() {
    this.store.dispatch(reset());
    return await firstValueFrom(this.store.select(selectCounterValue));
  }
}

  