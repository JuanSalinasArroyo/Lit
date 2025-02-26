import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { localDateFromUTC } from "./date-utils";
import "./date-display.ts";

@customElement("my-element")
class MyElement extends LitElement {
  @property()
  date?: Date;

  _detecChanged(e: Event) {
    const utcDate = (e.target as HTMLInputElement).valueAsDate;
    if (utcDate) {
      this.date = localDateFromUTC(utcDate);
    }
  }

  render() {
    return html`
      <p>Elige una fecha:</p>
      <input type="date" @change=${this._detecChanged} />
      <p><button @click=${this._chooseToday}>Selecciona hoy</button></p>
      <p>Fecha elegida: <date-display .date=${this.date}></date-display></p>
    `;
  }

  _chooseToday() {
    this.date = new Date();
  }
}