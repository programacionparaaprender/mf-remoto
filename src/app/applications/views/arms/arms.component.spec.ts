import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArmsComponent } from './arms.component';

describe('ArmsComponent', () => {
  let component: ArmsComponent;
  let fixture: ComponentFixture<ArmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ArmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial title', () => {
    expect(component.title).toBe('Brazos perfectos');
  });

  it('should have correct description', () => {
    expect(component.descripcion).toBe('Los ejercicios para los brazos son muy importantes.');
  });

  it('should initialize properties in constructor', () => {
    // Verificar que las propiedades se inicializan correctamente en el constructor
    expect(component.title).toBeDefined();
    expect(component.descripcion).toBeDefined();
    expect(component.title).not.toBe('');
    expect(component.descripcion).not.toBe('');
  });

  it('should have string type for title and descripcion', () => {
    expect(typeof component.title).toBe('string');
    expect(typeof component.descripcion).toBe('string');
  });

  it('should maintain data consistency after multiple change detection cycles', () => {
    const initialTitle = component.title;
    const initialDescripcion = component.descripcion;

    // Ejecutar múltiples ciclos de detección de cambios
    fixture.detectChanges();
    fixture.detectChanges();
    fixture.detectChanges();

    expect(component.title).toBe(initialTitle);
    expect(component.descripcion).toBe(initialDescripcion);
  });

  it('should not have any methods that modify the properties', () => {
    // Este componente no tiene métodos públicos que modifiquen las propiedades
    const methods = Object.getOwnPropertyNames(ArmsComponent.prototype)
      .filter(prop => typeof component[prop as keyof ArmsComponent] === 'function')
      .filter(prop => prop !== 'constructor');

    expect(methods.length).toBe(0);
  });
});