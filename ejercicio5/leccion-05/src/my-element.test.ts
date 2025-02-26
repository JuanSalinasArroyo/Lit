import { expect, fixture } from "@open-wc/testing";
import { MyElement } from "./my-element";
import { html } from "lit";
import sinon from "sinon";
import { fetchPackageInfo } from "./impl-fetch";

export const msgError: string = "[001]-Parametros incorrectos";

describe("Set de pruebas unitarias del componente MyElement", () => {
  it("should be true", () => {
    expect(true).eqls(true);
  });

  it("should be instance", async () => {
    let element: MyElement;
    element = await fixture(html`<app-element></app-element>`);
    expect(element).to.be.instanceOf(MyElement);
  });

  /*it("should add two numbers", async () => {
    let element: MyElement;
    element = await fixture(html`<app-element></app-element>`);

    expect(element.sum(10, 5)).eqls(15);
  });

  it("should throw an error", async () => {
    let element: MyElement;
    element = await fixture(html`<app-element></app-element>`);
    let num2: any = "cinco";
    expect(() => element.sum(10, num2)).to.throw(msgError);
  });
*/
  it("should contain HTML", async () => {
    let element: MyElement;
    element = await fixture(html`<app-element></app-element>`);
    expect(element).shadowDom.equal("<h1>Hola, Mundo!</h1>");
  });

  it("should call fetch", async () => {
    let fetchStub = sinon.stub(globalThis, "fetch");
    let abortController = new AbortController();

    const mockResponse = { name: "mock-package", version: "1.0.0" };
    fetchStub.resolves(
      new Response(JSON.stringify(mockResponse), { status: 200 })
    );
    const result = await fetchPackageInfo(
      "mock-package",
      abortController.signal
    );
    expect(result).to.deep.equal(mockResponse);
    expect(fetchStub).to.have.been.calledWith(
      "https://registry.npmjs.org/mock-package",
      { signal: abortController.signal }
    );
    fetchStub.restore();
  });

  it("should throw an error when response status is not 200", async () => {
    let fetchStub = sinon.stub(globalThis, "fetch");
    let abortController = new AbortController();

    const errorMessage = "Expected an error to be thrown but none was.";
    fetchStub.resolves(new Response(errorMessage, { status: 404 }));

    try {
      await fetchPackageInfo("unknown-package", abortController.signal);
    } catch (error: any) {
      expect(error.message).to.equal(errorMessage);
    }

    fetchStub.restore();
  });
  
});