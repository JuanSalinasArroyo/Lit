import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-extenssions")
export class Extenssions extends LitElement {
render() {
    return html`
<script>
  const contenedor = document.getElementById("contenedor");
  let numero = 0;

  function aumentar() {
    numero++;
    contenedor.textContent = numero;
  }

  function disminuir() {
    numero--;
    contenedor.textContent = numero;
  }
</script>
`;
}
}