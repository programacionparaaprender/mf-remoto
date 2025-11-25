import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { addProducts, loadProducts } from "./product.actions";
import { selectAllProducts, selectLoading } from "./product.selector";
import { ProductDto } from "../../infraestructure/dtos/products/product.dto";

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  private store = inject(Store);

  products$ = this.store.select(selectAllProducts);
  loading$ = this.store.select(selectLoading);

  loadProducts() {
    this.store.dispatch(loadProducts());
  }

  addProduct(product: ProductDto) {
    this.store.dispatch(addProducts({ product }));
  }
}
