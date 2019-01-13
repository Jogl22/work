import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory, ComponentRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tea-timer';
  @ViewChild("myTemplate", { read: ViewContainerRef }) container;

  componentIndex: number = 0;
  componentsReferences: ComponentRef<any>[] = [];

  constructor(private resolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    console.log('tea-timer activ');
  }

  addComponent() {
    const factory = this.resolver.resolveComponentFactory(MeineNeueKomponente);
    let componentRef = this.container.createComponent(factory);
    let currentComponent = componentRef.instance;

    currentComponent.selfRef = currentComponent;
    currentComponent.index = ++this.componentIndex;
    currentComponent.compInteraction = this;
    this.componentsReferences.push(componentRef);
  }

  removeComponent(index) {
    if (this.container.length < 1)
      return;

    let componentRef = this.componentsReferences.filter(x => x.instance.index == index)[0];
    let component: MeineNeueKomponente = <MeineNeueKomponente>componentRef.instance;

    let vcrIndex: number = this.container.indexOf(componentRef)

    this.container.remove(vcrIndex);

    this.componentsReferences = this.componentsReferences.filter(x => x.instance.index !== index);
  }
}

@Component({
  selector: 'meine',
  template: `
  <span>Hallo</span>
  <button mat-icon-button (click)="removeComponent(index)">
    <mat-icon>remove</mat-icon>
  </button>
  `
})
export class MeineNeueKomponente {
  public index: number;
  public selfRef: MeineNeueKomponente;

  //interface for Parent-Child interaction
  public compInteraction: myinterface;

  removeComponent(index) {
    this.compInteraction.removeComponent(index)
  }
}

export interface myinterface {
  removeComponent(index: number);
}

