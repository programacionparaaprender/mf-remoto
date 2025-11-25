import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRepository } from '../../../infraestructure/repositories/products/product.repository';
import { ProductDto } from '../../../infraestructure/dtos/products/product.dto';

@Injectable({
  providedIn: 'root',
})
export class AddProductUseCase {
  private productRepository = inject(ProductRepository);
  execute(product:ProductDto): Observable<ProductDto>{
    return this.productRepository.addProducts(product);
  }
}