import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/shared/shared.module';
import { TimerComponent } from './timer/timer.component';


const providers = []

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  entryComponents: [
    TimerComponent
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