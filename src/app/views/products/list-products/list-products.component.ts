import { Component, inject, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductDto } from '../../../infraestructure/dtos/products/product.dto';
import { ProductFacade } from '../../../store/product/product.facade';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { resetAction } from '../../../store/product/product.actions';
import { UppercasePipe } from '../../../shared/uppercase.pipe';


@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, UppercasePipe],

  templateUrl: './list-products.component.html',
  /* template: `
    <div style="text-align:center">
      <div>
        @for(product of productValue; track product){
          {{product.name}}
        }
      </div>
    </div>
    <button (click)="addNewProduct()">Add Product</button>
  `, */
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit {
  title = 'angular-persistente';
  productFacade:ProductFacade = inject(ProductFacade);
  productValue:any[]=[]
  fb: FormBuilder = inject(FormBuilder);
  registerForm: FormGroup;
   store = inject(Store<AppState>)
  constructor(){
    this.registerForm = this.fb.group({ 
      id:0,
      name: ['', Validators.required], 
      description: ['', Validators.required, Validators.maxLength(32)],
      amount: [0, Validators.required]
    }); 
  }
  async ngOnInit() {
    await this.obtener();
  }
  async obtener(){
    this.productFacade.loadProducts();
    this.productValue = await firstValueFrom(this.productFacade.products$);
  
  }
  async resetValue() {
      this.store.dispatch(resetAction());
      this.productValue = []    
  }
  async addNewProduct() {
    if(this.registerForm.invalid){
      return;
    }
    try {
      const name = this.registerForm.getRawValue().name;
      const description = this.registerForm.getRawValue().description;
      const amount = this.registerForm.getRawValue().amount;
      const product: ProductDto = { 
        name: name, 
        description: description, 
        amount: amount 
      }; 
      this.productFacade.addProduct(product);
      this.productValue = await firstValueFrom(this.productFacade.products$);
      this.registerForm.reset();  
    }catch(error){

    }
  }
}