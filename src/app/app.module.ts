import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RemotoComponent } from './views/remoto/remoto.component';
@NgModule({
  declarations: [AppComponent],
  imports: [RemotoComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
