import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemotoComponent } from './remoto.component';

describe('RemotoComponent', () => {
  let component: RemotoComponent;
  let fixture: ComponentFixture<RemotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
