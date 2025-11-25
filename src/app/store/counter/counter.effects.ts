import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { increment, incrementSuccess, incrementFailure } from './counter.actions';
import { ListProductUseCase } from '../../application/usecase/products/list-product.usecase';
import { of } from 'rxjs';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectCounterValue } from './counter.selectors';

@Injectable()
export class CounterEffects {
    store:Store<AppState> = inject(Store<AppState>)
  ListProductUseCase = inject(ListProductUseCase);
  actions$: Actions = inject(Actions);
  incrementCounter$ = createEffect(() => this.actions$.pipe(
    ofType(increment),
    mergeMap(() =>  this.store.select(selectCounterValue).pipe(
        map(counters => incrementSuccess({ counters })),
        catchError(error => {
          return of(incrementFailure({ error }));
        })
      )
    )
  ));

}
