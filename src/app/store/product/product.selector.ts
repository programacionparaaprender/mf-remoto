import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProductState } from './product.reducer';

//export const selectProductsState = (state: AppState) => state.productState;
export const selectProductsState = createFeatureSelector<ProductState>('productState');


export const selectAllProducts = createSelector(
  selectProductsState,
  (state) => state.productsList
);

export const selectLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);



