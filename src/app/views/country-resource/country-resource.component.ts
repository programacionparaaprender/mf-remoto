import { Component, signal, resource } from '@angular/core';

export interface Country {
  cca3: string;
  name: { common: string };
  capital?: string[];
  region: string;
}

@Component({
  selector: 'app-country-resource',
  standalone: true,
  template: `
    <h2>Buscar país</h2>

    <input
      type="text"
      [value]="countryName()"
      (input)="countryName.set($any($event.target).value)"
      placeholder="Escribe un país..."
    />

    <button (click)="reload()">Recargar</button>

    <hr>

    @if (countryResource.isLoading()) {
      <p>Cargando...</p>
    }
    @else if (countryResource.error(); as err) {
      <p style="color:red">Error: {{ err.message }}</p>
    }
    @else if (countryResource.value(); as countries) {

      <ul>
        @for (country of countries; track country.cca3) {
          <li>
            <strong>{{ country.name.common }}</strong><br>
            Capital: {{ country.capital?.[0] }}<br>
            Región: {{ country.region }}
          </li>
        }
      </ul>

    }
    @else {
      <p>No hay datos disponibles.</p>
    }
  `,
})
export class CountryResourceComponent {

  countryName = signal('peru');
  url = 'https://restcountries.com/v3.1/name';

  // ← TIPADO: devuelve Country[] y params es string
  countryResource = resource<Country[], string>({
    // <-- use "params" (computación reactiva) en vez de "request"
    params: () => this.countryName(),

    // <-- loader recibe { params, abortSignal, previous }
    loader: async ({ params: country, abortSignal }) => {
      // usar abortSignal para fetch cancellable
      const resp = await fetch(`${this.url}/${country}`, { signal: abortSignal });
      if (!resp.ok) throw new Error('País no encontrado');
      // devolver Country[]
      return await resp.json() as Country[];
    }
  });

  reload() {
    this.countryResource.reload();
  }
}
