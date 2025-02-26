import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

// NOTA
// El nombre de mi componente de constar de dos o mas elementos <ELEMENTO_1>-<ELEMENTO_2>
@customElement("app-extenssions")
export class Extenssions extends LitElement {
  @property()
  bodyText: string = "Text in child expression.";

  @property()
  label: string = "Cerrar";

  @property({
    type: Boolean,
  })
  editing: boolean = true;

  value: number = 7;

  condition = false;

  @property()
  animals = ["dog", "cat", "lion"];

  eventClick() {
    this.value = this.value + 1;
  }

  render() {
    return html`
      <div>Child expression: ${this.bodyText}</div>

      <button aria-label=${this.label}>X</button>

      <div>
        Boolean expresion.
        <input type="text" ?disabled=${this.editing} />
      </div>

      <div>
        Property
        <input id="example-number" type="number" .valueAsNumber=${this.value} />
      </div>

      <div>
        Event
        <button @click="${this.eventClick}">Click me!</button>
      </div>

      <div>
        Render
        ${this.condition
          ? html`<p>Condition is true</p>`
          : html`<p>Condition is false</p>`}
      </div>

      <p>Render list</p>

      <ul>
        ${this.animals.map((animal) => {
          return html`<li>${animal}</li>`;
        })}
      </ul>
    `;
  }
}