import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, delay } from 'rxjs/operators';
import { 
  loadProducts, 
  loadProductsSuccess, 
  loadProductsFailure, 
  addProducts, 
  addProductsSuccess,
  addProductsFailure
} from './product.actions';
import { ListProductUseCase } from '../../application/usecase/products/list-product.usecase';
import { of } from 'rxjs';
import { AddProductUseCase } from '../../application/usecase/products/add-product.usecase';

@Injectable()
export class ProductEffects {
  ListProductUseCase = inject(ListProductUseCase);
  addProductUseCase = inject(AddProductUseCase);
  actions$: Actions = inject(Actions);
  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProducts),
      mergeMap((action) => this.addProductUseCase.execute(action.product).pipe(
          map(product => addProductsSuccess({ product })),
          catchError(error => {
            console.log('error');
            console.log(error);
            return of(addProductsFailure({ error}));
          })
        
        )),
    )
  );
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    mergeMap(() => this.ListProductUseCase.execute()
    .pipe(
        map(products => loadProductsSuccess({ products })),
        catchError(error => {
          return of(loadProductsFailure({ error }));
        })
      ))
  ));

}
