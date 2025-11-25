import { createAction, props } from '@ngrx/store';
import { ProductDto } from '../../infraestructure/dtos/products/product.dto';


export const addProducts = createAction('[Products] add Products',
  props<{ product: ProductDto }>()
);
export const addProductsSuccess = createAction(
  '[Products] add Products Success',
  props<{ product: ProductDto }>()
);
export const addProductsFailure = createAction(
  '[Products] add Products Failure',
  props<{ error: any }>()
);

export const resetAction = createAction('[Products] Some Action Reset');
export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: any[] }>()
);
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>()
);
