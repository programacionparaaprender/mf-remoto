import { createReducer, on } from '@ngrx/store';
import { 
  loadProductsSuccess, 
  loadProductsFailure, 
  addProductsSuccess, 
  resetAction,
  addProducts } from './product.actions';

export interface ProductState {
    productsList: any[];
    loading: boolean;
}


export const initialStateProducts: ProductState = {
  productsList: [],
  loading: false,
};




export const productReducer = createReducer(
  initialStateProducts,
  on(resetAction, (state) => ({
    ...state,
    loading: false,
    productsList: [],
  })),
  on(addProducts, (state:any) => ({
    ...state,
    loading: true,
  })),
  on(addProductsSuccess, (state:any, { product }) => ({
    ...state,
    loading: false,
    productsList: [...state.productsList, product],
  })),
  on(loadProductsSuccess, (state:any, { products }) => ({
    ...state,
    productsList: products,
    loading: false,
  })),
  on(loadProductsFailure, (state:any, { error }) => ({
    ...state,
    loading: false,
  }))
);
