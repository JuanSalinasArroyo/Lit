import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-header")
class AppHeader extends LitElement {
  static styles = css`
    h1 {
      font-family: sans-serif, "Times New Roman";
      font-weight: bold;
      text-align: center;
    }
  `;

  render() {
    return html`
      <header>
        <h1>Cabecera</h1>
      </header>
    `;
  }
}