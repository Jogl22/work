import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, MeineNeueKomponente } from './app.component';
import { SharedModule } from 'src/shared/shared.module';


const providers = []

@NgModule({
  declarations: [
    AppComponent,
    MeineNeueKomponente
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  entryComponents: [
    MeineNeueKomponente
  ],
  providers: [providers],
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class TeaTimerSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: []
    }
  }
}