import { Injectable } from "@angular/core";
import { ProductEntity } from "../../../domain/entities/products/product.entity";
import { ProductDto } from "../../dtos/products/product.dto";

@Injectable({
    providedIn: 'root',
})
export class ProductMapper {
    from(productDto:ProductDto):ProductEntity{
        let productEntity = new ProductEntity();
        productEntity.name = productDto.name;
        productEntity.description = productDto.description;
        productEntity.amount = productDto.amount;
        return productEntity;
    }
    to(productEntity:ProductEntity):ProductDto{
        let productDto = new ProductDto();
        productDto.name = productEntity.name;
        productDto.description = productEntity.description;
        productDto.amount = productEntity.amount;
        return productDto;
    }
}