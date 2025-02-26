import { html, fixture, expect } from '@open-wc/testing';
import { CardSlider } from './my-element4';
import { LitElement } from 'lit';

describe('CardSlider', () => {
  let element: CardSlider;

  beforeEach(async () => {
    element = await fixture(html`<card-slider></card-slider>`);
  });

  it('debería renderizar el componente correctamente', () => {
    expect(element).to.be.instanceOf(LitElement);
  });

  it('debería mostrar "Cargando..." antes de cargar las tarjetas', async () => {
    const loadingText = element.shadowRoot?.querySelector('p')?.textContent;
    expect(loadingText).to.equal('Cargando...');
  });

  it('debería cambiar la tarjeta cuando se presiona el botón "Siguiente"', async () => {
    element.cards = [
      { title: 'Tarjeta 1', image: '/img1.jpg', description: 'Descripción 1' },
      { title: 'Tarjeta 2', image: '/img2.jpg', description: 'Descripción 2' }
    ];
    await element.updateComplete; 

    const button = element.shadowRoot?.querySelector('button');
    expect(button).to.exist;

    const initialTitle = element.shadowRoot?.querySelector('h3')?.textContent;
    button?.click();
    await element.updateComplete;

    const newTitle = element.shadowRoot?.querySelector('h3')?.textContent;
    expect(initialTitle).to.not.equal(newTitle);
  });
});
