import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViejaComponent } from './vieja.component';

describe('ViejaComponent', () => {
  let component: ViejaComponent;
  let fixture: ComponentFixture<ViejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViejaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ViejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('status debería mostrar siguiente jugador al inicio', () => {
    expect(component.status).toBe('Next player: X');
  });

  it('debería marcar X en la primera jugada', () => {
    component.handleClick(0);
    expect(component.squares[0]).toBe('X');
  });

  it('debería alternar entre X y O', () => {
    component.handleClick(0); // X
    component.handleClick(1); // O
    expect(component.squares[1]).toBe('O');
  });

  it('no debería marcar de nuevo una celda ocupada', () => {
    component.handleClick(0);
    component.handleClick(0);
    expect(component.squares[0]).toBe('X');
  });

  it('debería detectar ganador en una línea', () => {
    component.squares = ['X', 'X', 'X', null, null, null, null, null, null];
    const winner = component.calculateWinner(component.squares);
    expect(winner).toBe('X');
  });

  it('debería detectar empate (sin nulos y sin ganador)', () => {
    component.squares = [
      'X','O','X',
      'X','O','O',
      'O','X','X'
    ];
    const winner = component.calculateWinner(component.squares);
    expect(winner).toBeNull();
  });

  it('jumpTo debería restaurar el estado anterior', () => {
    component.handleClick(0); // X
    component.handleClick(1); // O
    component.jumpTo(0);

    expect(component.squares[0]).toBeNull();
    expect(component.squares[1]).toBeNull();
    expect(component.xIsNext).toBeTrue();
  });
});
