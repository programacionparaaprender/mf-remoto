import { Component } from '@angular/core';

@Component({
  selector: 'app-vieja',
  standalone: true,
  templateUrl: './vieja.component.html',
  styleUrls: ['./vieja.component.css']
})
export class ViejaComponent {

  quiengano = 'Next player: X';

  // Ahora acepta string | null
  squares: (string | null)[] = Array(9).fill(null);

  history: { squares: (string | null)[] }[] = [
    { squares: Array(9).fill(null) }
  ];

  stepNumber = 0;
  xIsNext = true;
  hayganador = false;

  constructor() {}

  get status(): string {
    if (this.hayganador) {
      return 'Winner: ' + (this.xIsNext ? 'O' : 'X');
    }
    return 'Next player: ' + (this.xIsNext ? 'X' : 'O');
  }

  mostrarSquares(i: number): string | null {
    return this.squares[i];
  }

  handleClick(i: number): void {
    if (this.hayganador || this.squares[i]) {
      return;
    }

    const history = this.history.slice(0, this.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    squares[i] = this.xIsNext ? 'X' : 'O';

    this.history = history.concat([{ squares }]);
    this.stepNumber = history.length;
    this.squares = squares;
    this.xIsNext = !this.xIsNext;

    const winner = this.calculateWinner(squares);
    this.hayganador = !!winner;
  }

  jumpTo(step: number): void {
    this.stepNumber = step;
    this.squares = [...this.history[step].squares];
    this.xIsNext = step % 2 === 0;
    this.hayganador = !!this.calculateWinner(this.squares);
  }

  calculateWinner(squares: (string | null)[]): string | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }
}
