import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LegsComponent } from './legs.component';
import { Link } from '../../../commons/models/link';

describe('LegsComponent Template', () => {
  let component: LegsComponent;
  let fixture: ComponentFixture<LegsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LegsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display title in template', () => {
    const titleElement = fixture.debugElement.query(By.css('h1')); // Ajusta el selector según tu template
    if (titleElement) {
      expect(titleElement.nativeElement.textContent).toContain('Piernas perfectas');
    }
  });

  it('should display description in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(component.descripcion);
  });


});