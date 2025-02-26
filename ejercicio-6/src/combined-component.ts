import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nothing } from "lit";

interface CardData {
  title: string;
  image: string;
  description: string;
}

@customElement('combined-component')
export class CombinedComponent extends LitElement {
  @property({ type: Number }) contador = 0;
  @property({ type: String }) email = '';
  @property({ type: String }) password = '';
  @property({ type: Boolean }) isEmailValid = true;
  @property() cards: CardData[] = [];

  static styles = css`
    :host {
      display: block; /* Important for layout */
    }

    /* Estilos para el contador */
    .contador {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 20px; /* Espacio entre secciones */
    }
    .contador button {
      padding: 5px 10px;
      margin: 0 5px;
    }

    /* Estilos para el login */
    .login {
      margin-bottom: 20px; /* Espacio entre secciones */
    }
    .input {
      margin: 10px 0;
      padding: 8px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    .feedback {
      color: red;
      font-size: 12px;
    }
    .button {
      padding: 10px 20px;
      border: none;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      border-radius: 5px;
    }
    .button:disabled {
      background-color: #d6d6d6;
    }

    /* Estilos para las tarjetas */
    .cards-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .card {
      width: 300px;
      margin: 10px;
      border: 1px solid #ccc;
    }
    .card img {
      width: 100%;
    }
    .card-content {
      padding: 10px;
    }
  `;

  // Contador methods
  private _increment() {
    this.contador++;
    this._saveData(); // Persistencia
  }

  private _decrement() {
    this.contador--;
    this._saveData();// Persistencia
  }

  // Login methods
  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }

  handleEmailChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.email = input.value;
    this.isEmailValid = this.validateEmail(this.email);
  }

  handlePasswordChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password = input.value;
  }

  isFormValid() {
    return this.isEmailValid && this.password.length > 0;
  }

  handleLogin() {
    alert('Login realizado con éxito!');
    this._saveData(); // Persistencia
  }

  // Card methods
  async fetchCards(): Promise<CardData[]> {
    return new Promise<CardData[]>(resolve => {
      setTimeout(() => {
        resolve([
          {
            title: 'Montañas majestuosas',
            image: './mountain.jpg', 
            description: 'Impresionantes picos nevados y paisajes verdes.',
          },
        ]);
      }, 1000);
    });
  }

  async firstUpdated() {
    const data = await this.fetchCards();
    this.cards = data;
    this._loadData(); // Cargar datos al iniciar
  }

  // Persistencia (localStorage)
  private _saveData() {
    localStorage.setItem('combined-data', JSON.stringify({
      contador: this.contador,
      email: this.email,
      password: this.password
    }));
  }

  private _loadData() {
    const savedData = localStorage.getItem('combined-data');
    if (savedData) {
      const data = JSON.parse(savedData);
      this.contador = data.contador || 0;
      this.email = data.email || '';
      this.password = data.password || '';
    }
  }

  render() {
    return html`
      <div class="contador">
        <button @click=${this._decrement}>-</button>
        <span>${this.contador}</span>
        <button @click=${this._increment}>+</button>
      </div>

      <div class="login">
        <label for="email">Correo Electrónico:</label>
        <input
          id="email"
          class="input"
          type="email"
          .value="${this.email}"
          @input="${this.handleEmailChange}"
          placeholder="Ingresa tu correo"
        />
        ${!this.isEmailValid ? html`<div class="feedback">Por favor, ingresa un correo válido.</div>` : nothing}

        <label for="password">Contraseña:</label>
        <input
          id="password"
          class="input"
          type="password"
          .value="${this.password}"
          @input="${this.handlePasswordChange}"
          placeholder="Ingresa tu contraseña"
        />

        <button
          class="button"
          ?disabled="${!this.isFormValid()}"
          @click="${this.handleLogin}"
        >
          Iniciar Sesión
        </button>
      </div>

      <div class="cards-container">
        ${this.cards.map(card => html`
          <div class="card">
            <img src="${card.image}" alt="${card.title}" />
            <div class="card-content">
              <h2>${card.title}</h2>
              <p>${card.description}</p>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}