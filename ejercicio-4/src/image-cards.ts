import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface CardData {
  title: string;
  image: string;
  description: string;
}

@customElement('image-cards')
export class ImageCards extends LitElement {
  @property() cards: CardData[] = [];

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
  }

  .card img {
    width: 100%;
  }

  .card-content {
    padding: 10px;
  }
`;

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
  }

  render() {
    return html`
      <div class="container">
        ${this.cards.map(card => {
          console.log("URL de la imagen:", card.image); 
          return html`
            <div class="card">
              <img src="${card.image}" alt="${card.title}" />
              <div class="card-content">
                <h2>${card.title}</h2>
                <p>${card.description}</p>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}