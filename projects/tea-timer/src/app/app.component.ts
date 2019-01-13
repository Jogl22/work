import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tea-timer';
  @ViewChild("timerComponentTemplate", { read: ViewContainerRef }) container;

  componentIndex: number = 0;
  componentsReferences: ComponentRef<any>[] = [];

  constructor(private resolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    console.log('tea-timer activ');
  }

  addTimer() {
    const factory = this.resolver.resolveComponentFactory(TimerComponent);
    let componentRef = this.container.createComponent(factory);
    let currentComponent = componentRef.instance;

    currentComponent.selfRef = currentComponent;
    currentComponent.index = ++this.componentIndex;
    currentComponent.compInteraction = this;
    this.componentsReferences.push(componentRef);
  }

  removeTimer(index) {
    if (this.container.length < 1)
      return;

    let componentRef = this.componentsReferences.filter(x => x.instance.index == index)[0];
    let component: TimerComponent = <TimerComponent>componentRef.instance;

    let vcrIndex: number = this.container.indexOf(componentRef)

    this.container.remove(vcrIndex);

    this.componentsReferences = this.componentsReferences.filter(x => x.instance.index !== index);
  }
}
