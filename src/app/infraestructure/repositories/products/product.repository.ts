import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ProductDto } from '../../dtos/products/product.dto';
import { ProductMapper } from '../../mappers/products/product.mapper';

let products = [
    {
        name:'Product 1',
        description: 'Description 1',
        amount: 100
    },
    {
        name:'Product 2',
        description: 'Description 2',
        amount: 100
    }
];

@Injectable({
    providedIn: 'root',
})
export class ProductRepository {
    productMapper:ProductMapper = inject(ProductMapper);
    addProducts(product:ProductDto){
        try{
            const productEntity = this.productMapper.from(product);
            products = [...products, productEntity];
        }catch(error){
            console.log('error');
            console.log(error);
        }
        return of(product);
    }
    getProducts(){
        const observableProducts = of(products);
        return observableProducts;
    }
}