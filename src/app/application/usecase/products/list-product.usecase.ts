import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRepository } from '../../../infraestructure/repositories/products/product.repository';
import { ProductDto } from '../../../infraestructure/dtos/products/product.dto';

@Injectable({
  providedIn: 'root',
})
export class ListProductUseCase {
  private productRepository = inject(ProductRepository);
  execute(): Observable<ProductDto[]>{
    return this.productRepository.getProducts();
  }
}