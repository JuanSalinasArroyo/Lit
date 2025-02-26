import { initialState, Task } from "@lit/task";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { fetchPackageInfo } from "./npm";
import { map } from "lit/directives/map.js";

@customElement("npm-info")
class Npminfo extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-width: 300px;
      border-radius: 5px;
      border: solid 1px #aaa;
      padding: 20px;
    }
    header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    #logo {
      height: 38px;
      width: auto;
    }
    .initial {
      font-style: italic;
    }
    .error {
      color: red;
    }
  `;

  @state()
  private _packageName = "lit";

  private _npmInfoTask = new Task(this, {
    task: async ([pkgName], { signal }) => {
      if (pkgName === undefined || pkgName === "") {
        return initialState;
      }
      return await fetchPackageInfo(pkgName, signal);
    },
    args: () => [this._packageName],
  });

  render() {
    return html`
      <label>
        Coloca un nombre de depencia:
        <input .value=${this._packageName} @change=${this._onChange} />
      </label>
      <div>
        <h1>${this._packageName}</h1>
        <img
          id="logo"
          src="https://raw.githubusercontent.com/npm/logos/master/npm%20logo/npm-logo-red.svg"
          alt="npm logo"
        />
      </div>
      ${this._npmInfoTask.render({
        initial: () => html`<span> Ingresa un nombre de paquete </span>`,
        pending: () => html`<span>Cargando informacion</span>`,
        complete: (pkg) => html`
          <h3>${pkg.description}</h3>
          <h4>dist-tags:</h4>
          <ul>
            ${map(
              Object.entries(pkg["dist-tags"]),
              ([tag, version]) => html`<li><pre>${tag}: ${version}</pre></li>`
            )}
          </ul>
        `,
        error: (e) => html`<span class="error">
          Error: ${(e as Error).message}
        </span>`,
      })}
    `;
  }

  _onChange(e: Event) {
    this._packageName = (e.target as HTMLInputElement).value;
  }
}
