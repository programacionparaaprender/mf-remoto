import { ProductState, initialStateProducts } from "./product/product.reducer";
import { CounterState, initialCounterState } from "./counter/counter.reducer";
import { ExampleState, initialExampleState } from "./example/example.reducer";
import { UserState, initialUserState } from "./users/users.reducer";

// src/app/state/app.state.ts
export interface AppState {
    // Define los estados aquí
    exampleState: ExampleState;
    counterState: CounterState;
    productState: ProductState;
    userState:UserState;
}

export const initialState: AppState = {
  exampleState: initialExampleState,
  counterState: initialCounterState,
  productState: initialStateProducts,
  userState: initialUserState
};