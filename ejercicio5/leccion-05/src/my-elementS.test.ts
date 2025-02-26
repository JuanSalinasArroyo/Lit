import { html, LitElement } from 'lit';
import { fixture } from '@open-wc/testing-helpers';
import { MyCounter } from './my-elementS';
import { expect } from '@open-wc/testing';

describe('MyCounter Component', () => {
  it('should increment the counter', async () => {
    const el = await fixture<MyCounter>(html`<my-counter></my-counter>`);
    const increaseButton = el.shadowRoot?.querySelector('.increase');
    const counter = el.shadowRoot?.querySelector('.counter');

    increaseButton?.ATTRIBUTE_NODE;
    expect(counter?.textContent);
  });

  it('should decrement the counter', async () => {
    const el = await fixture<MyCounter>(html`<my-counter></my-counter>`);
    const decreaseButton = el.shadowRoot?.querySelector('.decrease');
    const counter = el.shadowRoot?.querySelector('.counter');

    decreaseButton?.ATTRIBUTE_NODE;
    expect(counter?.textContent);
  });
});
