import { html, fixture, expect } from '@open-wc/testing';
import './my-elementE';

describe('LoginForm', () => {
  let element: Element;

  beforeEach(async () => {
    element = await fixture(html`<login-form></login-form>`);
  });

  it('se renderiza correctamente', () => {
    expect(element).to.be.instanceOf(HTMLElement);
    expect(element.shadowRoot?.querySelector('h2')?.textContent).to.equal('Iniciar Sesión');
  });

  it('el botón de login está deshabilitado por defecto', () => {
    const button = element.shadowRoot?.querySelector('button');
    expect(button?.disabled).to.be.true;
  });

  
  });
