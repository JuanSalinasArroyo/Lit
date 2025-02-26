import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('contador-component')
export class ContadorComponent extends LitElement {
  @property({ type: Number }) contador = 0;

  static styles = css`
    :host {
      display: inline-block;
      border: 1px solid #ccc;
      padding: 10px;
    }
    button {
      padding: 5px 10px;
      margin: 0 5px;
    }
  `;

  render() {
    return html`
      <button @click=${this._decrement}>-</button>
      <span>${this.contador}</span>
      <button @click=${this._increment}>+</button>
    `;
  }

  private _increment() {
    this.contador++;
  }

  private _decrement() {
    this.contador--;
  }
}