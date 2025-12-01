import { Component, computed, effect, EffectRef, inject, Injector, input, OnInit, output, resource, signal, untracked } from '@angular/core';


@Component({
  selector: 'app-signals',
  imports: [],
  standalone:true,
  templateUrl: './signals.html',
  styleUrl: './signals.css',
})
export class Signals implements OnInit {
  selectedIndex = signal<number>(3);
  count = signal(0);
  tabs = signal<{label:string, content:string}[]>([
    {label: 'Tab 1', content: 'Content'}
  ]);
  computedTest = computed(()=> `selected: ${this.selectedIndex()}, count: ${this.count()}`);
  tabsLength = computed(()=>this.tabs().length);
  injector = inject(Injector);
  tabValue = input<string>('');
  tabValueChange = output<string>();

  constructor(){
    /* effect(()=>{
      console.log(`selectd: ${this.selectedIndex()}, count: ${this.count()}`);
    });
 */
    effect((onCleanup) => {
      const count = this.count();
      const timer = setTimeout(()=> {
        console.log(`this value count ${count}`);
      }, 2000);
      onCleanup(()=>{
        clearTimeout(timer);
      })
    });
  }
  ngOnInit(): void {
    this.effectRef = effect(() => {
      console.log(`this value count ngInit ${untracked(()=>this.count())}`);
  },{injector: this.injector});
  }

  effectRef: EffectRef = effect(() => {
      console.log(`this value count ${untracked(()=>this.count())}`);
  });

  metodoSet(){
    this.selectedIndex.set(5);
    this.effectRef.destroy();
  }
  metodoUpdate(){
    this.selectedIndex.update((value) => value + 1);
  }
  metodoSetCounter(){
    this.count.set(5);
  }
  metodoUpdateCounter(){
    this.count.update((value) => value + 1);
  }
  addTab(){
    const tabsLength = this.tabs().length;
    const newTab = {label: `Tab ${tabsLength + 1}`, content: `Content ${tabsLength + 1}`}
    this.tabs().push(newTab);
  }
  removeTab(){
    //this.tabs().pop();
    this.tabs.update((tabs)=>{
      return tabs.filter((tab, i)=> i !== tabs.length - 1);
    });
  }
}
