import { Component, inject, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductDto } from '../../../infraestructure/dtos/products/product.dto';
import { ProductFacade } from '../../../store/product/product.facade';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { resetAction } from '../../../store/product/product.actions';
import { UserStore } from '../../../store/users/user-store';
import { selectAllUsers } from '../../../store/users/users.selectors';
import { someAction } from '../../../store/users/users.actions';
import { UppercasePipe } from '../../../shared/uppercase.pipe';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, UppercasePipe],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUserComponent implements OnInit {
  title = 'angular-persistente';
  fb: FormBuilder = inject(FormBuilder);
  registerForm: FormGroup;
   store = inject(Store<AppState>)
  userList:UserStore[] = []
  constructor(){
    this.registerForm = this.fb.group({ 
      name: ['', Validators.required], 
      password: ['', [Validators.required, Validators.maxLength(32)]]
    }); 
  }
  async ngOnInit() {
    await this.obtener();
  }
  async obtener(){
    this.userList = await firstValueFrom(this.store.select(selectAllUsers));
    console.log('userList')
    console.log(this.userList)
  }
  async resetValue() {
      this.store.dispatch(resetAction());
      this.userList = []    
  }
  async addNewUser() {
    if(this.registerForm.invalid){
      return;
    }
    try {
      const name = this.registerForm.getRawValue().name;
      const password = this.registerForm.getRawValue().password;

      const user: UserStore = { 
        name: name, 
        password: password 
      }; 
      this.store.dispatch(someAction({ payload: user }));
      await this.obtener();
      this.registerForm.reset();  
    }catch(error){

    }
  }
}