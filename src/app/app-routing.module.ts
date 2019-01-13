import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeaTimerSharedModule } from 'projects/tea-timer/src/app/app.module';

const routes: Routes = [
  {
    path: 'tea-timer', 
    loadChildren: '../../projects/tea-timer/src/app/app.module#TeaTimerSharedModule'
  }
 ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    TeaTimerSharedModule.forRoot(),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }