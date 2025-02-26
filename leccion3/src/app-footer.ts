import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-footer")
class AppFooter extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
    footer {
      display: flex;
      justify-content: center;
      font-family: sans-serif, "Times New Roman";
    }
  `;

  render() {
    return html`
      <footer>
        <p>Pie de pagina</p>
      </footer>
    `;
  }
}