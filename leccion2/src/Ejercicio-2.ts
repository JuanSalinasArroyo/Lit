import { LitElement, html, css} from "lit";
import { customElement, property } from "lit/decorators.js";
import { nothing } from "lit";

@customElement('ejercicio-2') 
export class Ejercicio2 extends LitElement {
  @property({ type: String }) email = '';
  @property({ type: String }) password = '';
  @property({ type: Boolean }) isEmailValid = true;

  static styles = css`
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
  `;

  // Método para validar el correo
  validateEmail(email: string): boolean {
   
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }

  // Manejar el cambio en el campo de email
  handleEmailChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.email = input.value;
    this.isEmailValid = this.validateEmail(this.email);
  }

  // Manejar el cambio en el campo de contraseña
  handlePasswordChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password = input.value;
  }

  // Verificar si el formulario es válido
  isFormValid() {
    return this.isEmailValid && this.password.length > 0;
  }

  
  render() {
    return html`
      <div>
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
          @click="${() => alert('Login realizado con éxito!')}"
        >
          Iniciar Sesión
        </button>
      </div>
    `;
  }
}