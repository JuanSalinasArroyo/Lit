import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('image-cards')
export class ImageCards extends LitElement {
  @property({ type: Array }) cards = [];

  static styles = css`
    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .card {
      width: 300px;
      margin: 10px;
      border: 1px solid #ccc;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    }

    .card img {
      width: 100%;
      height: auto;
    }

    .card-content {
      padding: 10px;
    }

    .card h2 {
      margin-top: 0;
    }
  `;

  // Simulación de petición HTTP (reemplaza con tu lógica real)
  async fetchCards() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            title: 'Montañas majestuosas',
            image: 'https://source.unsplash.com/featured/?mountain',
            description: 'Impresionantes picos nevados y paisajes verdes.',
          },
          {
            title: 'Costa escarpada',
            image: 'https://source.unsplash.com/featured/?beach',
            description: 'Acantilados rocosos y olas rompiendo en la costa.',
          },
          {
            title: 'Bosque exuberante',
            image: 'https://source.unsplash.com/featured/?forest',
            description: 'Árboles altos y frondosos, un paraíso natural.',
          },
        ]);
      }, 1000); // Simula un retraso de 1 segundo
    });
  }

  async firstUpdated() {
    const data = await this.fetchCards();
    this.cards = data;
  }

  render() {
    return html`
      <div class="container">
        ${this.cards.map(
          card => html`
            <div class="card">
              <img src="${card.image}" alt="${card.title}" />
              <div class="card-content">
                <h2>${card.title}</h2>
                <p>${card.description}</p>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}